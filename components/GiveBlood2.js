import React, { Component } from 'react';
import {AsyncStorage, View} from 'react-native';
import { Container, Header, Content, ListItem, CheckBox, Text, Body, Button,Picker} from 'native-base';
import GiveBloodHeader from './GiveBloodHeader';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';

var SampleArray = [];
var a = '';
var datexx = '';

var firstname = '';
var lastname = '';
var bloodtype = '';
//const { navigation } = this.props.navigation;
//const itemId = this.props.navigation.getParam('itemId', 'NO-ID');


export default class GiveBlood2 extends Component {
  constructor(props){
    super(props);

    this.savedonation = this.savedonation.bind(this);

    var curryear = new Date().getFullYear();
    var datetoday = new Date();
    var monthtoday = datetoday.getMonth() + 1;
    var daytoday = datetoday.getDate() + 1;

    if(monthtoday == 1 || monthtoday == 3 || monthtoday == 5 || monthtoday == 7 ||
      monthtoday == 8 || monthtoday == 10 || monthtoday == 12){
        if(daytoday > 31){
          monthtoday = monthtoday + 1;
          daytoday = 1;
        }
    }

    if(monthtoday == 4 || monthtoday == 6 || monthtoday == 9 || monthtoday == 11){
        if(daytoday > 30){
          monthtoday = monthtoday + 1;
          daytoday = 1;
        }
    }

    if(monthtoday == 2){
      if(daytoday > 28){
        monthtoday = monthtoday + 1;
        daytoday = 1;
      }
    }

    this.state = {
        idxx: '',
        userid: '',
        date: '',
        maxdate: '12-31-' + curryear,
        mindate: monthtoday + '-' + daytoday + '-' + curryear,
        bbname: '',
        address: '',
        officehours: '',
        days: '',
        hh: '12',
        min: '00',
        ampm: 'PM',
        checkprev: false,
        showprep: false,
    };
  }

  componentDidMount(){
    this._retrieveData();
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'No item');
    this.setState({idxx: itemId})
    
    const val1 = navigation.getParam('name', 'No item');
    const val2 = navigation.getParam('bbaddress', 'No item');
    const val3 = navigation.getParam('bbhours', 'No item');
    const val4 = navigation.getParam('bbdays', 'No item');

    this.setState({bbname: val1, address: val2, officehours: val3, days: val4})

    AsyncStorage.getItem('LoggedFName',(err, val)=>{
      firstname = val;
    })

    AsyncStorage.getItem('LoggedLName',(err, val)=>{
        lastname = val;
    })

    AsyncStorage.getItem('LoggedBloodType',(err, val)=>{
        bloodtype = val;
    })
  }

  savedonation(){
    //var donatedate;
    //alert(this.state.idxx);
   /* AsyncStorage.getItem('DonationDate',(err, val)=>{
      if(!((val == null)||(val==""))){
        
      }  
    })*/

    /*fetch("http://192.168.43.18:3000/blooddonation/delprev/" + a)
      .then((result) => result.json())
      .then((res) => {
        //this.setState({ data: res});
        alert('ok');
      })
    .catch(e => e);*/

    //alert(this.state.checkprev);

    var donorname = firstname + " " + lastname;

    var finaltime = this.state.hh + ":" + this.state.min + " " + this.state.ampm;

    if(this.state.checkprev == true){
      fetch("http://192.168.43.18:3000/blooddonation/delprev/" + a)
      .then((result) => result.json())
      .then((res) => {
        //this.setState({ data: res});
        //alert('ok');
      })
      .catch(e => e);

      fetch('http://192.168.43.18:3000/blooddonation/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donor_id: a,
          chapter: this.state.idxx,
          appointment_date: this.state.date,
          appointment_time: finaltime,
          donor_name: donorname,
          blood_group: bloodtype
        })
        })
        .then((response) => {
          if (response.status === 201) {
            alert("Your blood donation appointment has been successfully scheduled.");
            this.setState({showprep: false});
          }
        })  
        .done();
    }else{
      alert("You've donated blood recently. Blood donation should only be done every four months.");
      this.setState({showprep: false})
    }
    //alert(a);
    //this.postDonation();
  }

  /*postDonation(){
    alert(this.state.checkprev);
  }*/

  inputSched(){
    if(this.state.showprep == false){
      return <View>
        <View style={{alignContent:'center', alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginTop:5, marginRight: 10}}>Date:</Text>
          <DatePicker
            style={{width: 200, marginBottom: 20}}
            date={this.state.date}
            mode="date"
            format="MM-DD-YYYY"
            minDate={this.state.mindate}
            maxDate={this.state.maxdate}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 30
              },
              dateInput: {
                
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
              this.setState({date: date});
              //datexx = date;
              //alert(datexx)
              var check = false;
              var yearcurrent = new Date().getFullYear();
              //var datee = new Date();
              //var selecteddt = new Date(this.state.date);
              var dupdate = date;
              var ssmonth = dupdate.charAt(0) + dupdate.charAt(1);
              var monthnum = Number(ssmonth);
          
              fetch("http://192.168.43.18:3000/blooddonation/" + a)
                .then((result) => result.json())
                .then((res) => {
                  //this.setState({ data: res});
                  //alert('ok');
                  //alert(res[0].date_completed.getDate());
                  var dt = new Date(res[0].date_completed);
          
                  //alert(dt);
                  if(dt.getFullYear() != yearcurrent){
                    //check = true;
                    //alert(yearcurrent);
                    this.setState({checkprev: true});
                    //alert(check + " less year");
                  }else if(dt.getFullYear() == yearcurrent){
                    if((monthnum - (dt.getMonth() + 1)) >= 4){
                      this.setState({checkprev: true});
                      //alert("month okayy")
                    }else{
                      //alert("month not okay");
                      this.setState({checkprev: false})
                    }
                  }
                })
              .catch(e => e);
            }}
          />
        </View>
        <View style={{flexDirection: 'row', marginLeft: 30, marginRight: 30}}>
          <Text>Time:</Text>
          <Picker
            selectedValue={this.state.hh}
            style={{ height: 20, }}
            onValueChange={(itemValue, itemIndex) => this.setState({hh: itemValue})}>
            <Picker.Item label="1" value="1"/>
            <Picker.Item label="2" value="2"/>
            <Picker.Item label="3" value="3"/>
            <Picker.Item label="4" value="4"/>
            <Picker.Item label="5" value="5"/>
            <Picker.Item label="6" value="6"/>
            <Picker.Item label="7" value="7"/>
            <Picker.Item label="8" value="8"/>
            <Picker.Item label="9" value="9"/>
            <Picker.Item label="10" value="10"/>
            <Picker.Item label="11" value="11"/>
            <Picker.Item label="12" value="12"/>
          </Picker>
          <Text>:</Text>
          <Picker
            selectedValue={this.state.min}
            style={{ height: 20, }}
            onValueChange={(itemValue, itemIndex) => this.setState({min: itemValue})}>
            <Picker.Item label="00" value="00"/>
            <Picker.Item label="30" value="30"/>
          </Picker>
          <Picker
            selectedValue={this.state.ampm}
            style={{ height: 20, }}
            onValueChange={(itemValue, itemIndex) => this.setState({ampm: itemValue})}>
            <Picker.Item label="AM" value="AM"/>
            <Picker.Item label="PM" value="PM"/>
          </Picker>
        </View>
        </View>
        <Button onPress={()=>{
          this.setState({showprep: true})
        }}
        style={{
          backgroundColor: "#B81E12",
          alignSelf: "center",
          marginBottom: 15, marginTop: 15}}>
            <Text>Schedule Appointment</Text>
        </Button>
      </View>
    }else{
      return <View style={{alignContent: 'center', marginTop: 10,marginLeft: 20}}>
        <Text style={{color: '#B81E12', fontWeight: 'bold', alignSelf: 'center'}}>
            Preparation Before Donating Blood
        </Text>
        <Text>
            1. Have enough rest and sleep.
        </Text>
        <Text>
            2. No alcohol intake 24 hours prior to blood donation.
        </Text>
        <Text>
            3. No medications for at least 24 hours prior to blood donation.
        </Text>
        <Text>
            4. Have something to eat prior to blood donation, avoid fatty food.
        </Text>
        <Text>
            5. Drink plenty of fluid, like water or juice.
        </Text>
        <View style={{flexDirection: 'row', marginLeft: 60}}>
          <Button onPress={this.savedonation}
          style={{
            backgroundColor: "#B81E12",
            marginBottom: 15, marginTop: 15, marginRight: 15}}>
              <Text>Confirm</Text>
          </Button>

          <Button onPress={()=>{
            this.setState({showprep: false})
          }}
          style={{
            backgroundColor: "#B81E12",
            marginBottom: 15, marginTop: 15}}>
              <Text>Cancel</Text>
          </Button>
        </View>
      </View>
    }
  }

  _retrieveData = async () => {
    try {
      const value2 = await AsyncStorage.getItem('LoggedUserId');
      //this.setState({userId: String(value2)});
      id=String(value2);
      a=id;
      this.setState({userid: String(value2)});
    } catch (error) {
    }
  }

  render() {
    return (
      <Container>
        <GiveBloodHeader {...this.props} />
        <View style={{backgroundColor: '#B81E12', height: 180, alignItems: 'center', alignContent: 'center', marginBottom: 20,}}>
            <View style={{alignItems: 'center', alignContent: 'center', marginLeft: 20, marginRight: 20}}>
              <Text style={{color: 'white', fontWeight: 'bold', marginTop: 40}}>
                  {this.state.bbname}
              </Text>
              <Text style={{color: 'white'}}>
                  {this.state.address}
              </Text>
              <Text style={{color: 'white'}}>
                  {this.state.officehours}
              </Text>
              <Text style={{color: 'white'}}>
                  {this.state.days}
              </Text>
            </View>
        </View>
        {this.inputSched()}
      </Container>
    );
  }
}