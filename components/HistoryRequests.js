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
            patient_name: "Natalie Hung",
            bags: 2,
            date_needed: "February 1, 2018",
            date_requested: "January 28, 2018",
            status: "claimed",
          },
          {
            patient_name: "Asleeh Casabuena",
            bags: 1,
            date_needed: "March 17, 2018",
            date_requested: "March 16, 2018",
            status: "cancelled",
          },
          {
            patient_name: "Christian Casabuena",
            bags: 2,
            date_needed: "November 7, 2018",
            date_requested: "November 5, 2018",
            status: "pending",
          },
    ];
    
    //Moment.locale('en');
    return (
      <Container>
        <Content>
          <List dataArray={items}
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
                      {item.bags}{"\n"}
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                      Date Needed: {" "}
                    </Text>
                    <Text>
                      {item.date_needed}{"\n"}
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                      Date Requested: {" "}
                    </Text>
                    <Text>
                      {item.date_requested}{"\n"}
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                      Status: {" "}
                    </Text>
                    <Text>
                      {item.status}{"\n"}
                    </Text>
                    <Button danger>
                        <Text>Cancel Request</Text>
                    </Button>
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

