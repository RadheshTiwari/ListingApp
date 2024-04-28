import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonString from '../../assets/string';
import {styles} from './style';
import {useDispatch, useSelector} from 'react-redux';
import {
  CategoryApi,
  ListingAction,
  ListingApi,
  PaginationApi,
  SearchApi,
} from '../../redux/listing.slice';
import ListingCard from '../../components/listingCard';
import CustomDropdown from '../../components/customDropDown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const MainScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [saveListing, setSaveListing] = useState();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.ListingReducer);
//   console.log('selector-771c->', selector?.listingData);
//   console.log('saveListing=======', saveListing);

  useEffect(() => {
    
    const unsubscribe = NetInfo.addEventListener(state => {
      return state.isConnected;
    });
    if(unsubscribe){
        const loadData = async () => {
            try {
              const storedArray = await AsyncStorage.getItem('ListingValue');
              if (storedArray !== null) {
                
                setSaveListing(JSON.parse(storedArray));
              } else {
                // dispatch(ListingApi());
              }
            } catch (error) {
              console.error('Error loading data from AsyncStorage:', error);
            }
          };
          loadData();
    }
   

   
  }, []);

  useEffect(() => {
    dispatch(ListingApi());
    // console.log('9999999');
  }, []);
  useEffect(() => {
    dispatch(CategoryApi());
    // console.log('------------------');
  }, []);
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchQuery?.trim() !== '') {
        dispatch(SearchApi(searchQuery));
      } else {
        dispatch(ListingApi());
      }
    }, 500);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  useEffect(() => {
    if (selector?.searchLoading === 'loaded') {
      ListingAction.resetsearchLoading();
      setSelectedItem();
    } else if (searchQuery === '') {
      setSelectedItem();
    }
  }, [selector?.searchLoading, selector?.categoryLoading, searchQuery]);

  const loadSecondPage = () => {
    dispatch(PaginationApi(selector?.currentPage + 1));
  };

  const renderItem = ({item, index}) => {
    // console.log('item=====>', item);
    return (
      <View style={{flex: 1}}>
        <ListingCard data={item} />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={selector?.listingData ? selector?.listingData : saveListing}
        renderItem={renderItem}
        keyExtractor={item => item?.id}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          //console.log('hello');
          loadSecondPage();
        }}
        ListHeaderComponent={
          <React.Fragment>
            <View
              style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                position: 'relative',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginLeft: 50,
              }}>
              <Text style={{fontWeight: 700, margin: 10, fontSize: 20}}>
                Products
              </Text>
              <View style={{right: 40}}>
                <CustomDropdown
                  items={selector?.categoryData?.data}
                  setSelectedItem={setSelectedItem}
                  selectedItem={selectedItem}
                />
              </View>
            </View>
            <View style={{marginBottom: 20}}>
              <TextInput
                placeholder="Search Products"
                style={{
                  marginHorizontal: 10,
                  borderWidth: 2,
                  borderColor: 'grey',
                  borderRadius: 10,
                  padding: 5,
                  paddingHorizontal: 10,
                }}
                onChangeText={setSearchQuery}
              />
            </View>
          </React.Fragment>
        }
      />
    </View>
  );
};

export default MainScreen;
