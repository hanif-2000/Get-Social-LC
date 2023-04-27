import {
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    StatusBar,
    View
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from './theme';

const MainContainer = ({ isLight, translucent, children,Style }) => {
    return (
        <View style={[styles.container,Style]}>
            <StatusBar
                animated={true}
                backgroundColor={COLORS.white}
                barStyle={isLight ? 'light-content' : 'dark-content'}
                translucent={translucent}
            />
            <KeyboardAvoidingView
                style={{flex:1}}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                {children}
            </KeyboardAvoidingView>
        </View>
    );
};
export default MainContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: wp(5),
    },
});