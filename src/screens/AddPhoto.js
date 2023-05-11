import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/FontAwesome";
import Spinner from "react-native-loading-spinner-overlay";
import ImagePicker from "react-native-image-crop-picker";

import { BlurView } from "@react-native-community/blur";
import { COLORS, IMAGE, SIZE } from "../common/theme";
import CustomButton from "../common/CustomButton";
import MainContainer from "../common/MainContainer";
import { AddPicture } from "../utils/API";
import useAppData from "../store";
import Toast from "react-native-toast-message";

const AddPhoto = ({ navigation }) => {
  const [{ userID }] = useAppData();
  const [nameOfFile, setNameOfFile] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const chooseFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        setNameOfFile(image.path);
        setModalVisible(false);
      })
      .catch((e) => {
        setModalVisible(false);
      });
  };

  const chooseFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        setNameOfFile(image.path);
        setModalVisible(false);
      })
      .catch((e) => {
        setModalVisible(false);
      });
  };

  const onSubmit = () => {
    let body = {
      profile_image: nameOfFile,
    };
    setLoading(true);
    AddPicture(body, userID, pictureRes, pictureErr);
  };

  const pictureRes = (res) => {
    setLoading(false);
    console.warn("res", res);
    Toast.show({
      position: "top",
      type: "success",
      text1: res?.message,
    });
    navigation.navigate("AddBio");
  
  };
  const pictureErr = (err) => {
    setLoading(false);
    Toast.show({
      position: "top",
      type: "error",
      text1: err?.profile_image,
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
        <Text style={styles.topText}>Hello, Ashley!</Text>
        <Text style={styles.uploadPictureText}> Let’s upload a picture.</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={nameOfFile ? { uri: nameOfFile } : IMAGE.profile}
          style={styles.image}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={styles.imageAddContainer}
          onPress={() => setModalVisible(true)}
        >
          <AntDesign name={"plus"} size={10} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <CustomButton onPress={() => onSubmit()} title={"Next"} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(false);
        }}
      >
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor={COLORS.white}
        />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable style={styles.button} onPress={chooseFromCamera}>
              <Text style={styles.textStyle}>Take From Camera</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={chooseFromGallery}>
              <Text style={styles.textStyle}>Choose From Gallery</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Cancle</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Spinner
        color={COLORS.purple}
        visible={loading}
        size="large"
        overlayColor="rgba(0,0,0,0.5)"
      />
    </MainContainer>
  );
};

export default AddPhoto;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: wp(5),
  },
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
  uploadPictureText: {
    marginTop: hp(4),
    color: COLORS.black,
    fontSize: SIZE.M,
    fontWeight: "500",
  },
  imageContainer: {
    marginTop: hp(5),
    marginBottom: hp(2),
    alignSelf: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 1,
  },
  imageAddContainer: {
    height: hp(2.5),
    width: hp(2.5),
    borderRadius: 50,
    backgroundColor: COLORS.purple,
    position: "absolute",
    bottom: -3,
    right: 14,
    borderWidth: 0.8,
    borderColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
    width: "100%",
    backgroundColor: COLORS.darkBlue,
  },
  textStyle: {
    color: COLORS.white,
    fontWeight: "bold",
    textAlign: "center",
  },
});
