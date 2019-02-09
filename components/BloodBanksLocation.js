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

  render() {
    return (
      <Container>
        <BloodBanksLocationHeader {...this.props} />
        <Content style={{
          marginLeft: 25,
          marginRight: 25
        }}>
          <ListItem
          onPress={this.AddItemsToArray1}>
            <Body>
              <Text>National Blood Center (PRC Tower)</Text>
            </Body>
          </ListItem>
          <ListItem
          onPress={this.AddItemsToArray2}>
            <Body>
              <Text>National Blood Center (Manila)</Text>
            </Body>
          </ListItem>
          <ListItem
          onPress={this.AddItemsToArray3}>
            <Body>
              <Text>Caloocan City BCU/ BS</Text>
            </Body>
          </ListItem>
          <ListItem
          onPress={this.AddItemsToArray4}>
            <Body>
              <Text>Pasay City BCU/ BS</Text>
            </Body>
          </ListItem>
          <ListItem
          onPress={this.AddItemsToArray5}>
            <Body>
              <Text>Quezon City BCU/ BS</Text>
            </Body>
          </ListItem>
          <ListItem
          onPress={this.AddItemsToArray6}>
            <Body>
              <Text>Rizal BCU/ BS</Text>
            </Body>
          </ListItem>
          <ListItem
          onPress={this.AddItemsToArray7}>
            <Body>
              <Text>Valenzuela City BCU/ BS</Text>
            </Body>
          </ListItem>
        </Content>
        <Button onPress={this.signup}
        style={{
          backgroundColor: "#B81E12",
          alignSelf: "center",
          marginBottom: 15}}>
            <Text>Schedule Appointment</Text>
        </Button>
      </Container>
    );
  }
}