import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Spinner from 'react-native-loading-spinner-overlay';
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import { COLORS, IMAGE, SIZE } from '../common/theme'
import CustomButton from '../common/CustomButton';
import MainContainer from '../common/MainContainer';
import { AddDateofbirth } from '../utils/API';
import useAppData, { useStore } from '../store';
import Toast from 'react-native-toast-message';

const Birthday = ({ navigation }) => {
    const [{ userID }] = useAppData()
    const {setToken} =useStore()
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [isDate, setIsDate] = useState(false)
    const [loading, setLoading] = useState(false)

    const submit = () => {
        let tmpMonth = date.getMonth()
        tmpMonth = tmpMonth <= 9 ? tmpMonth + 1 : tmpMonth
        tmpMonth = String(tmpMonth)
        tmpMonth = tmpMonth.replace('0', '')
        let data = {
            day: String(date.getDate()),
            month: tmpMonth,
            year: String(date.getFullYear())
        }
        setLoading(true)
        AddDateofbirth(data, userID, onResponse, onErrors)
    }

    const onErrors = (err) => {
        setLoading(false)
        Toast.show({
            position: 'top',
            type: 'error',
            text1: err?.message,
        });
    }

    const onResponse = (res) => {
        setLoading(false)
        setToken(res.data.token);
        navigation.navigate('University')
        Toast.show({
            position: 'top',
            type: 'success',
            text1: res?.message,
        });
    }
   
    return (
        <MainContainer>
            <View style={styles.logoContainer}>
                <Image source={IMAGE.logo} style={styles.logoImage} resizeMode="contain" />
                <Text style={styles.topText}>WELCOME TO Get Social!</Text>
                <Text style={styles.birthdayText}>When is your birthday?</Text>
            </View>
            <TouchableOpacity
                style={styles.datePickerContainer}
                onPress={() => setOpen(true)}>
                <Text style={styles.selectDate}>
                    {isDate ? moment(date).format('MM - DD - YYYY') : 'Select your Date of Birth'}
                </Text>
            </TouchableOpacity>
            <DatePicker
                maximumDate={new Date()}
                minimumDate={new Date("1970-01-01")}
                title={'Select your Date of Birth'}
                modal
                androidVariant={'iosClone'}
                mode={'date'}
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    setIsDate(true)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
            <CustomButton onPress={() => submit()} title={'Next'} />
            <Spinner
                color={COLORS.purple}
                visible={loading}
                size='large'
                overlayColor='rgba(0,0,0,0.5)'
            />
        </MainContainer>
    )
}

export default Birthday

const styles = StyleSheet.create({
    logoContainer: {
        marginTop: hp(10),
        alignItems: 'center',
    },
    logoImage: {
        width: wp(14),
        height: hp(7),
    },
    topText: {
        marginTop: hp(1),
        color: COLORS.black,
        fontSize: SIZE.XM,
        fontWeight: '500'
    },
    birthdayText: {
        marginTop: hp(4),
        color: COLORS.black,
        fontSize: SIZE.M,
        fontWeight: '500'
    },
    datePickerContainer: {
        borderWidth: 1,
        marginTop: hp(5),
        height: hp(5),
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.gray
    },
    selectDate: {
        color: COLORS.black,
        fontSize: 16
    },
})