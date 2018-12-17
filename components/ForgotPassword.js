import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import Login from './Login';

type Props = {};
export default class ForgotPassword extends Component<Props> {
  static navigationOptions = {
    header: null
  }

  constructor(props){
    super(props);
    this.state = {
      uname: '',
    }
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
          <Text style={{textAlign:'left',color:'black'}}>Enter your username: </Text>
          <TextInput style={styles.un}
            placeholder='username' onChangeText={(text)=>{
              this.setState({uname: text})
            }}/>
          <View style={styles.accview}>
            <TouchableOpacity
            style={styles.button}
            onPress={() => {
              fetch('http://192.168.0.15:8080/api/resetpassword', {
                  method: 'PUT',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    username: this.state.uname
                  })
                  })
                  .then((response) => {
                  })  
                  .done();
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
  headerview: {
    width: '100%',
    height: 40,
    backgroundColor: 'black',
  },
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
