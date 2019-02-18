import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
import { Container, Header, Content, ListItem, CheckBox, Text, Body, Button} from 'native-base';
import BloodBanksLocationHeader from './BloodBanksLocationHeader';

var SampleArray = [];
var a = '';


export default class BloodBanksLocation extends Component {
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

  componentDidMount(){
    //this._retrieveData();
  }

  bb1(){
    /*const {navigate} = this.props.navigation;
    navigate('SelectLocation', {
      lat: 14.572152,
      long: 121.046809,
      name: "National Blood Center (PRC Tower)"
    });*/
    //this.props.navigation.navigate('Home');
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container>
        <BloodBanksLocationHeader {...this.props} />
        <Content style={{
          marginLeft: 25,
          marginRight: 25,
          marginTop: 20
        }}>
          <ListItem
          onPress={()=>{
            navigate('Select Location', {
              lat: 14.572152,
              long: 121.046809,
              name: "Philippine Red Cross Tower"
            });
          }}>
            <Body>
              <Text>Philippine Red Cross Tower</Text>
            </Body>
          </ListItem>
          <ListItem
          onPress={()=>{
            navigate('Select Location', {
              lat: 14.591352,
              long: 120.969958,
              name: "Philippine Red Cross Manila"
            });
            /*navigate('Select Location', {
              lat: 14.572152,
              long: 121.046809,
              name: "National Blood Center (PRC Tower)"
            });*/
          }}>
            <Body>
              <Text>Philippine Red Cross Manila</Text>
            </Body>
          </ListItem>
          <ListItem
          onPress={()=>{
            navigate('Select Location', {
              lat: 14.647253,
              long: 120.991964,
              name: "Philippine Red Cross Caloocan City Chapter"
            });
          }}>
            <Body>
              <Text>Caloocan City BCU/ BS</Text>
            </Body>
          </ListItem>
          <ListItem
          onPress={()=>{
            navigate('Select Location', {
              lat: 14.530809,
              long: 121.003934,
              name: "Philippine Red Cross Pasay City Chapter"
            });
          }}>
            <Body>
              <Text>Pasay City BCU/ BS</Text>
            </Body>
          </ListItem>
          <ListItem
          onPress={()=>{
            navigate('Select Location', {
              lat: 14.646031,
              long: 121.052052,
              name: "Philippine Red Cross Quezon City Chapter"
            });
          }}>
            <Body>
              <Text>Quezon City BCU/ BS</Text>
            </Body>
          </ListItem>
          <ListItem
          onPress={()=>{
            navigate('Select Location', {
              lat: 14.576587,
              long: 121.038994,
              name: "Philippine Red Cross Rizal Chapter"
            });
          }}>
            <Body>
              <Text>Rizal BCU/ BS</Text>
            </Body>
          </ListItem>
          <ListItem
          onPress={()=>{
            navigate('Select Location', {
              lat: 14.678039,
              long: 120.978484,
              name: "Philippine Red Cross Valenzuela City Chapter"
            });
          }}>
            <Body>
              <Text>Valenzuela City BCU/ BS</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}