import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import IMAGES from '../assets/images';
import {useDispatch} from 'react-redux';
import {CategoryListApi} from '../redux/listing.slice';

const CustomDropdown = ({items, selectedItem, setSelectedItem}) => {
  console.log('rendervalue-->', items);
  const [showDropdown, setShowDropdown] = useState(false);
  //   const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      selectedItem === null ||
      selectedItem === undefined ||
      selectedItem === ''
    ) {
      return;
    } else {
      dispatch(CategoryListApi(selectedItem));
    }
  }, [selectedItem]);

  const handleSelectItem = item => {
    setSelectedItem(item);
    setShowDropdown(false);
  };

  return (
    <View style={{width: 90, position: 'relative'}}>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => setShowDropdown(true)}>
          <Text style={{color:"black"}}>{selectedItem || 'Category'} </Text>
        </TouchableOpacity>
        {!showDropdown && (
          <Image
            source={IMAGES.DROPDOWNICON}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        )}
      </View>

      <Modal
        transparent={true}
        visible={showDropdown}
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.dropdown}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {items?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelectItem(item)}
                  style={styles.item}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    padding: 6,
    borderRadius: 5,
    height: 32,
    flexDirection: 'row',
    width: '150%',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // flexDirection:"row"
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    position: 'absolute',
    top: 42,
    right: 16,
    overflow: 'scroll',
    height: 500,
  },
  item: {
    paddingVertical: 10,
  },
});

export default CustomDropdown;
