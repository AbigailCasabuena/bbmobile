import { AppRegistry, Dimensions} from 'react-native';
//import {StackNavigator} from 'react-navigation';
import {DrawerNavigator} from 'react-navigation';
import Splash from './components/Splash';
import Login from './components/Login';
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
import {SplashScreen ,LoginScreen} from './screen';

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
 var {height, width} = Dimensions.get('window');

 let routeConfigs = {
    SplashScreen: {
        path: '/splash',
        screen: Splash
    },
    LoginScreen: {
        path: '/',
        screen: Login
    }
 };

 let drawernav = {
     initialRouteName: SplashScreen,
     drawerWidth: width/2,
     drawerPosition: 'left',
     drawerOpenRoute: 'DrawerOpen',
     drawerCloseRoute: 'DrawerClose',
     drawerToggleRoute: 'DrawerToggle',
     
 };

 const App = DrawerNavigator(routeConfigs,drawernav);

AppRegistry.registerComponent('bbmobile', () => App);
