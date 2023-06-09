import { Image, StyleSheet, Text, View } from "react-native";
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
import { COLORS, IMAGE, SIZE } from "../common/theme";
import CustomButton from "../common/CustomButton";
import MainContainer from "../common/MainContainer";
import { onAddName, updateUserName } from "../utils/API";
import useAppData, { useStore } from "../store";

const AddName = ({ navigation, route }) => {
  let firsName = route?.params?.data?.first_name;
  let lastName = route?.params?.data?.last_name;
  let id = route?.params?.data?.id;

  const [loading, setLoading] = useState(false);
  const [{ userID }] = useAppData();

  const userDataSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Shorts")
      .max(50, "Too Long")
      .required("First name is required"),
    lastName: Yup.string()
      .min(2, "Too Short")
      .max(50, "Too Long")
      .required("Last name is required"),
  });

  const onHandleSubmit = (values) => {
    if (route?.params?.data) {
      let body = {
        first_name: values.firstName,
        last_name: values.lastName,
      };
      setLoading(true);
      updateUserName(body, id, nameRes, nameErr);
    } else {
      let body = {
        first_name: values.firstName,
        last_name: values.lastName,
      };
      setLoading(true);
      onAddName(body, userID, onResponse, onError);
    }
  };

  const nameRes = (res) => {
    setLoading(false);
    Toast.show({
      position: "top",
      type: "success",
      text1: res?.message,
    });
    navigation.navigate("Profile");
  };

  const nameErr = (err) => {
    setLoading(false);
    Toast.show({
      position: "top",
      type: "error",
      text1: err?.message,
    });
  };

  const onResponse = (res) => {
    setLoading(false);
    Toast.show({
      position: "top",
      type: "success",
      text1: res?.message,
    });
    navigation.navigate("Birthday");
  };

  const onError = (error) => {
    setLoading(false);
    console.warn(error);
    Toast.show({
      position: "top",
      type: "error",
      text1: error?.response?.data?.message,
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
        <Text style={styles.topText}>WELCOME TO Get Social!</Text>
        <Text style={styles.nameText}>What is your name?</Text>
      </View>
      <Formik
        initialValues={{
          firstName: route.params ? firsName : "",
          lastName: route.params ? lastName : "",
        }}
        validationSchema={userDataSchema}
        onSubmit={(values) => {
          onHandleSubmit(values);
        }}
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
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
                errors={errors.firstName}
                touched={touched.firstName}
                keyboardType="default"
                placeholder={"First"}
              />
              <CustomInput
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
                errors={errors.lastName}
                touched={touched.lastName}
                keyboardType="default"
                placeholder={"Last"}
              />
            </View>
            <Text style={[styles.inputBottomText, { marginTop: hp(3) }]}>
              A safe space for college students to chat and meet.{" "}
            </Text>
            <CustomButton onPress={handleSubmit} title={"Next"} />
          </>
        )}
      </Formik>
      <Spinner
        color={COLORS.purple}
        visible={loading}
        size="large"
        overlayColor="rgba(0,0,0,0.5)"
      />
    </MainContainer>
  );
};

export default AddName;

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
    fontSize: SIZE.XM,
    fontWeight: "500",
  },
  nameText: {
    marginTop: hp(4),
    color: COLORS.black,
    fontSize: SIZE.M,
    fontWeight: "500",
  },
  inputContainer: {
    marginTop: hp(5),
  },
  inputBottomText: {
    color: COLORS.black,
    fontSize: SIZE.SM,
    textAlign: "center",
  },
});
