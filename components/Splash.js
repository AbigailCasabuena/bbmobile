import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage
} from 'react-native';
import { Button } from 'react-native';
import Header from './Header';

type Props = {};
export default class Splash extends React.Component {
  static navigationOptions = ({navigation}) =>{
    return { };
  };
  
  constructor(props){
    super(props);
    //const { navigatex } = this.props.navigation;
    this.state = {current: 'Splash', done: false};
    /*AsyncStorage.getItem("screencheck").then((value) => {
      if(value == true){
        this.props.navigation.navigate('Login');
       }
    })
    .then(res => {
    
    });*/
    setTimeout(()=>{
      //navigatex('LoginScreen', { name: 'LoginScreens' })
      this.setState({current: 'Login', done: true});
    },1000);
  }
  render() {
    const { navigate } = this.props.navigation;
    const {current} = this.state
    const {done} = this.state
    if(current == 'Login'){
      navigate('Login', { name: 'LoginScreens' })
      //.setState({done: true});
      AsyncStorage.setItem('screencheck', true);
    }
    /*if(done == true){
      navigate('Login', { name: 'LoginScreens' })
    }*/
    return (
      <View style={styles.container}>
      
        <Image
          style={styles.image}
          source={require('../img/bbphicon.png')}
        />
        <Text style={styles.text}>
          BloodBank PH
        </Text>
        {/*<Button
          title="Go to Jane's profile"
          onPress={() => {
            navigate('Login', { name: 'LoginScreens' })
          }}
        />*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image:{
    width: '35%',
    height: '25%'
  },
  text: {
    color: '#B81E12',
    fontSize: 30,
    fontWeight: 'bold',
  }
});
