import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import CheckBox from 'react-native-checkbox';
import SignUp from './SignUp';
import {INFO} from '../state/SignUpInfo';

type Props = {};
export default class SelectBloodBanks extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      isChecked1: false,
      isChecked2: false,
      isChecked3: false,
      isChecked4: false,
      isChecked5: false,
      isChecked6: false,
      isChecked7: false,
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    //const name = 'name';
    //alert(INFO[name].value);
    //INFO[name].value = 'abigail';
    //alert(INFO[name].value);
    return (
      <View style={styles.container1}>
        <KeyboardAvoidingView style={styles.style1}
        keyboardVerticalOffset={-500}>
        <View style={styles.container2}>
          <Text style={styles.text}>
            Blood Banks
          </Text>
          <Text style={{
            textAlign:'justify',
            color:'black',
            fontSize:15,
            marginLeft:25,
            marginBottom: 30, 
            fontSize: 16}}>
          Please check all the blood banks where you have already donated.</Text>
          
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginLeft: 10,
          }}>
            <CheckBox
              style={{flex: 1, padding: 10, paddingBottom: 20}}
              onClick={()=>{
                this.setState({
                  isChecked1: !this.state.isChecked1
                })
              }}
              isChecked={this.state.isChecked1}
              label={"National Blood Center (PRC Tower)"}
              labelStyle={{fontSize: 16}}
            />

            <CheckBox
              style={{flex: 1, padding: 10, paddingBottom: 20}}
              onClick={()=>{
                this.setState({
                  isChecked2: !this.state.isChecked2
                })
              }}
              isChecked={this.state.isChecked2}
              label={"National Blood Center (Manila)"}
              labelStyle={{fontSize: 16}}
            />

            <CheckBox
              style={{flex: 1, padding: 10, paddingBottom: 20}}
              onClick={()=>{
                this.setState({
                  isChecked3: !this.state.isChecked3
                })
              }}
              isChecked={this.state.isChecked3}
              label={"Caloocan City Blood Collecting Unit/ Blood Station"}
              labelStyle={{fontSize: 16}}
            />

            <CheckBox
              style={{flex: 1, padding: 10, paddingBottom: 20}}
              onClick={()=>{
                this.setState({
                  isChecked4: !this.state.isChecked4
                })
              }}
              isChecked={this.state.isChecked4}
              label={"Pasay City Blood Collecting Unit/ Blood Station"}
              labelStyle={{fontSize: 16}}
            />

            <CheckBox
              style={{flex: 1, padding: 10, paddingBottom: 20}}
              onClick={()=>{
                this.setState({
                  isChecked5: !this.state.isChecked5
                })
              }}
              isChecked={this.state.isChecked5}
              label={"Quezon City Blood Collecting Unit/ Blood Station"}
              labelStyle={{fontSize: 16}}
            />

            <CheckBox
              style={{flex: 1, padding: 10, paddingBottom: 20}}
              onClick={()=>{
                this.setState({
                  isChecked6: !this.state.isChecked6
                })
              }}
              isChecked={this.state.isChecked6}
              label={"Rizal Blood Collecting Unit/ Blood Station"}
              labelStyle={{fontSize: 16}}
            />

            <CheckBox
              style={{flex: 1, padding: 10, paddingBottom: 20}}
              onClick={()=>{
                this.setState({
                  isChecked7: !this.state.isChecked7
                })
              }}
              isChecked={this.state.isChecked7}
              label={"Valenzuela City Blood Collecting Unit/ Blood Station"}
              labelStyle={{fontSize: 16}}
            />
          </View>

            <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            
            }}>
              <TouchableOpacity
              style={styles.button}
              onPress={() => {
                //navigate('SignUpScreen', { name: 'SignUpScreens' })
                alert('hello ' + this.props.navigation.state.params.donatedbefore);
                navigate('SignUpScreen', { name: 'SignUpScreens' , donatedbefore: this.props.navigation.state.params.donatedbefore})
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
    marginTop: 20
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
