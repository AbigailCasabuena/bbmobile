import { AppRegistry } from 'react-native';
//import App from './App';
//import Login from './components/Login';
import Splash from './components/Splash';
import Login from './components/Login';
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
        let screen = current === 'Splash' ? <Splash /> : <Login />
        return screen
    }
}

AppRegistry.registerComponent('bbmobile', () => Main);
