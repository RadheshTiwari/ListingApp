import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ListingCard = ({data}) => {
//   console.log('data==>', data);
  return (
    <View>
      {/* <View style={{flexDirection: 'row'}}> */}
        <View
          style={{
            // backgroundColor: 'grey',
            width: '100%',
            paddingBottom: 4,
            borderBottomWidth: 9,
            borderColor:"#ffff",
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            gap:10
            ,flexGrow:1
          }}>
          <Image
            source={{uri: `${data?.thumbnail}`}}
            style={{maxWidth: 90,width:"20%", height: 90, borderRadius: 10, margin: 10}}
          />
<View style={{display:'flex',gap:10,width:"70%"}}>
<Text style={{fontWeight:700}}>{data.title}</Text>
<Text style={{}}>{data.description}</Text>
{/* <Text>{data.title}</Text> */}
</View>
        </View>
        {/* <View>
          <Text></Text>
        </View>
      </View> */}
    </View>
  );
};

export default ListingCard;

const styles = StyleSheet.create({});
