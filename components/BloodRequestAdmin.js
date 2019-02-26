import React, { Component} from 'react';
/*import {
  StyleSheet,
  Text,
  View,
} from 'react-native';*/
import BloodRequestHeader from './BloodRequestHeader';
//import Button from 'react-native-button';
import { Image, TouchableOpacity, View, AsyncStorage,ScrollView, RefreshControl} from 'react-native';
import Moment from 'moment';
import { Container, 
        Header, 
        Content, 
        List, 
        ListItem, 
        Text, 
        Icon, 
        Left, 
        Body, 
        Right, 
        Switch,
        Button,
        Card,
        CardItem,
        Thumbnail,
        Segment} from 'native-base';
//import { YellowBox } from 'react-native';
//YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
type Props = {};
var colorcolor="";
var num;

window.navigator.userAgent = "react-native";
import io from 'socket.io-client/dist/socket.io';

export default class BloodRequestAdmin extends Component<Props> {

  state = {
    data: [],
    userid: '',
    responses: [],
    respdata: [],
    lengthx: 0,
    refreshing: false,
    user_type: '',
}

  constructor() {
    super();
    
  }


  componentDidMount() {
    this._retrieveData();
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    fetch("http://192.168.43.18:3000/newsfeed")
    .then((result) => result.json())
    .then((res) => {
      this.setState({ data: res});
      //alert(res);
    })
    .catch(e=>{
      
    })
    this.setState({refreshing: false});
  }

  async getUsername(){
    try{
      let value = await AsyncStorage.getItem('LoggedUserId');
    //alert(value);
    return value;
    }catch(error){

    }
  }

  _retrieveData = async () => {
    try {
      const value2 = await AsyncStorage.getItem('LoggedUserId');
      //this.setState({userId: String(value2)});
      id=String(value2);
      this.setState({userid: String(value2)});
      //alert(id);
      //alert(value2);
      fetch("http://192.168.43.18:3000/users/getId/"+ id)
        .then((result) => result.json())
        .then((res) => {
        //this.setState({ data: res});
        //alert(res);
            //alert(res[0].user_type);
            this.setState({user_type: res[0].user_type});
            if(res[0].user_type == "bbadmin"){
                fetch("http://192.168.43.18:3000/bloodrequest/pending/request")
                .then((result) => result.json())
                .then((res) => {
                this.setState({ data: res});
                })
                .catch(e => e);
            }
        })
        .catch(e=>{
        
        })
    } catch (error) {
    }
  }

  render() { 
    Moment.locale('en');
    return (
      <Container>
        <BloodRequestHeader {...this.props} />
        <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            } 
        >
        <Content>
          <List dataArray={this.state.data}
            renderRow={(item) =>
              <ListItem>
              <Card width={'100%'}>
                <CardItem>
                  <Body>
                  <Text style={{fontWeight: 'bold'}}>
                      Patient's Name: {" "}
                    </Text>
                    <Text>
                      {item.patient_name}{"\n"}
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                      Blood Product: {" "}
                    </Text>
                    <Text>
                      {item.blood_product}{"\n"}
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                      No. of blood bags: {" "}
                    </Text>
                    <Text>
                      {item.no_of_bags}{"\n"}
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                      Date Requested: {" "}
                    </Text>
                    <Text>
                    {Moment(new Date(item.date_requested)).format('MMMM DD, YYYY')}{"\n"}
                    </Text>
                  </Body>
                </CardItem>
              </Card>
              </ListItem>
            }>
          </List>
        </Content>
        </ScrollView>
      </Container>
    );
  }
}

