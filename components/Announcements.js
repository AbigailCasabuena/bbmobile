import React, { Component } from 'react';

import AnnouncementsHeader from './AnnouncementsHeader';
import {AsyncStorage, TouchableOpacity, BackHandler, Image} from 'react-native';
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
        Tab,
        TabHeading,
        Tabs,
        ScrollableTab} from 'native-base';

type Props = {};

//var count = 3;
var imgval = ["uploads/blooddrive1.jpg", "uploads/cover.jpg"];

export default class Announcements extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
        data: [],
    }
  }

  componentDidMount() {
    this._retrieveData();
  }

  _retrieveData=()=>{

  }

  /*componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.navigate('Notifications'); 
    return true;
  }*/

  

  render() {  

    return (
      <Container>
        <AnnouncementsHeader {...this.props} />
        <Content>
        <List dataArray={imgval}
            renderRow={(item) =>
              <ListItem>
                <Image source={{uri: "http://192.168.43.18:3000/" + item}} style={{height: 200, width: 300, flex: 1}}/>
              </ListItem>
        }>
        </List>
        <List dataArray={this.state.data}
            renderRow={(item) =>
              <ListItem>
              <Card width={'100%'}>
                <CardItem>
                  <Left>
                    <Thumbnail source={require('../img/redcross.png')} />
                    <Body>
                      <Text>Philippine Red Cross</Text>
                      <Text note>{Moment(item.date_posted).format('MMMM DD, YYYY')}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem>
                  <Body>
                  <Image source={require('../img/blooddrive1.jpg')} style={{height: 200, width: 300, flex: 1}}/>
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
      </Container>
    );
  }
}


