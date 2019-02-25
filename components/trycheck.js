import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
import { Container, Header, Content, ListItem, CheckBox, Text, Body, Button} from 'native-base';

var SampleArray = [];
var a = '';

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
      nameinput: '',
      username: '',
      pw: '',
      repw: '',
      date:'',
      emailadd: '',
      phonenum: '',
      pickgen: 'Male',
      donatedbefore: 'No',
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
    //alert(SampleArray.toString());
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
    //alert(SampleArray.toString());
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
    //alert(SampleArray.toString());
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
    //alert(SampleArray.toString());
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
    //alert(SampleArray.toString());
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
    //alert(SampleArray.toString());
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
    //alert(SampleArray.toString());
  }

  //store
  _storeData = async () => {
    try {
      await AsyncStorage.setItem('SignName', this.state.nameinput);
    } catch (error) {
      alert('error store name');
    }
    try {
      await AsyncStorage.setItem('SignUsername', this.state.username);
    } catch (error) {
      alert('error store username');
    }
    try{
      await AsyncStorage.setItem('SignPword', this.state.pw);
    } catch (error) {
      alert('error store pw');
    }
    try{
      await AsyncStorage.setItem('SignRepword', this.state.repw);
    } catch (error) {
      alert('error store repw');
    }
    try{
      await AsyncStorage.setItem('Pickgen', this.state.pickgen);
    } catch (error) {
      alert('error store pickgen');
    }
    try{
      await AsyncStorage.setItem('Date', this.state.date);
    } catch (error) {
      alert('error store date');
    }
    try{
      await AsyncStorage.setItem('Email', this.state.emailadd);
    } catch (error) {
      alert('error store email');
    }
    try{
      await AsyncStorage.setItem('Phonenum', this.state.phonenum);
    } catch (error) {
      alert('error store phone num');
    }
    try{
      await AsyncStorage.setItem('Donatedbefore', this.state.donatedbefore);
    } catch (error) {
      alert('error store donated before');
    }
  }

  //retrieve info
  _retrieveData = async () => {
    try {
      const value1 = await AsyncStorage.getItem('SignName');
      this.setState({nameinput: value1});
      //a = value1;
    } catch (error) {
      alert('error retrieve name ' + error.message);
    }
    try {
      const valueuname = await AsyncStorage.getItem('SignUsername');
      this.setState({username: valueuname});
    } catch (error) {
      alert('error retrieve username ' + error.message);
    }
    try{
      const value2 = await AsyncStorage.getItem('SignPword');
      this.setState({pw: value2});
    } catch (error) {
      alert('error retrieve pw ' + error.message);
    }
    try{
      const value3 = await AsyncStorage.getItem('SignRepword');
      this.setState({repw: value3});
    } catch (error) {
      alert('error retrieve repw ' + error.message);
    }
    try{
      const value4 = await AsyncStorage.getItem('Date');
      this.setState({date: value4});
    } catch (error) {
      alert('error retrieve date ' + error.message);
    }
    try{
      const value8 = await AsyncStorage.getItem('Pickgen');
      this.setState({pickgen: value8});
     } catch (error) {
       alert('error retrieve pickgen ' + error.message);
     }
    try{
      const value5 = await AsyncStorage.getItem('Email');
      this.setState({emailadd: value5});
    } catch (error) {
      alert('error retrieve email ' + error.message);
    }
    try{
      const value6 = await AsyncStorage.getItem('Phonenum');
      this.setState({phonenum: value6});
    } catch (error) {
      alert('error retrieve phonenum ' + error.message);
    }
    try{
      const value9 = await AsyncStorage.getItem('Donatedbefore');
      this.setState({donatedbefore: value9});
    } catch (error) {
      alert('error retrieve donated before ' + error.message);
    }
  }

  componentDidMount(){
    this._retrieveData();
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
        <Button onPress={this.signup}
        style={{
          backgroundColor: "#B81E12",
          alignSelf: "center",
          marginBottom: 15}}>
            <Text>Create Account</Text>
        </Button>
      </Container>
    );
  }

  signup = () => {
    //this._retrieveData();
    if(SampleArray.length == 0){
      alert("Please select blood bank/s.");
    }
    else{
      if(this.state.nameinput == "" || this.state.username == "" || this.state.pw == "" 
    || this.state.repw == "" || this.state.emailadd == "" || this.state.phonenum == ""){
      alert("Please fill out all fields.");
    }
    else{
      if(this.state.pw == this.state.repw){
        var dbefore = false;
        if(this.state.donatedbefore == 'No'){
          dbefore = false;
        }else{
          dbefore = true;
        }
        fetch('http://192.168.43.18:3000/users/signup', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  user_name: this.state.nameinput,
                  user_username: this.state.username,
                  user_emailAdd: this.state.emailadd,
                  user_contactNum: this.state.phonenum,
                  user_password: this.state.pw,
                  donated_before: dbefore,
                  user_gender: this.state.pickgen,
                  user_birthday: this.state.date,
                  is_Active: false,
                  bloodbank_array: SampleArray,
                })
  
        })
        .then((response) => {
          if (response.status === 200) {
            try{
              AsyncStorage.setItem('LoggedUser', this.state.username);
            } catch (error) {
              alert('error store user');
            }
            this.setState({
              nameinput: '',
              username: '',
              pw: '',
              repw: '',
              pickgen: 'Male',
              date: '',
              emailadd: '',
              phonenum: '',
              donatedbefore: 'No'
            });
            this._storeData();
            alert("User account has been created.")
          }else if(response.status === 400){
            alert("Invalid email address.")
          }
          else {
            alert("Username/Email already exists.");
          }
        })  
        .done();
        }else{
          alert("Passwords does not match.");
        }
      }
    }
  }
}