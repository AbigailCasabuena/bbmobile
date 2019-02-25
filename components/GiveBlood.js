import React, { Component } from 'react';
import {AsyncStorage, View} from 'react-native';
import { Container, Header, Content, ListItem, CheckBox, Text, Body, Button, Right, Spinner} from 'native-base';
import GiveBloodHeader from './GiveBloodHeader';
import geolib from 'geolib';

var locationNotSorted = [];
var locationSorted = [];
var order = [];
var a = '';

var bbname_arr = ["Philippine Red Cross Tower", "Philippine Red Cross Manila", "Philippine Red Cross Caloocan City Chapter",
                  "Philippine Red Cross Pasay City Chapter", "Philippine Red Cross Quezon City Chapter",
                  "Philippine Red Cross Rizal Chapter", "Philippine Red Cross Valenzuela Chapter"];

var bbid_arr = ["5c015361dadb0c3b00739de0","5c015322dadb0c3b00739ddf","5c1766da7eeb193eb548d7f6",
                "5c1766e67eeb193eb548d7f7","5c1766f37eeb193eb548d7f8",
                "5c1766ff7eeb193eb548d7f9", "5c17670d7eeb193eb548d7fa"];

var bbaddress_arr = ["37 EDSA corner Boni Avenue, \nMandaluyong City","Bonifacio Drive, Port Area, Manila","7th Ave. Grace Park, Caloocan City",
                    "2354 CAA Compound, Aurora Blvd. \n(old Tramo), Pasay City", "Quezon City Hall Compound, Kalayaan \nAvenue, Diliman, Quezon City",
                    "Shaw Blvd., Pasig City","Dahlia Street, Villa Teresa Subdivision,\n Marulas, Valenzuela City"];

var bbofficehours_arr = ["","Office Hours: 8:00 AM to 5:00 PM","Office Hours: 8:00 AM to 5:00 PM",
                        "","Office Hours: 9:00 AM to 8:00 PM",
                        "","Office Hours: 7:30 AM to 9:30 PM"];

var bbdays_arr = ["","Monday to Friday","Monday to Friday",
                  "","Monday to Sunday",
                  "","Monday to Sunday"];

export default class GiveBlood extends Component {
  constructor(props){
    super(props);
    this.state = {
      curLat: 0,
      curLong:0,
      dist1: 0,
      dist2: 0,
      dist3: 0,
      dist4: 0,
      dist5: 0,
      dist6: 0,
      dist7: 0,
      name1: '',
      name2: '',
      name3: '',
      name4: '',
      name5: '',
      name6: '',
      name7: '',
      show: false,
    };
  }

  componentDidMount(){
    //this._retrieveData();
    navigator.geolocation.getCurrentPosition(
      (position) => {
      
       /*var dist = geolib.getDistance(position.coords, {
           latitude: latx,
           longitude: longx
       })/1000;*/
       //this.setState({distanceaway: dist});
       //alert(position.coords.latitude);
       this.setState({curLat: position.coords.latitude, curLong: position.coords.longitude});
       var distance1 = geolib.getDistance(position.coords, {
        latitude: 14.572152,
        longitude: 121.046809
        })/1000;
        this.setState({dist1: distance1});

        var distance2 = geolib.getDistance(position.coords, {
          latitude: 14.591352,
          longitude: 120.969958
          })/1000;
        this.setState({dist2: distance2});

        var distance3 = geolib.getDistance(position.coords, {
          latitude: 14.647253,
          longitude: 120.991964
          })/1000;
        this.setState({dist3: distance3});

        var distance4 = geolib.getDistance(position.coords, {
          latitude: 14.530809,
          longitude: 121.003934
          })/1000;
        this.setState({dist4: distance4});

        var distance5 = geolib.getDistance(position.coords, {
          latitude: 14.646031,
          longitude: 121.052052
          })/1000;
        this.setState({dist5: distance5});

        var distance6 = geolib.getDistance(position.coords, {
          latitude: 14.576587,
          longitude: 121.038994
          })/1000;
        this.setState({dist6: distance6});

        var distance7 = geolib.getDistance(position.coords, {
          latitude: 14.678039,
          longitude: 120.978484
          })/1000;
        this.setState({dist7: distance7});

        if(!(distance7 == 0)){
          locationNotSorted.push(distance1);
          locationNotSorted.push(distance2);
          locationNotSorted.push(distance3);
          locationNotSorted.push(distance4);
          locationNotSorted.push(distance5);
          locationNotSorted.push(distance6);
          locationNotSorted.push(distance7);

          var copy_arr = [];

          for(var j=0; j< locationNotSorted.length; j++){
            copy_arr.push(locationNotSorted[j]);
          }

         
          locationSorted = locationNotSorted;
          locationSorted.sort(function(a, b){return a-b});
          //var index = 0;
          
          for(var x = 0; x < locationSorted.length; x++){
            if(locationSorted[0] == copy_arr[x]){
              order.push(x);
            }
          }

          for(var x = 0; x < locationSorted.length; x++){
            if(locationSorted[1] == copy_arr[x]){
              order.push(x);
            }
          }

          for(var x = 0; x < locationSorted.length; x++){
            if(locationSorted[2] == copy_arr[x]){
              order.push(x);
            }
          }

          for(var x = 0; x < locationSorted.length; x++){
            if(locationSorted[3] == copy_arr[x]){
              order.push(x);
            }
          }

          for(var x = 0; x < locationSorted.length; x++){
            if(locationSorted[4] == copy_arr[x]){
              order.push(x);
            }
          }

          for(var x = 0; x < locationSorted.length; x++){
            if(locationSorted[5] == copy_arr[x]){
              order.push(x);
            }
          }

          for(var x = 0; x < locationSorted.length; x++){
            if(locationSorted[6] == copy_arr[x]){
              order.push(x);
            }
          }

          if(order.length > 0){
            this.setState({name1: bbname_arr[order[0]],name2: bbname_arr[order[1]],name3: bbname_arr[order[2]],
                          name4: bbname_arr[order[3]],name5: bbname_arr[order[4]],
                          name6: bbname_arr[order[5]],name7: bbname_arr[order[6]], show: true});
          }
        }

      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  }

  selectbloodbank(index){
    var bloodbankid = bbid_arr[index];
    var bbname = bbname_arr[index];
    var address = bbaddress_arr[index];
    var officehours = bbofficehours_arr[index];
    var days = bbdays_arr[index];

    this.props.navigation.navigate('GiveBlood2', {
      itemId: bloodbankid,
      name: bbname,
      bbaddress: address,
      bbhours: officehours,
      bbdays: days
    });
    
  }

  showList(){
    if(this.state.show == false){
      return <Spinner color='red' />
    }
    else{
      return <View><ListItem
      onPress={_=>this.selectbloodbank(order[0])}>
        <Body>
          <Text>{this.state.name1}</Text>
        </Body>
        <Right>
          <Text style={{color: 'gray', fontSize: 12}}>{locationSorted[0] + " km away"}</Text>
        </Right>
      </ListItem>
      <ListItem
      onPress={_=>this.selectbloodbank(order[1])}>
        <Body>
          <Text>{this.state.name2}</Text>
        </Body>
        <Right>
          <Text style={{color: 'gray', fontSize: 12}}>{locationSorted[1] + " km away"}</Text>
        </Right>
      </ListItem>
      <ListItem
      onPress={_=>this.selectbloodbank(order[2])}>
        <Body>
          <Text>{this.state.name3}</Text>
        </Body>
        <Right>
          <Text style={{color: 'gray', fontSize: 12}}>{locationSorted[2] + " km away"}</Text>
        </Right>
      </ListItem>
      <ListItem
      onPress={_=>this.selectbloodbank(order[3])}>
        <Body>
          <Text>{this.state.name4}</Text>
        </Body>
        <Right>
          <Text style={{color: 'gray', fontSize: 12}}>{locationSorted[3] + " km away"}</Text>
        </Right>
      </ListItem>
      <ListItem
      onPress={_=>this.selectbloodbank(order[4])}>
        <Body>
          <Text>{this.state.name5}</Text>
        </Body>
        <Right>
          <Text style={{color: 'gray', fontSize: 12}}>{locationSorted[4] + " km away"}</Text>
        </Right>
      </ListItem>
      <ListItem
      onPress={_=>this.selectbloodbank(order[5])}>
        <Body>
          <Text>{this.state.name6}</Text>
        </Body>
        <Right>
          <Text style={{color: 'gray', fontSize: 12}}>{locationSorted[5] + " km away"}</Text>
        </Right>
      </ListItem>
      <ListItem
      onPress={_=>this.selectbloodbank(order[6])}>
        <Body>
          <Text>{this.state.name7}</Text>
        </Body>
        <Right>
          <Text style={{color: 'gray', fontSize: 12}}>{locationSorted[6] + " km away"}</Text>
        </Right>
      </ListItem></View>
    }
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
          marginRight: 15
        }}>
          {this.showList()}
        </Content>
      </Container>
    );
  }
}