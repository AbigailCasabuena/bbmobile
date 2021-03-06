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
import Facilities from './components/Facilities';
import BloodRequest from './components/BloodRequest';
//import MapView from './components/MapView';

import React, { Component } from 'react';

var initial = '';
var uname = '';

var checktype = false;

global.tryvar = false;
//var value = "";

var abi = "";

_retrieveData = async () => {
    try {
      const value2 = await AsyncStorage.getItem('LoggedUser');
      //this.setState({userId: String(value2)});
      abi=String(value2);
      //alert(abi);
      return abi;
      //return abi;
    }catch(e){
        
    }
}

//this._retrieveData();

var xx= "hh";
//alert(xx);
//var xx = _retrieveData();
//alert(xx);

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

var username = '';
var firstname = '';
var lastname = '';
var bloodtype = '';
var userid = '';

getLogged = () =>{
    //alert(lguname);
    //alert(this.abi);
    AsyncStorage.getItem('LoggedUser',(err, val)=>{
        username = val;
    })

    AsyncStorage.getItem('LoggedFName',(err, val)=>{
        firstname = val;
    })

    AsyncStorage.getItem('LoggedLName',(err, val)=>{
        lastname = val;
    })

    AsyncStorage.getItem('LoggedBloodType',(err, val)=>{
        bloodtype = val;
    })

}

var logged = '';

_retrieveDatax = async () => {
    try {
      const value1 = await AsyncStorage.getItem('LoggedUserId');
      logged = value1;
    } catch (error) {
      alert('error retrieve logged');
    }

    //alert(logged);
}

this._retrieveDatax();

this.getLogged();

var usertype = "";

getType=()=>{
    //alert(username);
    AsyncStorage.getItem('LoggedUserId',(err, val)=>{
        userid = val;
        //alert(userid);
        fetch("http://192.168.43.18:3000/users/getId/"+userid)
            .then((result) => result.json())
            .then((res) => {
              //alert(res[0].user_type);
              if(res[0].user_type == 'bbuser'){
                  //alert('true');
                  //return true;
                  checktype = true;
              }else{
                  //return false;
                  checktype = false;
              }
              alert(checktype);
            })
        .catch(e => e);
    })
}

//this.getType();

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
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          {firstname + " " + lastname}
        </Text>
        <Text style={{ color: 'white', fontSize: 16 }}>
          {"@" + username + "\n"}
        </Text>
        <Text style={{ color: 'white', fontSize: 16 }}>
          {"Blood Type: " + bloodtype}
        </Text>
      </View>
      <DrawerItems {...props} />
    </View>
  )

 var {height, width} = Dimensions.get('window');

 var abi = "xx";

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
        screen: ProductSocket,
        navigationOptions: {
            drawerLabel: function(){
                var ckt = false;
                //alert(logged);
                    //alert(userid);
                fetch("http://192.168.43.18:3000/users/getId/"+logged)
                .then((result) => result.json())
                .then((res) => {
                  //alert(res[0].user_type);
                  if(res[0].user_type == 'bbuser'){
                      ckt = true;
                  }else{
                      ckt = false;
                  }
                  //alert(ckt);
                  return ckt;
                })
                .finally((ckt)=>{
                    return ckt;
                })
                .catch(e => e);
                if(ckt == true){
                    //alert(global.tryvar);
                    return "Producto";
                }else{
                    //alert(global.tryvar);
                    return "Products";
                }
            }
        }
    },
    'Blood Services Facilities Details': {
        path: '/facilitiesdetails',
        screen: Facilities
    },
    'Blood Request': {
        path: '/bloodrequest',
        screen: BloodRequest
    }
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

var App = DrawerNavigator(routeConfigs,drawernav);


AppRegistry.registerComponent('bbmobile', () => App);