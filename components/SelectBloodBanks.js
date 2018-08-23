import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  CheckBox,
} from 'react-native';

type Props = {};
export default class SelectBloodBanks extends Component<Props> {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container1}>
        <KeyboardAvoidingView style={styles.style1}
        keyboardVerticalOffset={-500}>
        <View style={styles.container2}>
          <Text style={styles.text}>
            Blood Banks
          </Text>
          <Text style={{textAlign:'justify',color:'black',fontSize:15,marginLeft:15, marginRight:10,}}>
          Please check all the blood banks where you have already donated.</Text>
          
        

          <View style={styles.accview}>
            <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigate('SignUpScreen', { name: 'SignUpScreens' })
            }}
            >
              <Text style={styles.buttontext}>Done</Text>
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
