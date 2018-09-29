import { AppRegistry, Dimensions,Text,View} from 'react-native';
//import {StackNavigator} from 'react-navigation';
import {DrawerNavigator,DrawerItems,StackNavigator} from 'react-navigation';
//import { createStore, combineReducers } from 'redux';
//import { connect } from 'react-redux';

import Splash from './components/Splash';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NewsFeed from './components/NewsFeed';
import ForgotPassword from './components/ForgotPassword';
import ForgotPassword2 from './components/ForgotPassword2';
import ForgotPassword3 from './components/ForgotPassword3';
import SelectBloodBanks from './components/SelectBloodBanks';
//import Stack from './components/StackNav1';
//import ModalExample from './components/ModalExample';

import React, { Component } from 'react';
import {SplashScreen ,LoginScreen,SignUpScreen,NewsScreen,ForgotScreen,Forgot2Screen,Forgot3Screen} from './screen';

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
        screen: SelectBloodBanks,
    },
},{
    initialRouteName: 'SignUpScreen'
})

 const DrawerContent = (props) => (
    <View>
      <View
        style={{
          backgroundColor: '#f50057',
          height: 140,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 30 }}>
          Header
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
    
 };

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
      }
 };

const App = DrawerNavigator(routeConfigs,drawernav);


AppRegistry.registerComponent('bbmobile', () => App);