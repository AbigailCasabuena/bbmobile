import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Header from './Header';
import Button from 'react-native-button';
//import { YellowBox } from 'react-native';
//YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

type Props = {};
export default class Login extends Component<Props> {
  /*constructor(props) {
    super(props)
  }*/

  onPress = () => {
    
  }

  /*static navigationOptions = ({navigation}) =>{
    let label = 'Login';
    let icon = () => (
      <Image 
        source={require('../img/bngtn.jpg')}
        style={{width:30,height:30}}
      />
    );
    return {label,icon};
  };*/


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container1}>
        <KeyboardAvoidingView style={styles.style1}
        keyboardVerticalOffset={-500}>
        <View style={styles.container2}>
          <Text style={styles.text}>
            BloodBank PH
          </Text>
          <TextInput style={styles.un}
            keyboardType= 'email-address'
            placeholder='username/email'>
          </TextInput> 
          <TextInput style={styles.un}
            placeholder='password'
            secureTextEntry={true}>
          </TextInput>
          <View style={styles.forview}>
            <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigate('ForgotScreen', { name: 'ForgotScreens' })
            }}
            >
              <Text style={styles.buttontext}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signview}>
            <TouchableOpacity
            style={{backgroundColor: '#B81E12',
                  padding: 15,}}
            onPress={() => {
              navigate('Home', { name: 'HomeScreens' })
            }}
            >
              <Text style={styles.signtext}>Sign in</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.accview}>
            <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigate('SignUpScreen', { name: 'SignUpScreens' })
            }}
            >
              <Text style={styles.buttontext}>Don't have an account?</Text>
            </TouchableOpacity>
          </View>
        </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  style1: {
    flex: 1,
  },
  container1: {
    flex: 1,
    flexDirection: 'column',
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  un: {
    width: '70%',
    height: 60,
  },
  text: {
    color: '#B81E12',
    fontSize: 20,
    fontWeight: 'bold',
  },
  forview: {
    width: '70%',
    flexDirection: 'row'
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ECE6E6',
  },
  buttontext: {
    color: 'black'
  },
  signview: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 50
  },
  /*buttonsign: {
    backgroundColor: '#B81E12',
    padding: 15,
  },*/
  signtext: {
    color: 'white'
  },
  accview: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
