import React, { useState, useEffect } from "react";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { BlurView } from "@react-native-community/blur";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/FontAwesome";
import { COLORS, SIZE } from "../common/theme";
import MainContainer from "../common/MainContainer";
import { AddBiography, GetUserDetail, getUniversity } from "../utils/API";
import useAppData, { useStore } from "../store";
import Toast from "react-native-toast-message";
import CustomButton from "../common/CustomButton";

const Profile = ({ navigation }) => {
  const [{ accessToken}] = useAppData();
  const {setUserDetails}=useStore()
  const [nameOfFile, setNameOfFile] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  const [profile_image, setProfile_image] = useState(null);
  const [edit, setEdit] = useState(false);
  const [bio, setBio] = useState("");
  const [universityName, setUniversityName] = useState()
  const [universityList, setUniversityList] = useState([
    {
        "id": 1,
        "name": "University of Washington"
    }
])
  useEffect(() => {
    onFocus();
  }, []);

  const chooseFromGallery = () => {
    launchImageLibrary({ selectionLimit: 1, mediaType: "photo" })
      .then((images) => {
        setNameOfFile(images.assets[0]);
        setModalVisible(false);
      })
      .catch((e) => {
        setModalVisible(false);
      });
  };

  const chooseFromCamera = () => {
    launchCamera({ mediaType: "photo" })
      .then((image) => {
        setModalVisible(false);
        setNameOfFile(image.assets[0]);
      })
      .catch((e) => {
        setModalVisible(false);
      });
  };

  const onFocus = () => {
    setLoading(true);
    GetUserDetail(accessToken, onResponse, onError);
    getUniversity(accessToken, onUniversityResponse, onUniversityError)
  };

  const onResponse = (res) => {
    setLoading(false);
    setUserData(res[0]);
    setUserDetails(res[0])
    setBio(res[0].bio);
    let tmp=universityList.map((item)=>{
        res[0].university===item.id
        return item
    })
    setUniversityName(tmp[0].name)
    setProfile_image(res[0]?.profile_image);
  };

  const onError = (error) => {
    setLoading(false);
    Toast.show({
      position: "top",
      type: "error",
      text1: error?.message,
    });
  };

  const onUniversityResponse = (res) => {
    setLoading(false)
    setUniversityList(res)
}

const onUniversityError = (error) => {
    setLoading(false)
}

  const onSave = () => {
    if (bio.length > 10) {
      let body = {
        bio: bio,
      };
      setLoading(true);
      AddBiography(body, accessToken, onBioUpdateResponse, onBioUpdateError);
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
    console.warn(error)
    setLoading(false);
    setEdit(false);
    Toast.show({
      position: "top",
      type: "error",
      text1: error?.message,
    });
  };

  return (
    <MainContainer>
      <View style={styles.imageContainer}>
        <Image
          source={
            profile_image == null
              ? { uri: nameOfFile?.uri }
              : { uri: profile_image }
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
      <Text style={styles.nameText}>{userData?.full_name}</Text>
      <Text style={styles.nameText}>{universityName}</Text>
      <Text style={styles.about}>About Me</Text>
      {!edit ? (
        <View style={styles.centerCardContainer}>
          <Text style={styles.cardText}>{userData?.bio}</Text>
          <TouchableOpacity
            style={styles.editContainer}
            onPress={
              () => setEdit(true)
            }
          >
            <AntDesign name={"edit"} size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.centerCardContainer}>
            <TextInput
              value={bio}
              onChangeText={(t) => setBio(t)}
              maxLength={500}
              multiline
              style={styles.Input}
            />
            <TouchableOpacity
              style={styles.editContainer}
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
    fontWeight: "400",
    color: COLORS.black,
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
    height: hp(16),
    backgroundColor: COLORS.lightGray,
    // paddingTop: hp(2.7),
    alignItems: "center",
  },
  cardText: {
    textAlign: "center",
    fontSize: SIZE.XM,
    fontWeight: "400",
    color: COLORS.black,
    paddingTop: 2,
    width: hp(35),
    textAlign: "center",
  },
  editContainer: {
    position: "absolute",
    height: hp(4),
    width: hp(4),
    borderRadius: 50,
    backgroundColor: COLORS.purple,
    bottom: hp(1),
    right: wp(1.7),
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
});
