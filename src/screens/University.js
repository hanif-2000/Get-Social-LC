import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Spinner from "react-native-loading-spinner-overlay";
import { COLORS, IMAGE, SIZE } from "../common/theme";
import CustomButton from "../common/CustomButton";
import MainContainer from "../common/MainContainer";
import useAppData from "../store";
import Toast from "react-native-toast-message";
import { AddUniversity, editUniversity, getUniversity } from "../utils/API";
import { Dropdown } from "react-native-element-dropdown";
import { getRegToken } from "../store/LocalStor";

const University = ({ navigation, route }) => {
  let Route = route.key;
  const [{ token, userID }] = useAppData();
  const [loading, setLoading] = useState(false);
  const [universityName, setUniversityName] = useState();
  const [universityId, setUniversityId] = useState();
  const [universityList, setUniversityList] = useState([
    {
      id: 1,
      name: "University of Washington",
    },
  ]);

  useEffect(() => {
    onFocus();
  }, []);

  const onFocus = async () => {
    let RegToken = await getRegToken();
    setLoading(true);
    getUniversity(token ? token : RegToken, onResponse, onError);
  };

  const onResponse = (res) => {
    setLoading(false);
    setUniversityList(res);
  };

  const onError = (error) => {
    setLoading(false);
    console.warn(error);
  };

  const onSubmit = () => {
    let data = {
      university: universityId,
    };
    setLoading(true);
    AddUniversity(data, userID, onAddResponse, onAddError);
  };

  const onAddResponse = (res) => {
    setLoading(false);
    Toast.show({
      position: "top",
      type: "success",
      text1: res?.message,
    });
    navigation.navigate("AddPhoto");
  };

  const onAddError = (error) => {
    setLoading(false);
    Toast.show({
      position: "top",
      type: "error",
      text1: "Samthing want wrong",
    });
  };

  const EditUniversity = (e) => {
    let body = {
      university: universityId,
    };
    setLoading(true);
    editUniversity(body, userID, onResEdit, onErrEdit);
  };
  const onResEdit = (res) => {
    setLoading(false);
    Toast.show({
      position: "top",
      type: "success",
      text1: res?.message,
    });
    navigation.navigate("Profile");
  };

  const onErrEdit = (err) => {
    setLoading(false);
    Toast.show({
      position: "top",
      type: "error",
      text1: "Samthing want wrong",
    });
    navigation.navigate("Profile");
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
        <Text style={styles.universityText}>
          Which University do you attend?
        </Text>
      </View>
      <View style={{ backgroundColor: "#fff", paddingTop: 20 }}>
        <Dropdown
          style={[
            {
              paddingHorizontal: 16,
              borderWidth: 1,
              height: 50,
              borderRadius: 5,
            },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={universityList}
          maxHeight={240}
          labelField="name"
          valueField="name"
          value={universityName}
          onChange={(item) => {
            setUniversityId(item.id);
            setUniversityName(item.name);
          }}
        />
      </View>
      <CustomButton
        onPress={() => {
          if (Route) {
            EditUniversity();
          } else {
            onSubmit();
          }
        }}
        title={"Let’s set up your profile!"}
      />
      <Spinner
        color={COLORS.purple}
        visible={loading}
        size="large"
        overlayColor="rgba(0,0,0,0.5)"
      />
    </MainContainer>
  );
};

export default University;

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: hp(10),
    alignItems: "center",
  },
  logoImage: {
    width: wp(14),
    height: hp(7),
    resizeMode: "contain",
  },
  topText: {
    marginTop: hp(1),
    color: COLORS.black,
    fontSize: SIZE.XM,
    fontWeight: "500",
  },
  universityText: {
    marginTop: hp(4),
    color: COLORS.black,
    fontSize: SIZE.M,
    fontWeight: "500",
  },
});
