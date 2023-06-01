import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Spinner from "react-native-loading-spinner-overlay";
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import MainContainer from "../common/MainContainer";
import { COLORS, IMAGE, SIZE } from "../common/theme";
import { onLogin } from "../utils/API";
import { useStore } from "../store";
import { setLogin, setRegToken } from "../store/LocalStor";

const Login = ({ navigation }) => {
  const { setAccessToken, setUserID } = useStore();
  const [loading, setLoading] = useState(false);
  const [newShowIcon, setNewShowIcon] = useState(false);

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmitHandler = (values) => {
    let body = {
      email: values.email,
      password: values.password,
    };
    setLoading(true);
    onLogin(body, onResponse, onError);
  };

  const onResponse = async (res) => {
    setUserID(res.user_id);
    setAccessToken(res?.token);
    setRegToken(res?.token);
    setLogin(res?.token);
    setLoading(false);
    Toast.show({
      position: "top",
      type: "success",
      text1: "User Login Successfully",
    });
    navigation.navigate("MyTabs");
  };

  const onError = (error) => {
    setLoading(false);
    Toast.show({
      position: "top",
      type: "error",
      text1: error?.message ? error?.message : error?.detail,
    });
  };

  return (
    <MainContainer>
      <View style={styles.logoContainer}>
        <Image
          source={IMAGE.logo}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.topText}>Get Social</Text>
      </View>
      <Formik
        initialValues={{ email: "student5@yopmail.com", password: "12345678" }}
        validationSchema={loginSchema}
        onSubmit={(values) => onSubmitHandler(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={styles.inputContainer}>
              <CustomInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                errors={errors.email}
                touched={touched.email}
                keyboardType="email-address"
                placeholder={"Enter email"}
              />
              <CustomInput
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                errors={errors.password}
                touched={touched.password}
                keyboardType="default"
                placeholder={"Enter password"}
                icon
                secureTextEntry={newShowIcon === true ? false : true}
                onPress={() => setNewShowIcon((showIcon) => !showIcon)}
                showIcon={newShowIcon === true ? IMAGE.eyeOff : IMAGE.eye}
              />
            </View>
            <Text style={[styles.inputBottomText, { marginTop: hp(3) }]}>
              @university.edu domain required to register/
            </Text>
            <Text style={styles.inputBottomText}>login</Text>
            <CustomButton onPress={handleSubmit} title={"Login"} />
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.forgotPassword}>Forgot Password? </Text>
            </TouchableOpacity>
            <Text style={styles.bottomText}>
              Need an account?{" "}
              <Text
                style={styles.signUpText}
                onPress={() => navigation.navigate("SignUp")}
              >
                Register
              </Text>
            </Text>
            <Spinner
              color={COLORS.purple}
              visible={loading}
              size="large"
              overlayColor="rgba(0,0,0,0.5)"
            />
          </>
        )}
      </Formik>
    </MainContainer>
  );
};
export default Login;
const styles = StyleSheet.create({
  logoContainer: {
    marginTop: hp(10),
    alignItems: "center",
  },
  logoImage: {
    width: wp(14),
    height: hp(7),
  },
  topText: {
    marginTop: hp(1),
    color: COLORS.black,
    fontSize: SIZE.SL,
    fontWeight: "500",
  },
  inputContainer: {
    marginTop: hp(9),
  },
  inputBottomText: {
    color: COLORS.black,
    fontSize: SIZE.SM,
    textAlign: "center",
  },
  forgotPassword: {
    marginTop: hp(1),
    color: COLORS.purple,
    textAlign: "right",
    fontSize: SIZE.SM,
  },
  bottomText: {
    marginTop: hp(2),
    color: COLORS.darkGray,
    fontSize: SIZE.SM,
    textAlign: "center",
    marginHorizontal: wp(16),
  },
  signUpText: {
    color: COLORS.purple,
    fontSize: SIZE.M,
    fontWeight: "700",
  },
});
