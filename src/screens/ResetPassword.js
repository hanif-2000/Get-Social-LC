import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Spinner from 'react-native-loading-spinner-overlay';
import CustomInput from '../common/CustomInput'
import CustomButton from '../common/CustomButton';
import MainContainer from '../common/MainContainer';
import { COLORS, IMAGE, SIZE } from '../common/theme';
import { onResetPassword } from '../utils/API';


const ResetPassword = ({ navigation }) => {
    const [newShowIcon, setNewShowIcon] = useState(false);
    const [confiramShowIcon, setConfiramShowIcon] = useState(false);
    const [loading, setLoading] = useState(false)


    const loginSchema = Yup.object().shape({
        newpassword: Yup.string().required('New password is required')
            .min(6, "Password must contain 6 characters"),
        confirmPassword: Yup.string().required('Confirm password is required')
            .oneOf([Yup.ref('newpassword')], 'Passwords do not match')

    });

    const onSubmitHandle = (values) => {
        let body = {
            password: values.newpassword,
            confirm_password: values.confirmPassword
        }
        setLoading(true)
        onResetPassword(body, onResponse, onError)
    }

    const onResponse = (res) => {
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
            text1:  error?.response?.data?.message,
          });

    }

    return (
        <MainContainer>
            <View style={styles.logoContainer}>
                <Image source={IMAGE.logo} style={styles.logoImage} resizeMode="contain" />
                <Text style={styles.topText}>Reset your Password</Text>
            </View>
            <Formik
                initialValues={{ newpassword: '', confirmPassword: "" }}
                validationSchema={loginSchema}
                onSubmit={values => {
                    onSubmitHandle(values)
                    // console.log(values)
                    // navigation.navigate('Login')

                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <View style={styles.inputContainer}>
                            <CustomInput
                                onChangeText={handleChange('newpassword')}
                                onBlur={handleBlur('newpassword')}
                                value={values.newpassword}
                                errors={errors.newpassword}
                                touched={touched.newpassword}
                                placeholder={'New password'}
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
                                placeholder={'Confirm password'}
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

export default ResetPassword

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