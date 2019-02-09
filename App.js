/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Dimensions,Text,View,AsyncStorage, Image} from 'react-native';
import {DrawerNavigator,DrawerItems,StackNavigator} from 'react-navigation';

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
import SelectLocation from './components/SelectLocation';
import Events from './components/Events';
import NotificationsAdmin from './components/NotificationsAdmin';
import MapViewCurrent from './components/MapViewCurrent';
import MapExample from './components/MapExample';
import MapGithub from './components/MapGithub';
import GiveBlood from './components/GiveBlood';
import FocusOnMarkers from './components/FocusOnMarkers';
import BloodBanksLocation from './components/BloodBanksLocation';

var username = '';
var firstname = '';
var lastname = '';
var bloodtype = '';

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

const Admin = DrawerNavigator({
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
          drawerLabel: () => null
        }
    },
    'Blood Services Facilities Details': {
        path: '/facilitiesdetails',
        screen: Facilities
    },
    'Blood Request': {
        path: '/bloodrequest',
        screen: BloodRequest
    },
    'Blood Banks Location': {
        path: '/bblocation',
        screen: BloodBanksLocation
    },
    'Select Location': {
      path: '/selectlocation',
      screen: SelectLocation,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    /*'Map View': {
      path: '/mapview',
      screen: MapViewCurrent
    },*/
    'Map Example': {
      path: '/mapexample',
      screen: MapExample
    },
    /*
    'Map Github': {
      path: '/mapgithub',
      screen: MapGithub
    },*/
    'Give Blood': {
      path: '/giveblood',
      screen: GiveBlood
    },
    /*'Focus On Markers': {
      path: '/focus',
      screen: FocusOnMarkers
    }*/
  },{
  initialRouteName: 'Login',
  contentComponent: DrawerContent,
  drawerPosition: 'left',
  contentOptions: {
    labelStyle: {
      fontFamily: 'SomeFont',
      color: '#000',
      
    },
  }
}
);

const Admin2 = DrawerNavigator({
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
  Notifications: {
      path: '/notifications',
      screen: NotificationsAdmin,
      navigationOptions: {
          drawerLabel: () => null
      }
  },
  'Edit Profile': {
      path: '/editprofile',
      screen: EditProfile
  },
  'Blood Request': {
      path: '/bloodrequest',
      screen: BloodRequest
  },
  'Events':{
    path: '/events',
    screen: Events
  },
  },{
  initialRouteName: 'Login',
  contentComponent: DrawerContent,
  drawerPosition: 'left',
  contentOptions: {
    labelStyle: {
      fontFamily: 'SomeFont',
      color: '#000',
      
    },
  }
}
);

//type Props = {};
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      type: '',
      logged: '',
    }
  }

  _retrieveDatax = () => {
    /*try {
      const value1 = await AsyncStorage.getItem('LoggedUserId');
      fetch("http://192.168.43.18:3000/users/getId/"+value1)
      .then((result) => result.json())
      .then((res) => {
        //alert(res[0].user_type);
        if(res[0].user_type == 'bbuser'){
          this.setState({type: 'bbuser'});
        }else{
          //ckt = false;
        }
      })
      .catch(e => e);
    } catch (error) {
      alert('error retrieve logged');
    }*/
    AsyncStorage.getItem("LoggedUserId").then((value) => {
      fetch("http://192.168.43.18:3000/users/getId/"+value)
      .then((result) => result.json())
      .then((res) => {
        //alert(res[0].user_type);
        //if(res[0].user_type == 'bbuser'){
          //this.setState({type: 'bbuser'});
        //}else{
          //ckt = false;
        //}
      })
      .catch(e => e);
    })

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

    AsyncStorage.getItem('LoggedUserType',(err, val)=>{
        this.setState({type: val})
    })
  }

  componentDidMount(){
    this._retrieveDatax();
    //alert(this.state.logged);
  }

  render() {
    if (this.state.type==='bbuser'){
      return <Admin />
    }else{
      return <Admin2 />
    }
  }
}

