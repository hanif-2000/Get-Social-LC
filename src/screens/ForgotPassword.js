import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Spinner from 'react-native-loading-spinner-overlay';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../common/CustomInput'
import CustomButton from '../common/CustomButton';
import MainContainer from '../common/MainContainer';
import { COLORS, IMAGE, SIZE } from '../common/theme';
import { onForgotPassword } from '../utils/API';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const ForgotPassword = ({ navigation }) => {
    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
    });

    const [loading, setLoading] = useState(false)


    const submit = (values) => {
        let body = {
            email: values.email
        }
        setLoading(true)
        onForgotPassword(body, onResponse, onError)
    }

    const onResponse = (res) => {
        setLoading(false)
        Toast.show({
            position: 'top',
            type: 'success',
            text1: res?.data?.message,
          });
        navigation.navigate('Login')
    }

    const onError = (error) => {
        setLoading(false)
        Toast.show({
            position: 'top',
            type: 'error',
            text1:  error?.response?.data?.message,
          });
    }

    return (
        <MainContainer>
            <View style={styles.logoContainer}>
                <Image source={IMAGE.logo} style={styles.logoImage} resizeMode="contain" />
                <Text style={styles.topText}>Forgot Password ? </Text>
                <Text style={[styles.topText, { marginTop: hp(4), marginHorizontal: wp(4) }]}>Please enter your email</Text>

            </View>
            <Formik
                initialValues={{ email: '' }}
                validationSchema={loginSchema}
                onSubmit={values => {
                    submit(values)
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <View style={styles.inputContainer}>
                            <CustomInput
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                errors={errors.email}
                                touched={touched.email}
                                keyboardType='email-address' placeholder={'Enter email'} />
                        </View>
                        <CustomButton onPress={handleSubmit} title={'Submit'} />
                    </>)}
            </Formik>
            <Spinner
                color={COLORS.purple}
                visible={loading}
                size='large'
                overlayColor='rgba(0,0,0,0.5)'
            />
        </MainContainer>
    )
}

export default ForgotPassword

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
        fontSize: SIZE.SL,
        fontWeight: '500',
        textAlign: 'center'
    },
    inputContainer: {
        marginTop: hp(4)
    },
})