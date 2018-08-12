import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Header from './Header';
import Button from 'react-native-button';

type Props = {};
export default class ForgotPassword2 extends Component<Props> {
 
  onPress = () => {
    
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container1}>
        <KeyboardAvoidingView style={styles.style1}
        keyboardVerticalOffset={-500}>
        <View style={styles.container2}>
          <Text style={styles.text}>
            Password Reset 
          </Text>
          <Text style={{textAlign:'justify',color:'black',fontSize:15,marginLeft:15, marginRight:10,}}>The 6-digit verification code has been sent to your email address. 
          The code will expire 15 minutes after it has been sent. Enter the code below:</Text>
          <TextInput style={styles.un}
            keyboardType='numeric'
            placeholder='6-digit verification code'>
          </TextInput> 
          <View style={styles.accview}>
            <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigate('Forgot3Screen', { name: 'Forgot3Screens' })
            }}
            >
              <Text style={styles.buttontext}>Submit</Text>
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
    paddingBottom: 20,
  },
  forview: {
    width: '70%',
    flexDirection: 'row'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#B81E12',
    padding: 10,
  },
  buttontext: {
    color: 'white'
  },
  signview: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 50
  },
  signtext: {
    color: 'white'
  },
  accview: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
