import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import LinearGradient from "react-native-linear-gradient";
import Spinner from "react-native-loading-spinner-overlay";
import MainContainer from "../common/MainContainer";
import { COLORS, IMAGE, SIZE } from "../common/theme";
import {
  getMessage,
  getRoomData,
  joinRoomByID,
  sendMessage,
} from "../utils/API";
import useAppData from "../store";

const AudioChat = ({ navigation, route }) => {
  let id = route?.params?.id;
  const [{ accessToken, userDetails }] = useAppData();
  const [micDisable, setMicDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState();
  const [message, SetMessage] = useState();
  const [messages, setMessages] = useState();

  useEffect(() => {
    setLoading(true);
    joinRoomByID(accessToken, id, onResponse, onError);
    getRoomData(accessToken, id, onRoomResponse, onRoomError);
    getMessage(id, onGetMessageResponse, onGetMessageError);
  }, [route]);

  const onResponse = (res) => {
    console.warn("joinRoomByID===", res.data);
    setLoading(false);
  };

  const onError = (e) => {
    console.warn("joinRoomByID===", e?.response?.data);
    setLoading(false);
  };

  const onRoomResponse = (res) => {
    setRoomData(res?.data);
    setLoading(false);
  };
  const onRoomError = (e) => {
    console.warn("getRoomData===", e?.response?.data);
    setLoading(false);
  };

  const onGetMessageResponse = (res) => {
    console.log("getMessage==", res);
    setMessages(res);
    setLoading(false);
  };
  const onGetMessageError = (e) => {
    console.warn("getMessage==", e);
    setLoading(false);
  };

  const onSend = () => {
    const formData = new FormData();
    formData.append("chat_room", roomData?.id);
    formData.append("content", message);
    sendMessage(accessToken, formData, onMessageResponse, onMessageError);
  };

  const onMessageResponse = (res) => {
    console.log("rererere", res);
    getMessage(id, onGetMessageResponse, onGetMessageError);
  };
  const onMessageError = (error) => {
    console.warn("error", error?.response?.data);
  };

  const dataList = [
    {
      img: IMAGE.cardImage,
      iconOn: "microphone",
    },
    {
      img: IMAGE.cardImage,
      iconOn: "microphone-slash",
    },
    {
      img: IMAGE.cardImage,
      iconOn: "microphone-slash",
    },
    {
      img: IMAGE.cardImage,
      iconOn: "microphone-slash",
    },
    {
      img: IMAGE.cardImage,
      iconOn: "microphone-slash",
    },
  ];
  return (
    <MainContainer Style={{ paddingHorizontal: 0 }}>
      <ScrollView contentContainerStyle={styles.innarMainContainer}>
        <View style={styles.lineContainer} />
        <View style={styles.topCardContainer}>
          <View style={styles.topCardInnarContainer}>
            <Image
              source={{ uri: userDetails?.profile_image }}
              style={styles.topCardImage}
            />
            <View>
              <Text style={styles.topCardText}>{roomData?.name}</Text>
              <Text style={styles.topCardText}>{userDetails?.full_name}</Text>
            </View>
            <View style={styles.numberMainContainer}>
              <View style={styles.numberLeftContainer}>
                <Text style={{ color: "#fff", fontSize: SIZE.XS }}>
                  {roomData?.active_count_particpant}
                </Text>
              </View>
              <View style={styles.numberRightContainer}>
                <Text style={{ color: COLORS.black, fontSize: SIZE.XS }}>
                  {roomData?.count_particpant}
                </Text>
              </View>
            </View>
            <Text
              numberOfLines={2}
              style={[styles.topCardText, { marginLeft: 20 }]}
            >
              {roomData?.description}
            </Text>
          </View>
            <FlatList
              data={dataList}
              numColumns={4}
              renderItem={({ item }) => (
                <View style={styles.callImageContainer}>
                  <Image
                    source={item.img}
                    style={[
                      styles.callImage,
                      {
                        borderColor: !micDisable ? "#FFE75C" : "#fff",
                        borderWidth: 1,
                      },
                    ]}
                  />
                  <TouchableOpacity
                    disabled={item.iconOn === "microphone-slash" ? true : false}
                    style={[
                      styles.imageAddContainer,
                      {
                        backgroundColor:
                          item.iconOn === "microphone-slash"
                            ? COLORS.black
                            : COLORS.purple,
                      },
                    ]}
                    onPress={() => setMicDisable(!micDisable)}
                  >
                    <FontAwesome5
                      name={item.iconOn}
                      size={10}
                      color={COLORS.white}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          <View style={{ flexDirection: "row" }}>
            <View
              style={[
                styles.bottmLineContainer,
                { backgroundColor: COLORS.lightGray },
              ]}
            />
            <View style={styles.bottmLineContainer} />
          </View>
          <Text style={styles.comments}>Comments</Text>
          <LinearGradient
            style={styles.linearGradient}
            colors={[COLORS.skyBlue, COLORS.navyBlue]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}

          >
            {roomData?.description}
          </Text>
        </View>
        <View style={styles.callContainer}>
          <FlatList
            data={dataList}
            numColumns={4}
            renderItem={({ item }) => (
              <View style={styles.callImageContainer}>
                <Image
                  source={item.img}
                  style={[
                    styles.callImage,
                    {
                      borderColor: !micDisable ? "#FFE75C" : "#fff",
                      borderWidth: 1,
                    },
                  ]}
                />
                <TouchableOpacity
                  disabled={item.iconOn === "microphone-slash" ? true : false}
                  style={[
                    styles.imageAddContainer,
                    {
                      backgroundColor:
                        item.iconOn === "microphone-slash"
                          ? COLORS.black
                          : COLORS.purple,
                    },
                  ]}
                  onPress={() => setMicDisable(!micDisable)}
                >
                  <FontAwesome5
                    name={item.iconOn}
                    size={10}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={[
              styles.bottmLineContainer,
              { backgroundColor: COLORS.lightGray },
            ]}
          />
          <View style={styles.bottmLineContainer} />
        </View>
        <Text style={styles.comments}>Comments</Text>
        <LinearGradient
          style={styles.linearGradient}
          colors={[COLORS.skyBlue, COLORS.navyBlue]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={messages}
            renderItem={({ item }) => (
              <View style={styles.bottomCardInnarContainer}>
                <Image
                  source={{ uri: item?.user?.profile_image }}
                  style={[styles.bottomCardImage, { borderWidth: 2, borderRadius: 50 }]}
                />
                <View>
                  <Text style={styles.bottomCardText}>
                    {item?.user?.full_name}
                  </Text>
                  <Text style={[styles.bottomCardText, { fontSize: SIZE.S }]}>
                    {item?.content}
                  </Text>
                </View>
              </View>
            )}
          />
          <View style={styles.InputstyleContainer}>
            <TextInput
              onChangeText={(t) => SetMessage(t)}
              style={styles.input}
              placeholderTextColor={COLORS.darkGray}
              placeholder={"Type something..."}
            />
            <TouchableOpacity disabled={message <= 0} onPress={() => onSend()} style={[styles.button, { backgroundColor: message <= 0 ? COLORS.black : COLORS.skyBlue }]}>
              <Text style={styles.sendbutton}>Send</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.leaveContainer}
            onPress={() => navigation.navigate("MyTabs")}
          >
            <Text style={styles.leaveText}>Leave</Text>
          </TouchableOpacity>
          <Pressable
            style={[
              styles.microphoneContainer,
              { backgroundColor: micDisable ? COLORS.black : COLORS.purple },
            ]}
            onPress={() => setMicDisable(!micDisable)}
          >
            <FontAwesome5
              name={micDisable ? "microphone-alt-slash" : "microphone-alt"}
              size={20}
              color={COLORS.white}
            />
          </Pressable>
        </View>
        <Spinner
          color={COLORS.purple}
          visible={loading}
          size="large"
          overlayColor="rgba(0,0,0,0.5)"
        />
      </ScrollView>
    </MainContainer>
  );
};

export default AudioChat;

const styles = StyleSheet.create({
  innarMainContainer: {
    flex: 1,
    marginTop: 10,
    borderRadius: 20,
    borderTopWidth: 0.6,
    borderLeftWidth: 0.6,
    borderRightWidth: 0.6,
    borderColor: COLORS.gray,
    padding: wp(5),
  },
  lineContainer: {
    height: 4,
    borderRadius: 5,
    backgroundColor: COLORS.gray,
    width: wp(15),
    alignSelf: "center",
    opacity: 0.5,
  },
  topCardContainer: {
    backgroundColor: COLORS.purple,
    borderRadius: 10,
    padding: 10,
    marginTop: hp(2.5),
  },
  topCardInnarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  topCardImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 0.8,
    resizeMode: "cover",
    borderColor: COLORS.white,
    marginRight: 8,
  },
  numberMainContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: 20,
  },
  numberLeftContainer: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: COLORS.black,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  numberRightContainer: {
    paddingHorizontal: 5,
    backgroundColor: COLORS.white,
    paddingVertical: 2,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  topCardText: {
    color: COLORS.white,
    fontSize: SIZE.S,
    fontWeight: "600",
  },
  callContainer: {
    marginTop: 20,
    height: "40%",
    alignSelf: "center",
  },
  callImageContainer: {
    height: 55,
    marginHorizontal: 10,
  },
  callImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    resizeMode: "cover",
  },
  imageAddContainer: {
    height: hp(2.3),
    width: hp(2.3),
    borderRadius: 50,
    backgroundColor: COLORS.purple,
    position: "absolute",
    bottom: 0,
    right: -6,
    justifyContent: "center",
    alignItems: "center",
  },
  bottmLineContainer: {
    width: "50%",
    backgroundColor: COLORS.mediamGray,
    height: 3,
  },
  comments: {
    marginTop: 10,
    color: COLORS.black,
    fontSize: SIZE.S,
    fontWeight: "600",
  },
  linearGradient: {
    paddingHorizontal: 15,
    marginTop: hp(1),
    height: hp(24),
    borderRadius: 12,
    paddingBottom: 15,
  },
  bottomCardInnarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  bottomCardImage: {
    width: wp(12),
    height: hp(6),
    resizeMode: "contain",
    marginRight: 8,
  },
  bottomCardText: {
    color: COLORS.white,
    fontSize: SIZE.SM,
    fontWeight: "700",
  },
  input: {
    color: COLORS.darkGray,
    flex: 1,
    fontSize: SIZE.SM,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 27,
  },
  leaveContainer: {
    width: wp(27),
    borderColor: COLORS.red,
    borderWidth: 2,
    height: hp(4),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  leaveText: {
    color: COLORS.red,
    fontSize: SIZE.S,
    fontWeight: "600",
  },
  microphoneContainer: {
    width: 62,
    height: 62,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  InputstyleContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    height: hp(5),
    borderRadius: 8,
    paddingLeft: wp(2.5),
    alignItems: "center",
  },
  button: {
    backgroundColor: COLORS.skyBlue,
    height: hp(5),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  sendbutton: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    marginHorizontal: 10,
  },
});
