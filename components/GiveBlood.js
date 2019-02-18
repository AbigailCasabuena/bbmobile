import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
import { Container, Header, Content, ListItem, CheckBox, Text, Body, Button, Right} from 'native-base';
import GiveBloodHeader from './GiveBloodHeader';

var SampleArray = [];
var a = '';

export default class GiveBlood extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentDidMount(){
    //this._retrieveData();
  }

  selectbloodbank(bloodbankid, num){
    var bbname = '';
    var address = '';
    var officehours = '';
    var days = '';

    if(num ==1){
      bbname = "Philippine Red Cross Tower";
      address = "37 EDSA corner Boni Avenue, \nMandaluyong City ";
      officehours = "";
      days = "";
    }

    if(num ==2){
      bbname = "Philippine Red Cross Manila";
      address = "Bonifacio Drive, Port Area, Manila";
      officehours = "Office Hours: 8:00 AM to 5:00 PM";
      days = "Monday to Friday";
    }

    if(num ==3){
      bbname = "Philippine Red Cross Caloocan City Chapter";
      address = "7th Ave. Grace Park, Caloocan City";
      officehours = "Office Hours: 8:00 AM to 5:00 PM";
      days = "Monday to Friday";
    }

    if(num ==4){
      bbname = "Philippine Red Cross Pasay City Chapter";
      address = "2354 CAA Compound, Aurora Blvd. \n(old Tramo), Pasay City";
      officehours = "";
      days = "";
    }

    if(num ==5){
      bbname = "Philippine Red Cros Quezon City Chapter";
      address = "Quezon City Hall Compound, \nKalayaan Avenue, Diliman, Quezon City";
      officehours = "Office Hours: 9:00 AM to 8:00 PM";
      days = "Monday to Sunday";
    }

    if(num ==6){
      bbname = "Philippine Red Cross Rizal Chapter";
      address = "Shaw Blvd., Pasig City";
      officehours = "";
      days = "";
    }

    if(num ==7){
      bbname = "Philippine Red Cros Valenzuela City Chapter";
      address = "Dahlia Street, Villa Teresa Subdivision,\n Marulas, Valenzuela City";
      officehours = "Office Hours: 7:30 AM to 9:30 PM";
      days = "Monday to Sunday";
    }

    this.props.navigation.navigate('GiveBlood2', {
      itemId: bloodbankid,
      name: bbname,
      bbaddress: address,
      bbhours: officehours,
      bbdays: days
    });
  }

  render() {
    //const { navigate } = this.props.navigation;
    return (
      <Container>
        <GiveBloodHeader {...this.props} />
        <Text style={{
          textAlign:'center',
          color: '#B81E12',
          fontSize: 20,
          fontWeight: 'bold',
          paddingBottom: 20,
          marginTop: 10,
        }}>
            Blood Banks
        </Text>
        <Text style={{
            textAlign:'justify',
            color:'black',
            fontSize:15,
            marginLeft:25,
            marginBottom: 5, 
            fontSize: 16}}>
          Select a blood bank for your blood donation appointment.
        </Text>
        <Content style={{
          marginLeft: 25,
          marginRight: 25
        }}>
          <ListItem
          onPress={_=>this.selectbloodbank("5c17671a7eeb193eb548d7fb",1)}>
            <Body>
              <Text>National Blood Center (PRC Tower)</Text>
            </Body>
            <Right>
              <Text>Hello</Text>
            </Right>
          </ListItem>
          <ListItem
          onPress={_=>this.selectbloodbank("5c1767247eeb193eb548d7fc",2)}>
            <Body>
              <Text>National Blood Center (Manila)</Text>
            </Body>
          </ListItem>
          <ListItem
          onPress={_=>this.selectbloodbank("5c1766da7eeb193eb548d7f6",3)}>
            <Body>
              <Text>Caloocan City BCU/ BS</Text>
            </Body>
          </ListItem>
          <ListItem
          onPress={_=>this.selectbloodbank("5c1766e67eeb193eb548d7f7",4)}>
            <Body>
              <Text>Pasay City BCU/ BS</Text>
            </Body>
          </ListItem>
          <ListItem
          onPress={_=>this.selectbloodbank("5c1766f37eeb193eb548d7f8",5)}>
            <Body>
              <Text>Quezon City BCU/ BS</Text>
            </Body>
          </ListItem>
          <ListItem
          onPress={_=>this.selectbloodbank("5c1766ff7eeb193eb548d7f9",6)}>
            <Body>
              <Text>Rizal BCU/ BS</Text>
            </Body>
          </ListItem>
          <ListItem
          onPress={_=>this.selectbloodbank("5c17670d7eeb193eb548d7fa",7)}>
            <Body>
              <Text>Valenzuela City BCU/ BS</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}