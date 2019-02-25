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
var PushNotification = require('react-native-push-notification');

PushNotification.configure({
  onNotification: function(notification) {
    console.log( 'NOTIFICATION:', notification );
  },
  popInitialNotification: true,
  requestPermissions: true,
})

export default class NewsFeed extends Component<Props> {
  /*constructor(props) {
    super(props)

  }*/

  /*static navigationOptions = ({navigation}) =>{
    let label = 'Login';
    let icon = () => (
      <Image 
        source={require('../img/bbphicon.png')}
        style={{width:30,height:30}}
      />
    );
    return {label,icon};
  };*/
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
      fetch("http://192.168.43.18:3000/response/"+id)
      .then((result) => result.json())
      .then((res) => {
        this.setState({ respdata: res});
        //alert(res);
        //alert(num)
      })
      .catch(e => e);
      } catch (error) {
      }
  }

  getBg=(eventid)=>{
    var ind = this.state.respdata.findIndex(item => (item.event_id == eventid) && (item.response == "interested"));
    
    if(ind != -1){
      //alert('true ' + this.state.respdata[ind]._id);
      fetch('http://192.168.43.18:3000/response/'+this.state.respdata[ind]._id, {  
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'DELETE',
      })
      .then((response)=>{
        if(response.status === 200){
          fetch("http://192.168.43.18:3000/response/"+this.state.userid)
          .then((result) => result.json())
          .then((res) => {
            this.setState({ respdata: res});
          })
          .catch(e => e);

          alert('Response has been removed.')
        }
      });
    }else{
      var xx = this.state.respdata.findIndex(item => (item.event_id == eventid) && (item.response == "going"));
      if(xx != -1){
        alert('You already responded "Going".');
      }else{
        fetch('http://192.168.43.18:3000/response/', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    event_id: eventid,
                    user_id: this.state.userid,
                    response: "interested",
                  })
          })
          .then((response) => {
            if (response.status === 201) {
              alert("Response has been added.")
            }
          })  
          .done();

          fetch("http://192.168.43.18:3000/response/"+this.state.userid)
          .then((result) => result.json())
          .then((res) => {
            this.setState({ respdata: res});
          })
          .catch(e => e);
      }
    }
  }

  getBg2=(eventid)=>{
    var ind = this.state.respdata.findIndex(item => (item.event_id == eventid) && (item.response == "going"));
    
    if(ind != -1){
      //alert('true ' + this.state.respdata[ind]._id);
      fetch('http://192.168.43.18:3000/response/'+this.state.respdata[ind]._id, {  
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'DELETE',
      })
      .then((response)=>{
        if(response.status === 200){
          fetch("http://192.168.43.18:3000/response/"+this.state.userid)
          .then((result) => result.json())
          .then((res) => {
            this.setState({ respdata: res});
          })
          .catch(e => e);

          alert('Response has been removed.')
        }
      });
    }else{
      var xx = this.state.respdata.findIndex(item => (item.event_id == eventid) && (item.response == "interested"));
      if(xx != -1){
        alert('You already responded "Interested".');
      }else{
        fetch('http://192.168.43.18:3000/response/', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    event_id: eventid,
                    user_id: this.state.userid,
                    response: "going",
                  })
          })
          .then((response) => {
            if (response.status === 201) {
              alert("Response has been added.")
            }
          })  
          .done();

          fetch("http://192.168.43.18:3000/response/"+this.state.userid)
          .then((result) => result.json())
          .then((res) => {
            this.setState({ respdata: res});
          })
          .catch(e => e);
      }
    }
  }

  execfunction=(type, eventid)=>{
    if(type == 'event'){
      return <TouchableOpacity style={{backgroundColor: 'white', width: '50%', paddingTop: 7, paddingBottom: 7, borderColor: '#B81E12', borderWidth: 1, alignSelf: 'flex-start'}}
      onPress={_=>this.getBg(eventid)}>
        <Text style={{color: 'black', alignSelf: 'center'}}> Interested </Text>
      </TouchableOpacity>
    }
  }  

  execfunction2=(type, eventid)=>{
    if(type == "event"){
      return <TouchableOpacity style={{backgroundColor: 'white', width: '50%', paddingTop: 7, paddingBottom: 7, borderColor: '#B81E12', borderWidth: 1, alignSelf: 'auto'}}
      onPress={_=>this.getBg2(eventid)}>
        <Text style={{color: '#B81E12', alignSelf: 'center'}}> Going </Text>
      </TouchableOpacity>
      //backgroundColor: btncolor, width: '50%', paddingTop: 7, paddingBottom: 7, borderColor: '#B81E12', borderWidth: 1, alignSelf: 'auto'
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
                <CardItem footer>
                  {this.execfunction(item.type, item._id)}
                  {this.execfunction2(item.type, item._id)}
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

