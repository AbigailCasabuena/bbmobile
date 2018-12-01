import React, { Component } from 'react';

import SingleAnnouncementHeader from './SingleAnnouncementHeader';
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

export default class SingleAnnouncement extends Component<Props> {
  /*constructor(props) {
    super(props)

  }*/

  onPress = () => {
    
  }

  constructor(props) {
    super(props);
    this.state = {
        data: [],
    }
  }

  componentDidMount() {
    //alert('hello');
    //this._retrieveData();
    //alert(id);
    const { navigation } = this.props;
    const itemId = navigation.getParam('announcementId', 'No announcement');
    this._retrieveData(itemId);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.navigate('Notifications'); // works best when the goBack is async
    return true;
  }

  _retrieveData = (itemId) => {
    try {
      fetch("http://192.168.43.18:3000/newsfeed/"+itemId)
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

  render() {

    return (
      <Container>
        <SingleAnnouncementHeader {...this.props} />
        <Content>
        <List dataArray={this.state.data}
            renderRow={(item) =>
              <ListItem>
              <Card width={'100%'}>
                <CardItem>
                  <Body>
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


