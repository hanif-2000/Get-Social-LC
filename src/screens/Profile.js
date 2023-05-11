import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import AntDesign from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import ImagePicker from "react-native-image-crop-picker";
import { BlurView } from "@react-native-community/blur";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useFocusEffect } from "@react-navigation/native";

import { COLORS, SIZE } from "../common/theme";
import MainContainer from "../common/MainContainer";
import useAppData, { useStore } from "../store";
import CustomButton from "../common/CustomButton";
import {
  GetUserDetail,
  updateBiography,
  updatePicture,
  updateUserName
} from "../utils/API";
import CustomInput from "../common/CustomInput";

const Profile = ({ navigation }) => {
  const [{ accessToken, userID }] = useAppData();
  const [nameOfFile, setNameOfFile] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  const [edit, setEdit] = useState(false);
  const [bio, setBio] = useState();
  const [isSave, setSave] = useState(false);
  const [visible, setVisible] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [more, setMore] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      onFocus();
    }, [userID])
  );

  const chooseFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        setNameOfFile(image.path);
        setSave(true);
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
        setSave(true);
        setModalVisible(false);
      })
      .catch((e) => {
        setModalVisible(false);
      });
  };

  const onFocus = () => {
    setLoading(true);
    GetUserDetail(accessToken, onResponse, onError);
  };

  const onResponse = (res) => {
    setLoading(false);
    setUserData(res);
    setBio(res?.bio);
    setFirstName(res?.first_name);
    setLastName(res?.last_name);
  };

  const onError = (error) => {
    setLoading(false);
    Toast.show({
      position: "top",
      type: "error",
      text1: error?.message,
    });
  };
  const onSave = () => {
    if (bio.length > 10) {
      let body = {
        bio: bio,
      };
      setLoading(true);
      updateBiography(body, userID, onBioUpdateResponse, onBioUpdateError);
    } else {
      Alert.alert('Add Bio "minimum 10 character"');
    }
  };

  const onBioUpdateResponse = (res) => {
    setLoading(false);
    setEdit(false);
    Toast.show({
      position: "top",
      type: "success",
      text1: res?.message,
    });
    onFocus();
  };

  const onBioUpdateError = (error) => {
    console.warn(error);
    setLoading(false);
    setEdit(false);
    Toast.show({
      position: "top",
      type: "error",
      text1: error?.message,
    });
  };

  const updateProfile = () => {
    let body = {
      profile_image: nameOfFile,
    };
    setLoading(true);
    updatePicture(body, userID, pictureRes, pictureErr);
  };

  const pictureRes = (res) => {
    console.warn(res);
    setSave(false);
    setLoading(false);
    Toast.show({
      position: "top",
      type: "success",
      text1: res?.message,
    });
  };
  const pictureErr = (err) => {
    console.warn(err);
    setSave(false);
    setLoading(false);
    Toast.show({
      position: "top",
      type: "error",
      text1: err?.profile_image,
    });
  };

  const upDateName = () => {
    let body = {
      first_name: firstName,
      last_name: lastName,
    };
    setLoading(true);
    updateUserName(body, userID, nameRes, nameErr);
  };
  const nameRes = (res) => {
    setLoading(false);
    Modalclose();
    Toast.show({
      position: "top",
      type: "success",
      text1: res?.message,
    });
    onFocus();
  };

  const nameErr = (err) => {
    setLoading(false);
    console.warn(err);
    Modalclose();
    Toast.show({
      position: "top",
      type: "error",
      text1: err?.message,
    });
  };
  const Modalclose = () => setVisible(false);
  const Modalopen = () => setVisible(true);

  const ModalData = () => {
    return (
      <View
        style={{
          width: wp(80),
          padding: 20,
          backgroundColor: COLORS.white,
          alignSelf: "center",
          borderRadius: 10,
        }}
      >
        <CustomInput
          onChangeText={(val) => {
            setFirstName(val);
          }}
          value={firstName}
          placeholder="First Name"
        />
        <CustomInput
          inputStyle={{ marginTop: 20 }}
          onChangeText={(val) => {
            setLastName(val);
          }}
          value={lastName}
          placeholder="Last Name"
        />
        <CustomButton onPress={upDateName} title={"Save"} />
      </View>
    );
  };

  return (
    <MainContainer>
      <View style={styles.imageContainer}>
        <Image
          source={
            nameOfFile === ""
              ? { uri: userData?.profile_image }
              : { uri: nameOfFile }
          }
          style={styles.image}
        />

        <TouchableOpacity
          style={styles.imageAddContainer}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <AntDesign name={"plus"} size={10} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      {isSave ? (
        <TouchableOpacity onPress={updateProfile} style={styles.saveButton}>
          <Text style={styles.save}>Save</Text>
        </TouchableOpacity>
      ) : null}
      <View>
        <Text style={styles.nameText}>
          {userData?.first_name} {userData?.last_name}
        </Text>
        <TouchableOpacity
          onPress={Modalopen}
          style={{ position: "absolute", right: 10, top: 3 }}
        >
          <Entypo name="edit" size={16} />
        </TouchableOpacity>
      </View>

      <View>
      <Text style={[styles.nameText, { fontSize: SIZE.M }]}>
        {userData?.university_name}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('University',{keys:userData?.university_name})} style={{position:'absolute',right:0,top:2}}>
        <Text style={{color:COLORS.purple,fontSize:SIZE.S,fontWeight:'600'}}>Edit</Text>
      </TouchableOpacity>
      </View>
      <Text style={styles.about}>About Me</Text>
      {!edit ? (
        <View
          style={[
            styles.centerCardContainer,
            more ? null : { height: hp(16) },
            { padding: wp(2) },
          ]}
        >
          <Text style={styles.cardText}>{userData?.bio}</Text>
          <View style={{ position: "absolute", bottom: hp(1), right: wp(1.7) }}>
            <TouchableOpacity
              style={styles.editContainer}
              onPress={() => setEdit(true)}
            >
              <AntDesign name={"edit"} size={20} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMore((more) => !more)}
              style={{ marginTop: 10 }}
            >
              <Text
                style={{
                  color: COLORS.purple,
                  fontSize: SIZE.SM,
                  fontWeight: "700",
                }}
              >
                {more ? "Hide" : "More"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={[styles.centerCardContainer, { height: hp(16) }]}>
            <TextInput
              value={bio}
              onChangeText={(t) => setBio(t)}
              maxLength={500}
              multiline
              style={styles.Input}
            />
            <TouchableOpacity
              style={[
                styles.editContainer,
                { position: "absolute", bottom: hp(1), right: wp(1.7) },
              ]}
              onPress={() => onSave()}
            >
              <AntDesign
                name={"check-square-o"}
                size={20}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>
          <Text style={{ color: "#000" }}>{bio ? bio.length : 0} / 500</Text>
        </>
      )}
      <CustomButton
        disable={edit}
        onPress={() => Alert.alert("in-progress")}
        buttonStyle={{ position: "absolute", bottom: 20, width: "100%" }}
        title={"Logout"}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable style={styles.modalButton} onPress={chooseFromCamera}>
              <Text style={styles.textStyle}>Take From Camera</Text>
            </Pressable>
            <Pressable style={styles.modalButton} onPress={chooseFromGallery}>
              <Text style={styles.textStyle}>Choose From Gallery</Text>
            </Pressable>
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancle</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        style={{ margin: 0 }}
        backdropColor="rgba(0,0,0,0.5)"
        backdropOpacity={1}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={1500}
        animationOutTiming={1500}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
        onBackButtonPress={Modalclose}
        onBackdropPress={Modalclose}
        isVisible={visible}
      >
        <ModalData />
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

export default Profile;

const styles = StyleSheet.create({
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
    resizeMode: "cover",
  },
  imageAddContainer: {
    height: hp(2.5),
    width: hp(2.5),
    borderRadius: 50,
    backgroundColor: COLORS.purple,
    position: "absolute",
    bottom: -3,
    right: wp(2),
    borderWidth: 0.8,
    borderColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    textAlign: "center",
    fontSize: SIZE.XM,
    fontWeight: "500",
    color: COLORS.black,
    marginBottom: 10,
  },
  about: {
    fontSize: SIZE.XM,
    fontWeight: "600",
    color: COLORS.black,
    paddingTop: hp(3),
  },
  centerCardContainer: {
    borderRadius: 8,
    marginTop: hp(2),
    backgroundColor: COLORS.lightGray,
    alignItems: "center",
  },
  cardText: {
    textAlign: "center",
    fontSize: SIZE.XM,
    fontWeight: "400",
    color: COLORS.black,
    width: hp(35),
    textAlign: "center",
  },
  editContainer: {
    // position: "absolute",
    height: hp(4),
    width: hp(4),
    borderRadius: 50,
    backgroundColor: COLORS.purple,

    borderColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 4,
  },
  blurView: {
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
  },
  modalView: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: hp(5),
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
    backgroundColor: COLORS.darkBlue,
  },
  textStyle: {
    color: COLORS.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  Input: {
    flex: 1,
    height: hp(15),
    backgroundColor: COLORS.lightGray,
    width: "100%",
    padding: 10,
    paddingTop: 5,
  },
  save: { color: COLORS.purple, fontSize: SIZE.M, fontWeight: "500" },
  saveButton: { alignSelf: "center", marginBottom: 5, top: -5 },
});
