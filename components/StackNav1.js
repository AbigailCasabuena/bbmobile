import { AppRegistry, Dimensions,Text,View} from 'react-native';
import {DrawerNavigator,DrawerItems,StackNavigator} from 'react-navigation';
import ForgotPassword from './ForgotPassword';
import ForgotPassword2 from './ForgotPassword2';
import ForgotPassword3 from './ForgotPassword3';

export const Stack = StackNavigator({
    ForgotScreen: {
        screen: ForgotPassword,
    },
    Forgot2Screen: {
        screen: ForgotPassword2,
    },
    Forgot3Screen: {
        screen: ForgotPassword3,
    }
},{
    initialRouteName: 'ForgotScreen'
})