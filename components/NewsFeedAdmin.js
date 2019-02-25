import React, { Component} from 'react';
/*import {
  StyleSheet,
  Text,
  View,
} from 'react-native';*/
import HeaderNew from './HeaderNew';
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

export default class NewsFeedAdmin extends Component<Props> {

  state = {
    data: [],
    userid: '',
    responses: [],
    respdata: [],
    lengthx: 0,
    refreshing: false,
}

  constructor() {
    super();
    
    this.socket = io('http://192.168.43.210:8080',{json: false});
    this.socket.on('newsfeeddata',(nf)=>{
      //alert('hello ');
      this.setState({data: nf});
    })
  }


  componentDidMount() {
    //fetch("http://192.168.1.7:8080/getnewsfeed/")
    this._retrieveData();
    //this.showId();
    fetch("http://192.168.43.18:3000/newsfeed")
    .then((result) => result.json())
    .then((res) => {
      this.setState({ data: res});
      //alert(res);
    })
    .catch(e=>{
      
    })
    //this.socket.emit('getnewsfeed');
    //alert(num);
    this.socket.emit('getnewsfeed');
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
      } catch (error) {
      }
  }

  checkimg=(img)=>{
    if(img != ''){
      return <Image source={{uri: "http://192.168.43.18:3000/" + img}} style={{height: 200, width: 300, flex: 1}}/>
    }
  }

  render() { 
    Moment.locale('en');
    return (
      <Container>
        <HeaderNew {...this.props} />
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
                  <Left>
                    <Thumbnail source={require('../img/redcross.png')} />
                    <Body>
                      <Text>{item.chapter.chapter_name}</Text>
                      <Text note>{Moment(item.date_posted).format('MMMM DD, YYYY')}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem>
                  <Body>
                    {this.checkimg(item.nw_image)}
                    <Text>
                      {item.nw_content}
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

