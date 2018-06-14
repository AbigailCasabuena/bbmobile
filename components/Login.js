import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

type Props = {};
export default class Login extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  onPress = () => {
    
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          BloodBank PH
        </Text>
        <TextInput style={styles.un}
          placeholder='username/email'>
        </TextInput> 
        <TextInput style={styles.un}
          placeholder='password'
          secureTextEntry={true}>
        </TextInput> 
        <View style={styles.forview}>
          <TouchableOpacity
          style={styles.button}
          onPress={this.onPress}
          >
            <Text style={styles.buttontext}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signview}>
          <TouchableOpacity
          style={styles.buttonsign}
          onPress={this.onPress}
          >
            <Text style={styles.signtext}>Sign in</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.accview}>
          <TouchableOpacity
          style={styles.button}
          onPress={this.onPress}
          >
            <Text style={styles.buttontext}>Don't have an account?</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  un: {
    width: '70%',
    height: '10%'
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
  buttonsign: {
    backgroundColor: '#B81E12',
    padding: 15,
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
