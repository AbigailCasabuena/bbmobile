import React, { Component } from 'react';

import NotificationsHeader from './NotificationsHeader';
import {AsyncStorage, TouchableOpacity, BackHandler} from 'react-native';

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
        Tab,
        TabHeading,
        Tabs,
        ScrollableTab} from 'native-base';

type Props = {};

var id = '';
var imgpath = 'http://192.168.43.18:3000/uploads/message.png';

export default class NotificationsAdmin extends Component<Props> {
  /*constructor(props) {
    super(props)

  }*/

  onPress = () => {
    
  }

  constructor(props) {
    super(props);
    this.state = {
        data: [],
        data_all: [],
        respdata: [],
        userId: '',
        disabled_property: false,
        image: 'http://192.168.43.18:3000/uploads/message.png',
        varg: '',
        chap_id: '',
    }
  }

  componentDidMount() {
    //alert('hello');
    this._retrieveData();
    //alert(this.state.varg)
    //alert(id);
    //alert(this.state.chap_id);
    this._getNotif();
    //BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  /*componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.navigate('Home'); // works best when the goBack is async
    return true;
  }*/

  checkDisabled = (property) =>{
    if(property == "message" || property == "notice"){
      return true;
    }else{
      return false;
    }
  }

  _retrieveData = async () => {
    try {
      const value2 = await AsyncStorage.getItem('LoggedUserId');
      //this.setState({userId: String(value2)});
      id=String(value2);
      //var chap_id = "";

      fetch("http://192.168.43.18:3000/users/getId/"+id)
      .then((result) => result.json())
      .then((res) => {
        //this.setState({ data: res});
        //alert(res);
        //alert(res[0].user_chapter);
        //this.setState({chap_id: res[0].user_chapter})
      })
      .catch(e => e);

      //this.setState({varg: String(value2)});
      //alert(id);
      //alert(value2);
      } catch (error) {
        alert(error.message);
      }
  }

  _getNotif=()=>{
    //alert('get notif');
    /*fetch("http://192.168.43.18:3000/notification/chapter/"+this.state.chap_id)
      .then((result) => result.json())
      .then((res) => {
        this.setState({ data: res});
        //alert(res);
      })
    .catch(e => e);*/
    fetch("http://192.168.43.18:3000/notification/chapter/bloodbank")
        .then((result) => result.json())
        .then((res) => {
          this.setState({ data: res});
          //alert(res);
        })
    .catch(e => e);
  }

  getContent=(itemId,type)=>{
    if(type == "event"){
      this.props.navigation.navigate('SingleEvent', {
        eventId: itemId,
      });
    }else if(type == "announcement"){
      this.props.navigation.navigate('SingleAnnouncement', {
        announcementId: itemId,
      });
    }
  }

  execfunction=(type, itemId)=>{
    //alert(this.state.respdata.length);
    if(type=="event" || type=="announcement"){
      return <TouchableOpacity key={itemId} style={{backgroundColor:'#B81E12', padding: 10}} onPress={ _ => this.getContent(itemId,type)} >
              <Text style={{color: 'white'}}>View Content</Text>
            </TouchableOpacity>
    }
  }

  checkType=(type)=>{
    if(type == "event"){
      return "Upcoming Event"
    }
    if(type == "announcement"){
      return "Announcement"
    }
    if(type == "message"){
      return "Message"
    }
    if(type == "notice"){
      return "Blood Donation Notice"
    }
  }

  checkthumbnail=(type)=>{
    if(type == "event"){
      imgpath = 'http://192.168.43.18:3000/uploads/event.png';
    }
    if(type == "announcement"){
      imgpath = 'http://192.168.43.18:3000/uploads/announce.png';
    }
    if(type == "message"){
      imgpath =  'http://192.168.43.18:3000/uploads/message.png';
    }
    if(type == "notice"){
      imgpath = 'http://192.168.43.18:3000/uploads/notice.png';
    }
  }

  render() {
    return (
      <Container>
        <NotificationsHeader {...this.props} />
        <Content>
          <List dataArray={this.state.data}
            renderRow={(item) =>
              <ListItem>
              <Card width={'100%'}>
                <CardItem>
                <Left>
                    {this.checkthumbnail(item.type)}
                    <Thumbnail source={{uri:imgpath}} style={{height: 30, width: 30}}/>
                    <Body>
                      <Text>{this.checkType(item.type)}</Text>
                    </Body>
                </Left>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text>
                      {item.content}
                    </Text>
                  </Body>
                </CardItem>
                <CardItem>
                  {this.execfunction(item.type, item.content_id)}
                </CardItem>
              </Card>
              </ListItem>
            }>
          </List>
        </Content>
      </Container>
    );
  }
}


