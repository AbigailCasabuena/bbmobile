import React, { Component } from 'react';
import { Container, Header, Content, ListItem, CheckBox, Text, Body, Button} from 'native-base';

var SampleArray = [];

export default class trycheck extends Component {
  constructor(props){
    super(props);
    this.state = {
      isChecked1: false,
      isChecked2: false,
      isChecked3: false,
      isChecked4: false,
      isChecked5: false,
      isChecked6: false,
      isChecked7: false,
    };
  }

  AddItemsToArray1=()=>{
    //Adding Items To Array.
    // Showing the complete Array on Screen Using Alert.
    this.setState({isChecked1: !this.state.isChecked1})
    if(this.state.isChecked1 == false){
      SampleArray.push("National Blood Center (PRC Tower)");
    }else{
      var del = "National Blood Center (PRC Tower)";
      var index = SampleArray.indexOf(del);
      SampleArray.splice(index,1)
    }
    alert(SampleArray.toString());
  }

  AddItemsToArray2=()=>{
    this.setState({isChecked2: !this.state.isChecked2})
    if(this.state.isChecked2 == false){
      SampleArray.push("National Blood Center (Manila)");
    }else{
      var del = "National Blood Center (Manila)";
      var index = SampleArray.indexOf(del);
      SampleArray.splice(index,1)
    }
    alert(SampleArray.toString());
  }

  AddItemsToArray3=()=>{
    this.setState({isChecked3: !this.state.isChecked3})
    if(this.state.isChecked3 == false){
      SampleArray.push("Caloocan City BCU/ BS");
    }else{
      var del = "Caloocan City BCU/ BS";
      var index = SampleArray.indexOf(del);
      SampleArray.splice(index,1)
    }
    alert(SampleArray.toString());
  }

  AddItemsToArray4=()=>{
    this.setState({isChecked4: !this.state.isChecked4})
    if(this.state.isChecked4 == false){
      SampleArray.push("Pasay City BCU/ BS");
    }else{
      var del = "Pasay City BCU/ BS";
      var index = SampleArray.indexOf(del);
      SampleArray.splice(index,1)
    }
    alert(SampleArray.toString());
  }

  AddItemsToArray5=()=>{
    this.setState({isChecked5: !this.state.isChecked5})
    if(this.state.isChecked5 == false){
      SampleArray.push("Quezon City BCU/ BS");
    }else{
      var del = "Quezon City BCU/ BS";
      var index = SampleArray.indexOf(del);
      SampleArray.splice(index,1)
    }
    alert(SampleArray.toString());
  }

  AddItemsToArray6=()=>{
    this.setState({isChecked6: !this.state.isChecked6})
    if(this.state.isChecked6 == false){
      SampleArray.push("Rizal BCU/ BS");
    }else{
      var del = "Rizal BCU/ BS";
      var index = SampleArray.indexOf(del);
      SampleArray.splice(index,1)
    }
    alert(SampleArray.toString());
  }

  AddItemsToArray7=()=>{
    if(this.state.isChecked7 == false){
      SampleArray.push("Valenzuela City BCU/ BS");
    }else{
      var del = "Valenzuela City BCU/ BS";
      var index = SampleArray.indexOf(del);
      SampleArray.splice(index,1)
    }
    this.setState({isChecked7: !this.state.isChecked7})
    alert(SampleArray.toString());
  }

  render() {
    return (
      <Container>
        <Text style={{
          textAlign:'center',
          color: '#B81E12',
          fontSize: 20,
          fontWeight: 'bold',
          paddingBottom: 20,
          marginTop: 0,
        }}>
            Blood Banks
        </Text>
        <Text style={{
            textAlign:'justify',
            color:'black',
            fontSize:15,
            marginLeft:25,
            marginBottom: 5, 
            fontSize: 16}}>
          Please select all the blood banks where you have already donated.
        </Text>
        <Content style={{
          marginLeft: 25,
          marginRight: 25
        }}>
          <ListItem
          onPress={this.AddItemsToArray1}>
            <CheckBox checked={this.state.isChecked1} color="#B81E12" />
            <Body>
              <Text>National Blood Center (PRC Tower)</Text>
            </Body>
          </ListItem>
          <ListItem
          onPress={this.AddItemsToArray2}>
            <CheckBox checked={this.state.isChecked2} color="#B81E12" />
            <Body>
              <Text>National Blood Center (Manila)</Text>
            </Body>
          </ListItem>
          <ListItem
          onPress={this.AddItemsToArray3}>
            <CheckBox checked={this.state.isChecked3} color="#B81E12" />
            <Body>
              <Text>Caloocan City BCU/ BS</Text>
            </Body>
          </ListItem>
          <ListItem
          onPress={this.AddItemsToArray4}>
            <CheckBox checked={this.state.isChecked4} color="#B81E12" />
            <Body>
              <Text>Pasay City BCU/ BS</Text>
            </Body>
          </ListItem>
          <ListItem
          onPress={this.AddItemsToArray5}>
            <CheckBox checked={this.state.isChecked5} color="#B81E12" />
            <Body>
              <Text>Quezon City BCU/ BS</Text>
            </Body>
          </ListItem>
          <ListItem
          onPress={this.AddItemsToArray6}>
            <CheckBox checked={this.state.isChecked6} color="#B81E12" />
            <Body>
              <Text>Rizal BCU/ BS</Text>
            </Body>
          </ListItem>
          <ListItem
          onPress={this.AddItemsToArray7}>
            <CheckBox checked={this.state.isChecked7} color="#B81E12" />
            <Body>
              <Text>Valenzuela City BCU/ BS</Text>
            </Body>
          </ListItem>
        </Content>
        <Button onPress={()=>{alert(SampleArray.toString())}}
        style={{
          backgroundColor: "#B81E12",
          alignSelf: "center",
          marginBottom: 15}}>
            <Text>Create Account</Text>
        </Button>
      </Container>
    );
  }
}