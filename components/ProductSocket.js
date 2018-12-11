import React, { Component } from 'react';
import { Container, 
        Header, 
        Content, 
        List, 
        ListItem, 
        Icon, 
        Left, 
        Body, 
        Right, 
        Switch,
        Button,
        Card,
        CardItem,
        Thumbnail } from 'native-base';
import {Text, TouchableOpacity} from 'react-native';
window.navigator.userAgent = "react-native";
import io from 'socket.io-client/dist/socket.io';


type Props = {};
export default class History extends Component<Props> {

    state = {
        prods: [],
        value: 'val',
    }

    constructor() {
        super();
        this.socket = io('http://192.168.43.18:3000',{json: false});
        this.socket.on('xx',()=>{
            this.setState({value: "Abigail"});
        })
        this.socket.on('prods',(prod)=>{
            //alert(prod[0].name);
            this.setState({prods: prod});
        })
    }


  componentDidMount() {
    /**
     * fetch("http://192.168.43.18:3000/products/")
    .then((result) => result.json())
    .then((res) => {
      this.setState({ prods: res});
    })
    .catch(e => e);
    } catch (error) {
      alert(error.message);
     */
    this.socket.emit('try');
  }

    render() {
        return (
          <Container>
            <TouchableOpacity style={{padding: 10}} onPress={()=>{
                this.socket.emit('try');
            }}>
                <Text>Emit</Text>
            </TouchableOpacity>
            <Text>{this.state.value}</Text>
            <Content>
              <List dataArray={this.state.prods}
                renderRow={(item) =>
                  <ListItem>
                  <Card width={'100%'}>
                    <CardItem>
                      <Body>
                        <Text style={{fontWeight: 'bold'}}>
                          {item.name}{"\n"}
                        </Text>
                        <Text>
                          {item.price}
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

   



