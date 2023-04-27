import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
}
    from 'react-native-responsive-screen';
import Spinner from 'react-native-loading-spinner-overlay';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import CustomInput from '../common/CustomInput'
import CustomButton from '../common/CustomButton';
import MainContainer from '../common/MainContainer';
import { COLORS, IMAGE, SIZE } from '../common/theme';
import { onRegister } from '../utils/API';
import { useStore } from '../store';

const SignUp = ({ navigation }) => {
    const { setUserID ,setRefreshToken} = useStore()
    const [loading, setLoading] = useState(false)
    const [newShowIcon, setNewShowIcon] = useState(false);
    const [confiramShowIcon, setConfiramShowIcon] = useState(false);

    const loginSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required')
            .min(7, "Password must contain 6 characters"),
        confirmPassword: Yup.string().required('Confirm password is required')
            .oneOf([Yup.ref('password')], 'Passwords do not match')
    });

    const onSubmitHandle = (values) => {
        let body = {
            username: values.name,
            email: values.email,
            password: values.password,
            confirm_password: values.confirmPassword,
        }
        setLoading(true)
        onRegister(body, onResponse, onError)
    }

    const onResponse = (res) => {
        setUserID(res?.data?.user_id)
        setRefreshToken(res?.data?.refresh)
    
        setLoading(false)
        Toast.show({
            position: 'top',
            type: 'success',
            text1: res?.data?.message,
        });
        navigation.navigate('OTPScreen')
    }

    const onError = (error) => {
        setLoading(false)
        Toast.show({
            position: 'top',
            type: 'error',
            text1: error?.response?.data?.message?error?.response?.data?.message:'Network Error',
        });
    }

    return (
        <MainContainer>
            <View style={styles.logoContainer}>
                <Image source={IMAGE.logo} style={styles.logoImage} resizeMode="contain" />
                <Text style={styles.topText}>Get Social</Text>
            </View>
            <Formik
                initialValues={{ name: "", email: '', password: "", confirmPassword: "" }}
                validationSchema={loginSchema}
                onSubmit={values => {
                    onSubmitHandle(values)
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <View style={styles.inputContainer}>
                            <CustomInput
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                errors={errors.name}
                                touched={touched.name}
                                placeholder={'Enter username'} />
                            <CustomInput
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                errors={errors.email}
                                touched={touched.email}
                                keyboardType='email-address' placeholder={'Enter email'} />
                            <CustomInput
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                errors={errors.password}
                                touched={touched.password}
                                keyboardType='default' placeholder={'Enter password'}
                                icon
                                secureTextEntry={newShowIcon == true ? false : true}
                                onPress={() => setNewShowIcon(showIcon => !showIcon)}
                                showIcon={
                                    newShowIcon == true
                                        ? (IMAGE.eyeOff)
                                        : (IMAGE.eye)
                                }
                            />
                            <CustomInput
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                errors={errors.confirmPassword}
                                touched={touched.confirmPassword}
                                keyboardType='default' placeholder={'Confirm password'}
                                icon
                                secureTextEntry={confiramShowIcon == true ? false : true}
                                onPress={() => setConfiramShowIcon(showIcon => !showIcon)}
                                showIcon={
                                    confiramShowIcon == true
                                        ? (IMAGE.eyeOff)
                                        : (IMAGE.eye)
                                }
                            />
                        </View>
                        <Text style={[styles.inputBottomText, { marginTop: hp(3) }]}>@university.edu domain required to register/</Text>
                        <Text style={styles.inputBottomText}>login</Text>
                        <CustomButton onPress={handleSubmit} title={'Register'} />
                        <Text style={styles.bottomText}>Already have an account? <Text style={styles.loginText} onPress={() => navigation.navigate('Login')} >Login</Text></Text>
                        <Spinner
                            color={COLORS.purple}
                            visible={loading}
                            size='large'
                            overlayColor='rgba(0,0,0,0.5)'
                        />
                    </>)}
            </Formik>
        </MainContainer>
    )
}
export default SignUp

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
        fontWeight: '500'
    },
    inputContainer: {
        marginTop: hp(9)
    },
    inputBottomText: {
        color: COLORS.black,
        fontSize: SIZE.SM,
        textAlign: 'center'
    },
    bottomText: {
        marginTop: hp(2),
        color: COLORS.darkGray,
        fontSize: SIZE.SM,
        textAlign: 'center',
        marginHorizontal: wp(16)
    },
    loginText: {
        color: COLORS.purple,
        fontSize: SIZE.M,
        fontWeight: '700'
    }
})