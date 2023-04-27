import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Spinner from 'react-native-loading-spinner-overlay';
import { COLORS, IMAGE, SIZE } from '../common/theme'
import CustomButton from '../common/CustomButton';
import MainContainer from '../common/MainContainer';
import Toast from 'react-native-toast-message';
import useAppData, { useStore } from '../store';
import { AddBiography } from '../utils/API';

const AddBio = ({ navigation }) => {
    const [{ userid }] = useAppData()
    const [loading, setLoading] = useState(false)
    const [bio, setBio] = useState('')

    const onSubmitHandler = (values) => {
        if (bio.length > 10) {
            let body = {
                bio: bio,
            };
            setLoading(true);
            AddBiography(body, userid, onResponse, onError);
        } else {
            Alert.alert('Add Bio "minimum 10 character"')
        }
    }

    const onResponse = (res) => {
        setLoading(false);
        setRefreshToken(res.data.refresh);
        Toast.show({
          position: "top",
          type: "success",
          text1: res.message,
        });
        navigation.navigate("BottomTabs",{screen:"Home"})
      };
    
      const onError = (error) => {
        console.warn(error)
        setLoading(false);
        Toast.show({
          position: "top",
          type: "error",
          text1: error.message,
        });
      };



    return (
        <MainContainer>
            <View style={styles.logoContainer}>
                <Image source={IMAGE.logo} style={styles.logoImage} resizeMode="contain" />
                <Text style={styles.topText}>Let’s get to know a little bit more about you.</Text>
                <Text style={styles.bioText}>Write your bio.</Text>
            </View>
            <TextInput style={[styles.textInput, { borderColor: COLORS.gray, }]}
                placeholderTextColor={COLORS.black}
                placeholder={'I......'}
                multiline
                maxFontSizeMultiplier={3}
                numberOfLines={3}
                onChangeText={(t) => setBio(t)}
            />
            <CustomButton onPress={() => onSubmitHandler()} title={'All set.'} />
            <Spinner
                color={COLORS.purple}
                visible={loading}
                size='large'
                overlayColor='rgba(0,0,0,0.5)'
            />
        </MainContainer>
    )
}

export default AddBio

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: wp(5)
    },
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
        fontSize: SIZE.XM,
        marginHorizontal: wp(10),
        textAlign: 'center',
        fontWeight: '500'
    },
    bioText: {
        marginTop: hp(4),
        color: COLORS.black,
        fontSize: SIZE.M,
        fontWeight: '500'
    },
    textInput: {
        borderWidth: 0.8,
        borderRadius: 8,
        paddingHorizontal: wp(2.5),
        marginTop: hp(2),
        color: COLORS.black,
        fontSize: SIZE.SM,
        textAlignVertical: 'top',
        height: hp(10)
    }
})