import React, { Component } from 'react';
/*import {
  StyleSheet,
  Text,
  View,
} from 'react-native';*/
import HistoryHeader from './HistoryHeader';
import HistorySubHeader from './HistorySubHeader';
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
export default class History extends Component<Props> {
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
        data: [],
        selected: "Donations",
    }
  }


  componentDidMount() {
    //alert('hello');
    
  }


  render() {
    var final =[];

    var items = [
      {
        chapter: "Philippine Red Cross Manila",
        bags: 2,
        date: "February 1, 2018"
      },
      {
        chapter: "Philippine Red Cross Caloocan",
        bags: 1,
        date: "February 4, 2018"
      },
      {
        chapter: "Philippine Red Cross Valenzuela",
        bags: 2,
        date: "February 8, 2018"
      },
    ];
    
    //Moment.locale('en');
    return (
      <Container>
        <HistoryHeader {...this.props} />
        <HistorySubHeader {...this.props} />
        <Content>
          <List dataArray={items}
            renderRow={(item) =>
              <ListItem>
              <Card width={'100%'}>
                <CardItem>
                  <Body>
                    <Text style={{fontWeight: 'bold'}}>
                      {item.chapter}{"\n"}
                    </Text>
                    <Text>
                      {item.bags}{" "}bags donated{"\n"}
                      {item.date}
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
