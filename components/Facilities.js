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
export default class History extends Component<Props> {

  onPress = () => {
    
  }

  constructor() {
    super();
    this.state = {
    }
  }


  componentDidMount() {
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


