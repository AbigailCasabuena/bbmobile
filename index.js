import { AppRegistry, Dimensions,Text,View} from 'react-native';
//import {StackNavigator} from 'react-navigation';
import {DrawerNavigator,DrawerItems} from 'react-navigation';

import Splash from './components/Splash';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NewsFeed from './components/NewsFeed';

import React, { Component } from 'react';
/*import Login from './components/Login';
import Splash from './components/Splash';
import Login from './components/Login';
import Home from './components/Home';
import HomeScreen from './components/HomeScreen';
import React, {Component} from 'react';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            current: 'Splash'
        };
        console.log('Tska');

        setTimeout(()=>{
            this.setState({current: 'Login'})
            console.log('hello');
        },3000)
    }

    render(){
        const {current} = this.state;
        let screen = current === 'Splash' ? <Splash /> : <Home />
        return screen
    }
}*/
import {SplashScreen ,LoginScreen,SignUpScreen,NewsScreen} from './screen';

//import { YellowBox } from 'react-native';
//YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

/*const App = StackNavigator({
    "SplashScreen": {
        screen: Splash,
    },
    "LoginScreen": {
        screen: Login,
    },
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 });*/
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
    SplashScreen: {
        path: '/splash',
        screen: Splash,
        navigationOptions: {
            drawerLockMode: 'locked-closed', 
            drawerLabel: () => null
        }
    },
    Login: {
        path: '/',
        screen: Login,
        navigationOptions: {
            drawerLockMode: 'locked-closed', 
            drawerLabel: () => null
        }
    },
    SignUpScreen: {
        path: '/signup',
        screen: SignUp,
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
     initialRouteName: SplashScreen,
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
