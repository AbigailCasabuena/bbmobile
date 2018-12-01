import React, { Component } from 'react';
/*import {
  StyleSheet,
  Text,
  View,
} from 'react-native';*/
import HeaderNew from './HeaderNew';
//import Button from 'react-native-button';
import { Image } from 'react-native';
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
        Thumbnail } from 'native-base';
//import { YellowBox } from 'react-native';
//YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

type Props = {};
export default class NewsFeed extends Component<Props> {
  /*constructor(props) {
    super(props)

  }*/

  onPress = () => {
    
  }

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
  constructor() {
    super();
    this.state = {
        data: []
    }
  }


  componentDidMount() {
    //alert('hello');
    fetch("http://192.168.1.7:8080/getnewsfeed/")
    .then((result) => result.json())
    .then((res) => {
      this.setState({ data: res});
      //alert(res);
    })
    .catch(e => e)

  }


  render() {
    /*var items = [
      {
        name: "Abigail",
        age: 19
      },
      {
        name: "Asleeh",
        age: 22
      },
      {
        name: "Christian",
        age: 15
      },
    ];*/
    Moment.locale('en');
    return (
      <Container>
        <HeaderNew {...this.props} />
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

/*const styles = StyleSheet.create({
  style1: {
    flex: 1,
  },
  container1: {
    flex: 1,
    flexDirection: 'column',
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  un: {
    width: '70%',
    height: 60,
  },
  text: {
    color: '#B81E12',
    fontSize: 20,
    fontWeight: 'bold',
  },
  forview: {
    width: '70%',
    flexDirection: 'row'
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
  },
  buttontext: {
    color: 'black'
  },
  signview: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 50
  },
  buttonsign: {
    backgroundColor: '#B81E12',
    padding: 15,
  },
  signtext: {
    color: 'white'
  },
  accview: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});*/
