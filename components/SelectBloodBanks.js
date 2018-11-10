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
//import { Container, Header, Content, ListItem, CheckBox, Text, Body } from 'native-base';

var bloodBankArray = [];
var count = 0;

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
          }}>
          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                alert('hello');
              }}
              >
                <CheckBox
              style={{flex: 1, paddingBottom: 20}}
              
              label={"National Blood Center (PRC Tower)"}
              />
              </TouchableOpacity>
           
            
              <View style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginLeft: 20
            }}>
              <CheckBox
                style={{flex: 1, paddingBottom: 20}}
                onClick={()=>{
                  this.setState({
                    isChecked2: !this.state.isChecked2
                  })
                }}
                isChecked={this.state.isChecked2}
                label={"National Blood Center (Manila)"}
              />
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginLeft: 20
            }}>
              <CheckBox
                style={{flex: 1, paddingBottom: 20}}
                onClick={()=>{
                  this.setState({
                    isChecked3: !this.state.isChecked3
                  })
                }}
                isChecked={this.state.isChecked3}
                label={"Caloocan City BCU/ BS"}
              />
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginLeft: 20
            }}>
              <CheckBox
                style={{flex: 1, paddingBottom: 20}}
                onClick={()=>{
                  this.setState({
                    isChecked4: !this.state.isChecked4
                  })
                }}
                isChecked={this.state.isChecked4}
                label={"Pasay City BCU/ BS"}
              />
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginLeft: 20
            }}>
              <CheckBox
                style={{flex: 1, paddingBottom: 20}}
                onClick={()=>{
                  this.setState({
                    isChecked5: !this.state.isChecked5
                  })
                }}
                isChecked={this.state.isChecked5}
                label={"Quezon City BCU/ BS"}
              />
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginLeft: 20
            }}>
              <CheckBox
                style={{flex: 1, paddingBottom: 20}}
                onClick={()=>{
                  this.setState({
                    isChecked6: !this.state.isChecked6
                  })
                }}
                isChecked={this.state.isChecked6}
                label={"Rizal BCU/ BS"}
              />
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginLeft: 20,
            }}>
              <CheckBox
                style={{flex: 1, paddingBottom: 20}}
                onClick={()=>{
                  this.setState({
                    isChecked7: !this.state.isChecked7
                  })
                  _alert();
                }}
                isChecked={this.state.isChecked7}
                label={"Valenzuela City BCU/ BS"}
              />
            </View>
              */
            }
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
                //alert('hello ' + this.props.navigation.state.params.donatedbefore);
                //navigate('SignUpScreen', { name: 'SignUpScreens'})
                alert(this.state.isChecked1);
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
    marginTop: 30,
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
