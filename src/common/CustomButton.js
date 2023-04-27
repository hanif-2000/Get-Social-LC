import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS, SIZE } from './theme';


const CustomButton = ({ disable, buttonStyle, onPress, title, buttonTextStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle, { backgroundColor: disable ? COLORS.black : COLORS.purple }]}
      disabled={disable}
      activeOpacity={0.8}
      onPress={onPress}>
      <Text style={[styles.buttonText, buttonTextStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  button: {
    marginTop: hp(3),
    height: hp(5),
    backgroundColor: COLORS.purple,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZE.XM,
    fontWeight: '500'
  },
})