import React, { Component } from 'react';

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

import {AsyncStorage} from 'react-native';
import Moment from 'moment';

type Props = {};
export default class History extends Component<Props> {

  onPress = () => {
    
  }

  constructor() {
    super();
    this.state = {
        data: [],
        userid: '',
    }
  }


  componentDidMount() {
    //alert('hello');
    this._retrieveData(); 
  }

  _retrieveData = async () => {
    try {
      const value2 = await AsyncStorage.getItem('LoggedUserId');
      //this.setState({userId: String(value2)});
      id=String(value2);
      this.setState({userid: String(value2)});
      fetch("http://192.168.43.18:3000/blooddonation/"+id)
      .then((result) => result.json())
      .then((res) => {
        this.setState({ data: res});
      })
      .catch(e => e);
    } catch (error) {
    }
  }

  render() {
    //var final =[];
    
    Moment.locale('en');
    return (
      <Container>
        <Content>
          <List dataArray={this.state.data}
            renderRow={(item) =>
              <ListItem>
              <Card width={'100%'}>
                <CardItem>
                  <Body>
                  <Text style={{fontWeight: 'bold'}}>
                      {item.chapter.chapter_name}
                    </Text>
                    <Text>
                      {item.blood_product_donated}{"\n"}
                    </Text>
                    <Text>
                      {Moment(item.date_completed).format('MMMM DD, YYYY')}
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

