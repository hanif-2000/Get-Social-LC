import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, SIZE } from './theme';

const CustomInput = ({
  onChangeText,
  value,
  onBlur,
  keyboardType,
  placeholder,
  icon,
  showIcon,
  inputStyle,
  input,
  secureTextEntry,
  onPress,
  maxLength,
  errors,
  touched,
}) => {
  return (
    <>
      <View
        style={[
          styles.container,
          inputStyle,
          { borderColor: errors && touched ? COLORS.red : COLORS.gray, },
        ]}>
        <TextInput
          style={[styles.input, input]}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          onBlur={onBlur}
          autoCapitalize='none'
          autoCorrect={false}
        />
        {icon && (
          <TouchableOpacity style={{ marginLeft: wp(2.5) }} onPress={onPress}>
            <Image
              source={showIcon}
              resizeMode={'contain'}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        )}
      </View>
      {errors && touched && <Text style={styles.errorText}>{errors}</Text>}
    </>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2.5),
    marginTop: hp(1),
    height: hp(5),
  },
  input: {
    color: COLORS.black,
    fontSize: SIZE.SM,
    height: hp(5),
    flex: 1,
  },
  iconStyle: {
    height: hp(2.5),
    width: wp(5),
    tintColor: COLORS.gray,
  },
  errorText: {
    marginTop: hp(.5),
    color: COLORS.orange,
    fontSize: SIZE.S
  },
});