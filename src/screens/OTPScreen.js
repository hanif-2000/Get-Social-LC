import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
}
    from 'react-native-responsive-screen';
import Spinner from 'react-native-loading-spinner-overlay';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Toast from 'react-native-toast-message';
import CustomButton from '../common/CustomButton';
import MainContainer from '../common/MainContainer';
import { COLORS, IMAGE, SIZE } from '../common/theme';
import { onVerifyOTP } from '../utils/API';
import useAppData,{useStore} from '../store';

const OTPScreen = ({ navigation }) => {
    const [{ userID }] = useAppData()
    const { setToken } = useStore()
    const OTPRef = useRef(null);
    const [clearOTP, setClearOTP] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [loading, setLoading] = useState(false)


    const onHandle = () => {
        if (otp.length < 6) {
            setOtpError('OTP is required');
        } else {
            let body = {
                otp: otp,
            };
            setLoading(true);
            onVerifyOTP(body, userID, onResponse, OnError);
        }
    };
    const onResponse = (res) => {
        setLoading(false)
        setToken(res.token)
        Toast.show({
            position: 'top',
            type: 'success',
            text1: res?.message,
        });
        navigation.navigate('AddName')
    }

    const OnError = (error) => {
        setLoading(false)
        Toast.show({
            position: 'top',
            type: 'error',
            text1: error?.response?.data?.message,
        });
    }

    return (
        <MainContainer>
            <View style={styles.logoContainer}>
                <Image source={IMAGE.logo} style={styles.logoImage} resizeMode="contain" />
                <Text style={styles.topText}>Please enter the OTP send on your email</Text>
            </View>
            <OTPInputView
                style={styles.OtpInputStyle}
                keyboardType={'phone-pad'}
                ref={OTPRef}
                clearInputs={clearOTP}
                onCodeChanged={(code) => {
                    setOtp(code);
                    setClearOTP(false);
                }}
                autoFocusOnLoad={true}
                codeInputFieldStyle={styles.underlineStyleBase}
                pinCount={6}
                onCodeFilled={(code) => {
                    setOtp(code);
                    setClearOTP(false);
                    setOtpError('');
                }}
            />
            {otpError && <Text style={styles.errorMessage}>{otpError}</Text>}
            <CustomButton
                onPress={onHandle}
                // onPress={() => navigation.navigate('ResetPassword')}
                title={'Submit'}
            />
            <Spinner
                color={COLORS.purple}
                visible={loading}
                size='large'
                overlayColor='rgba(0,0,0,0.5)'
            />
        </MainContainer>
    )
}

export default OTPScreen

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
        color: COLORS.black,
        fontSize: SIZE.SL,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: hp(4),
        marginHorizontal: wp(4)
    },
    OtpInputStyle: {
        height: hp(6),
        marginTop: hp(4),
        color: COLORS.black,
    },
    underlineStyleBase: {
        borderWidth: 1,
        height: hp(6),
        width: wp(12.5),
        borderRadius: 5,
        color: COLORS.black
    },
    errorMessage: {
        marginTop: hp(.5),
        color: COLORS.orange,
        fontSize: SIZE.S
    },
})