import { StyleSheet, Image, View, Text, TouchableOpacity, Modal, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import GradientText from '../common/GradientText'
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from "@react-native-community/blur";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { COLORS, IMAGE, SIZE } from '../common/theme'
import MainContainer from '../common/MainContainer'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getRoomApi } from '../utils/API';
import useAppData, { useStore } from '../store';

const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const [{ accessToken, fecthRooms }] = useAppData()
  const { setRoomData, setFecthRooms } = useStore()
  const [roomData, setRoomDatas] = useState([])
  const [id, setID] = useState()

  useEffect(() => {
    roomsHandler()
  }, [])

  useEffect(() => {
    if (fecthRooms) {
      roomsHandler()
    }
  },[fecthRooms])

  const roomsHandler = () => {
    setLoading(true)
    getRoomApi(accessToken, onResponse, onError)
  }
  const onResponse = (res) => {
    setRoomData(res);
    setRoomDatas(res)
    setFecthRooms(false)
    setLoading(false)
  }

  const onError = (e) => {
    setLoading(false)
  }

  return (
    <MainContainer>
      <View style={styles.topContainer}>
        <GradientText style={styles.gradientText}>
          Chat Rooms
        </GradientText>
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={{ paddingHorizontal: 25 }}
            onPress={() => navigation.navigate('CreateRoom')}
          >
            <FontAwesome5
              size={20} color={COLORS.purple}
              name={'plus'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={IMAGE.profile} style={styles.profileImage} />
          </TouchableOpacity>
        </View>


      </View>
      <FlatList showsVerticalScrollIndicator={false} data={roomData} renderItem={({ item }) => (
        <LinearGradient
          style={styles.linearGradient}
          colors={[COLORS.skyBlue, COLORS.navyBlue]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <Text style={styles.cardTopText}>{item.name}</Text>
          <View style={styles.timeContainer}>
            <AntDesign name='clockcircleo' size={10} color={COLORS.white} style={styles.clockIcon} />
            <Text style={styles.cardBottomText}>{item.date_time}</Text>
          </View>
          <Text style={styles.cardBottomText}>{item.description}
          </Text>
          <View style={styles.cardBottomContainer}>
            <View style={styles.directionContainer}>
              <Image source={IMAGE.profile} style={styles.image} />
              <Image source={IMAGE.profile} style={[styles.image, { position: "absolute", right: 20 }]} />
              <Image source={IMAGE.profile} style={[styles.image, { marginLeft: 4 }]} />
              <Text style={styles.imageCounteText}>{item.count_particpant}</Text>
            </View>
            <TouchableOpacity style={styles.cardButton} onPress={() => { setID(item.id); setModalVisible(!modalVisible) }}>
              <Text style={styles.buttonText}>
                Join Now
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      )} />
      <Spinner
        color={COLORS.purple}
        visible={loading}
        size='large'
        overlayColor='rgba(0,0,0,0.5)'
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
          style={styles.absolute}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={IMAGE.logo} style={styles.logoImage} resizeMode="contain" />
            <Text style={styles.topText}>Community Guidelines</Text>
            <Text style={styles.bioText}>1. Please be respectful. You will get kicked out.
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('AudioChat', { id })
              }}
            >
              <Text style={styles.textStyle}>Join</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </MainContainer>
  )
}

export default Home

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(2),
  },
  gradientText: {
    fontSize: SIZE.SL,
    fontWeight: '700',
  },
  profileImage: {
    width: wp(10),
    height: hp(5),
    borderRadius: 100,
    resizeMode: 'cover'
  },
  linearGradient: {
    padding: 15,
    borderRadius: 5,
    marginVertical: hp(1.5),
    borderRadius: 12,
    elevation: 8
  },
  cardTopText: {
    color: COLORS.white,
    fontSize: SIZE.XM,
    fontWeight: '700',
    textTransform: 'capitalize'
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.3),
  },
  topText: {
    marginTop: hp(1),
    color: COLORS.black,
    fontSize: SIZE.XM,
    marginHorizontal: wp(10),
    textAlign: 'center',
    fontWeight: '500'
  },
  bioText: {
    marginVertical: hp(2),
    color: COLORS.black,
    marginHorizontal: wp(10),
    fontSize: SIZE.M,
    fontWeight: '500',
    textAlign: 'center',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
    width: "100%",
  },
  buttonClose: {
    backgroundColor: "#C284FD",
  },

  clockIcon: {
    marginRight: 5
  },
  cardBottomText: {
    color: COLORS.white,
    fontSize: SIZE.S,
    fontWeight: '600',
  },
  cardBottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(3),
  },
  directionContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: wp(5),
    height: hp(2.5),
    borderRadius: 100,
    borderWidth: 1,
    resizeMode: 'cover',
    borderColor: COLORS.white
  },
  imageCounteText: {
    fontSize: 12,
    color: COLORS.white,
    left: 8
  },
  cardButton: {
    backgroundColor: COLORS.white,
    width: wp(25),
    height: hp(3.5),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: "auto",
    marginRight: 15
  },
  buttonText: {
    fontSize: SIZE.XS,
    fontWeight: '600',
    color: COLORS.black,
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
  logoImage: {
    width: wp(14),
    height: hp(7),
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 25
  },
})
