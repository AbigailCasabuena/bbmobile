import React, { Component } from 'react';

import SingleEventHeader from './SingleEventHeader';
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

export default class SingleEvent extends Component<Props> {
  /*constructor(props) {
    super(props)

  }*/
  /*static navigationOptions = {
    header: null
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
    const itemId = navigation.getParam('eventId', 'No event');
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
        <SingleEventHeader {...this.props} />
        <Content>
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
                <CardItem footer>
                  <Left>
                  <Button transparent>
                    <Icon active name="thumbs-up"
                    style={{color: '#E57373',
                    fontSize: 30}} />
                    <Text>12 Likes</Text>
                  </Button>
                  </Left>
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


