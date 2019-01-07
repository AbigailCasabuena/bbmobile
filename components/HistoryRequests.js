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
export default class HistoryRequests extends Component<Props> {
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
      fetch("http://192.168.43.18:3000/bloodrequest/"+id)
      .then((result) => result.json())
      .then((res) => {
        this.setState({ data: res});
      })
      .catch(e => e);
    } catch (error) {
    }
  }

  cancelRequest=(id)=>{
    fetch('http://192.168.43.18:3000/bloodrequest/'+id, {  
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        request_status: 'cancelled'
      })
    })
    .then((response)=>{
              
    });
    fetch("http://192.168.43.18:3000/bloodrequest/"+this.state.userid)
    .then((result) => result.json())
    .then((res) => {
      this.setState({ data: res});
    })
    .catch(e => e);
    alert('Blood request was successfully cancelled.');
    //this.props.navigation.navigate('Home');
  }

  showCancel=(stat, id)=>{
    if(stat == 'pending'){
      //alert('pending');
      return <Button danger onPress={_=> this.cancelRequest(id)}>
        <Text>Cancel Request</Text>
      </Button>
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
                      Patient's Name: {" "}
                    </Text>
                    <Text>
                      {item.patient_name}{"\n"}
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                      No. of blood bags: {" "}
                    </Text>
                    <Text>
                      {item.number_bags}{"\n"}
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                      Date Requested: {" "}
                    </Text>
                    <Text>
                      {Moment(item.date_requested).format('MMMM DD, YYYY')}{"\n"}
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                      Status: {" "}
                    </Text>
                    <Text>
                      {item.request_status}{"\n"}
                    </Text>
                    {this.showCancel(item.request_status, item._id)}
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

