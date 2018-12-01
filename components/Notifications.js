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

export default class Notifications extends Component<Props> {
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
        userId: '',
        disabled_property: false,
    }
  }

  componentDidMount() {
    //alert('hello');
    this._retrieveData();
    //alert(id);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.navigate('Home'); // works best when the goBack is async
    return true;
  }

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
      //alert(id);
      //alert(value2);
      fetch("http://192.168.43.18:3000/notification/"+id)
      .then((result) => result.json())
      .then((res) => {
        this.setState({ data: res});
        //alert(res);
      })
    .catch(e => e);
    } catch (error) {
      alert(error.message);
    }
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
    if(type=="event" || type=="announcement"){
      return <TouchableOpacity key={itemId} style={{backgroundColor:'#B81E12', padding: 10}} onPress={ _ => this.getContent(itemId,type)} >
              <Text style={{color: 'white'}}>View Content</Text>
            </TouchableOpacity>
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
                  <Body>
                    <TouchableOpacity onPress={this.getContent} disabled={this.checkDisabled(item.type)}>
                    <Text>
                      {item.type + "\n"}
                      {item.content}
                    </Text>
                    </TouchableOpacity>
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


