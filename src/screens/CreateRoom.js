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
import CustomButton from "../common/CustomButton";
import MainContainer from "../common/MainContainer";
import { COLORS, IMAGE, SIZE } from "../common/theme";
import useAppData, { useStore } from "../store";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { createRoomAPI } from "../utils/API";

const CreateRoom = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [{ accessToken }] = useAppData();
  const { setFecthRooms } = useStore();

  const loginSchema = Yup.object().shape({
    room: Yup.string().required("Room name is required"),
    description: Yup.string().required("Room description is required"),
  });

  const createRoom = (values) => {
    setLoading(true);
    let formData = {
      name: values.room,
      description: values.description,
      date_time: new Date("2023-03-31T15:59"),
    };
    // const formData = new FormData();
    // formData.append('name', values.room)
    // formData.append('description', values.description)
    // formData.append('date_time', new Date('2023-03-31T15:59'))
    createRoomAPI(accessToken, formData, onResponse, onError);
  };
  const onResponse = (res) => {
    setLoading(false);
    Toast.show({
      position: "top",
      type: "success",
      text1: "New Room created successfully",
    });
    setFecthRooms(true);
    navigation.goBack();
  };
  const onError = (error) => {
    setLoading(false);
    console.warn(error);
    Toast.show({
      position: "top",
      type: "error",
      text1: error,
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
        initialValues={{ room: "", description: "" }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          createRoom(values);
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
              <Text style={styles.label}>Enter Room name</Text>
              <CustomInput
                onChangeText={handleChange("room")}
                onBlur={handleBlur("room")}
                value={values.room}
                errors={errors.room}
                touched={touched.room}
                keyboardType="default"
                placeholder={"Enter room name"}
              />

              <Text style={styles.label}>Enter Room description</Text>
              <CustomInput
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                errors={errors.description}
                touched={touched.description}
                keyboardType="default"
                placeholder={"Enter Room description"}
              />
            </View>
            <CustomButton onPress={handleSubmit} title={"Create Room"} />
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

export default CreateRoom;

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
  label: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 10,
  },
});
