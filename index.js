import { AppRegistry, Dimensions,Text,View,AsyncStorage} from 'react-native';
import {DrawerNavigator,DrawerItems,StackNavigator} from 'react-navigation';

import Splash from './components/Splash';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NewsFeed from './components/NewsFeed';
import ForgotPassword from './components/ForgotPassword';
import ForgotPassword2 from './components/ForgotPassword2';
import ForgotPassword3 from './components/ForgotPassword3';
import trycheck from './components/trycheck';
import HistoryTabs from './components/HistoryTabs';
import Notifications from './components/Notifications';
import EditProfile from './components/EditProfile';
import SingleEvent from './components/SingleEvent';
import SingleAnnouncement from './components/SingleAnnouncement';
import ProductSocket from './components/ProductSocket';

import React, { Component } from 'react';

var initial = '';
var uname = '';
//var value = "";

/*if(!(AsyncStorage.getItem('LoggedUser') == '' || AsyncStorage.getItem('LoggedUser') == null)){
    initial = 'Home';
}
else{
    initial = 'Login';
}*/

/*if(AsyncStorage.getItem('Logged') == 'true'){
    //value = AsyncStorage.getItem("LoggedUser");
    initial = 'Home';
}
else{
    initial = 'Login';
}*/


//alert(initial);

const ForgotStack = StackNavigator({
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

const SignUpStack = StackNavigator({
    SignUpScreen: {
        screen: SignUp,
    },
    BloodBanksScreen: {
        screen: trycheck,
    },
},{
    initialRouteName: 'SignUpScreen'
})

/*const SingleEventStack = StackNavigator({
    Notifications: {
        screen: Notifications,
    },
    SingleEvent: {
        screen: SingleEvent,
    },
},{
    initialRouteName: 'SingleEvent'
})*/


 const DrawerContent = (props) => (
    <View>
      <View
        style={{
          backgroundColor: '#B81E12',
          height: 140,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 30 }}>
          BloodBank PH
        </Text>
      </View>
      <DrawerItems {...props} />
    </View>
  )

 var {height, width} = Dimensions.get('window');

 let routeConfigs = {
    /*SplashScreen: {
        path: '/splash',
        screen: Splash,
        navigationOptions: {
            drawerLockMode: 'locked-closed', 
            drawerLabel: () => null
        }
    },*/
    Login: {
        path: '/',
        screen: Login,
        navigationOptions: {
            drawerLockMode: 'locked-closed', 
            drawerLabel: () => null
        }
    },
    SignUpScreen: {
        screen: SignUpStack,
        navigationOptions: {
            drawerLockMode: 'locked-closed', 
            drawerLabel: () => null
        }
    },
    Forgot: {
        screen: ForgotStack,
        navigationOptions: {
            drawerLockMode: 'locked-closed', 
            drawerLabel: () => null
        }
    },
    Home: {
        path: '/home',
        screen: NewsFeed
    },
    History: {
        path: '/history',
        screen: HistoryTabs
    },
    Notifications: {
        path: '/notifications',
        screen: Notifications,
        navigationOptions: {
            drawerLabel: () => null
        }
    },
    'Edit Profile': {
        path: '/editprofile',
        screen: EditProfile
    },
    SingleEvent: {
        path: '/singleevent',
        screen: SingleEvent,
        navigationOptions: {
            drawerLabel: () => null
        }
    },
    SingleAnnouncement: {
        path: '/singleannouncement',
        screen: SingleAnnouncement,
        navigationOptions: {
            drawerLabel: () => null
        }
    },
    ProductSocket: {
        path: '/psocket',
        screen: ProductSocket
    },
 };

 //let final;

 let drawernav = {
     //initialRouteName
     drawerWidth: (width/2) + (width/4),
     drawerPosition: 'left',
     drawerOpenRoute: 'DrawerOpen',
     drawerCloseRoute: 'DrawerClose',
     drawerToggleRoute: 'DrawerToggle',
     contentComponent: DrawerContent,
     contentOptions: {
        labelStyle: {
          fontFamily: 'SomeFont',
          color: '#000',
        },
      },
      initialRouteName: 'Login'
 };

const App = DrawerNavigator(routeConfigs,drawernav);


AppRegistry.registerComponent('bbmobile', () => App);