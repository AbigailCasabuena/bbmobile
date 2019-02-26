import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Dimensions,
  ScrollView,
  AsyncStorage,
  Picker
} from 'react-native';
//import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import RadioForm from 'react-native-radio-form';
import {INFO} from '../state/SignUpInfo';
type Props = {};

var screen= Dimensions.get('window');

/*const radio_props = [
  {
    label: 'Male',
    value: 'Male'
  },
  {
    label: 'Female',
    value: 'Female'
  }
];

const radio_props2 = [
  {
    label: 'Yes',
    value: 'Yes'
  },
  {
    label: 'No',
    value: 'No'
  }
];*/

class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
    cont: '',
  };

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => {
    /*if(!(AsyncStorage.getItem('SignName')=='') || !(AsyncStorage.getItem('SignName') == null)){
      this.setState({ isFocused: false });
    }
    else{
      this.setState({ isFocused: true });
    }*/
    const {cont} = this.state;
    if(!(cont=='')){
      this.setState({ isFocused: true });
    }
    else{
      this.setState({ isFocused: false });
    }
  }

  render() {
    const { label, ...props } = this.props;
    const { isFocused } = this.state;
    //const {cont} = this.state;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: 0,
      fontSize: 13,
      color: '#aaa',
      marginLeft: 35,
      marginTop: 3,
    };

    return (
      <View style={{ paddingTop: 10,flexDirection:'row',alignItems:'center',justifyContent:'center',}}>
        <Text style={labelStyle}>
          {label}
        </Text>
        <TextInput
          {...props}
          //onChangeText={ (cont) => this.setState({cont})}
          style={{width:'84%',fontSize: 16, color: '#000',}}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </View>
    );
  }
}

export default class SignUp extends React.Component {
  static navigationOptions = {
    header: null
  }
  
  constructor(props){
    super(props);
    var year = new Date().getFullYear();
    var minyear = year - 70;
    var maxyear = year -18;
    //const name= 'name';
    //alert('hello ' + INFO[name].value);
    //var nameval = INFO[name].value;
    //alert(nameval);
    this.state = {valuegender: '', date:'',
      mindate:"1-1-" + minyear,
      maxdate:"12-31-" + maxyear,
      valuedonation: 'No',
      donatedbefore: 'No',
      firstname: '',
      middlename: '',
      lastname: '',
      username: '',
      pw: '',
      repw: '',
      gender: '0', 
      emailadd: '',
      phonenum: '',
      pickgen: 'Male',
      createbutton: false,
      //name: INFO[name].value,
      //modalVisible: false,
    };
  }

  onBlur() {
    console.log('#####: onBlur');
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('SignFirstName', this.state.firstname);
    } catch (error) {
      alert('error store first name');
    }
    try {
      await AsyncStorage.setItem('SignMiddleName', this.state.middlename);
    } catch (error) {
      alert('error store middle name');
    }
    try {
      await AsyncStorage.setItem('SignLastName', this.state.lastname);
    } catch (error) {
      alert('error store last name');
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
      //alert("Pickgen: " + this.state.pickgen);
    } catch (error) {
      alert('error store pickgen');
    }
    try{
      await AsyncStorage.setItem('Date', this.state.date);
      //alert("Bdate: " + this.state.date);
    } catch (error) {
      alert('error store date');
    }
    try{
      await AsyncStorage.setItem('Email', this.state.emailadd);
      //alert("Email: " + this.state.emailadd);
    } catch (error) {
      alert('error store email');
    }
    try{
      await AsyncStorage.setItem('Phonenum', this.state.phonenum);
      //alert("Phonenum: " + this.state.phonenum);
    } catch (error) {
      alert('error store phone num');
    }
    try{
      await AsyncStorage.setItem('Donatedbefore', this.state.donatedbefore);
      //alert("Donated before: " + this.state.donatedbefore);
    } catch (error) {
      alert('error store donated before');
    }
  }

  _retrieveData = async () => {
    try {
      const value1 = await AsyncStorage.getItem('SignFirstName');
      this.setState({firstname: value1});
    } catch (error) {
      alert('error retrieve first name');
    }
    try {
      const value1 = await AsyncStorage.getItem('SignMiddleName');
      this.setState({middlename: value1});
    } catch (error) {
      alert('error retrieve middle name');
    }
    try {
      const value1 = await AsyncStorage.getItem('SignLastName');
      this.setState({lastname: value1});
    } catch (error) {
      alert('error retrieve last name');
    }
    try {
      const valueuname = await AsyncStorage.getItem('SignUsername');
      this.setState({username: valueuname});
    } catch (error) {
      alert('error retrieve username');
    }
    try{
      const value2 = await AsyncStorage.getItem('SignPword');
      this.setState({pw: value2});
    } catch (error) {
      alert('error retrieve pw');
    }
    try{
      const value3 = await AsyncStorage.getItem('SignRepword');
      this.setState({repw: value3});
    } catch (error) {
      alert('error retrieve repw');
    }
    try{
      const value4 = await AsyncStorage.getItem('Date');
      this.setState({date: value4});
    } catch (error) {
      alert('error retrieve date');
    }
    try{
      const value8 = await AsyncStorage.getItem('Pickgen');
      this.setState({pickgen: value8});
     } catch (error) {
       alert('error retrieve pickgen');
     }
    try{
      const value5 = await AsyncStorage.getItem('Email');
      this.setState({emailadd: value5});
    } catch (error) {
      alert('error retrieve email');
    }
    try{
      const value6 = await AsyncStorage.getItem('Phonenum');
      this.setState({phonenum: value6});
    } catch (error) {
      alert('error retrieve phonenum');
    }
    try{
      const value9 = await AsyncStorage.getItem('Donatedbefore');
      this.setState({donatedbefore: value9});
    } catch (error) {
      alert('error retrieve donated before');
    }
  }

  componentDidMount(){
    this._retrieveData();
  }

  render() {
    const { navigate } = this.props.navigation;
    //const {namef} = this.state.name;
    var {height, width} = Dimensions.get('window');
    _onSelect = (itemValue) => {
      this.setState({donatedbefore: itemValue})
      if(itemValue == 'Yes'){
        this.setState({donatedbefore: 'Yes', createbutton: true}, ()=>{
          this._storeData();
          navigate('BloodBanksScreen',{name:'BloodBanksScreen', donatedbefore: this.state.donatedbefore});
        });
      }else{
        this.setState({createbutton: false,donatedbefore: 'No'});
      }
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headtext}>Sign Up</Text>
        </View>
        <FloatingLabelInput
          label="First Name"
          onChangeText={(text) => this.setState({firstname: text})}
          defaultValue={this.state.firstname}
        />
        <FloatingLabelInput
          label="Middle Name"
          onChangeText={(text) => this.setState({middlename: text})}
          defaultValue={this.state.middlename}
        />
        <FloatingLabelInput
          label="Last Name"
          onChangeText={(text) => this.setState({lastname: text})}
          defaultValue={this.state.lastname}
        />
        <FloatingLabelInput
          label="Username"
          onChangeText={(text) => this.setState({username: text})}
          defaultValue={this.state.username}
        />
        <FloatingLabelInput
          label="Password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({pw: text})}
          defaultValue={this.state.pw}
        />
        <FloatingLabelInput
          label="Re-enter Password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({repw: text})}
          defaultValue={this.state.repw}
        />
        <Text style={styles.radlabel}>Gender</Text>
        <Picker
          selectedValue={this.state.pickgen}
          style={{ height: 50, width: 120, marginLeft: 35}}
          onValueChange={(itemValue, itemIndex) => this.setState({pickgen: itemValue})}>
          <Picker.Item label="Male" value="Male"/>
          <Picker.Item label="Female" value="Female"/>
        </Picker>
        <Text style={styles.radlabel}>Birthday</Text>
        <DatePicker
          style={{width: 240}}
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
              marginLeft: 35
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => {this.setState({date: date})}}
        />
        <FloatingLabelInput
          label="Email Address"
          onChangeText={(text) => this.setState({emailadd: text})}
          defaultValue={this.state.emailadd}
          keyboardType= 'email-address'
        />
        <View style={{ marginLeft: 35, flexDirection: 'column', alignItems: 'flex-start'}}>
          <Text style={{color: '#aaa'}}>Phone Number</Text>
          <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
            <TextInput
              defaultValue={'+639'}
              editable={false}
            />
            <TextInput
              style={{width: width - 100}}
              label="Phone Number"
              onChangeText={(text) => this.setState({phonenum: text})}
              defaultValue={this.state.phonenum}
              keyboardType='numeric'
            />
          </View>
        </View>
        <Text style={styles.radlabel}>Have you donated blood previously?</Text>
        <Picker
          selectedValue={this.state.donatedbefore}
          style={{ height: 50, width: 100, marginLeft: 35}}
          onValueChange={(itemValue, itemIndex) => _onSelect(itemValue)}>
          <Picker.Item label="No" value="No"/>
          <Picker.Item label="Yes" value="Yes"/>
        </Picker>
        <View style={styles.createview}>
            <TouchableOpacity
            style={{backgroundColor: '#B81E12',
                  padding: 15,marginBottom: 30}}
            disabled={this.state.createbutton}
            onPress={this.signup}
            >
              <Text style={styles.createtext}>Create Account</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    );
  }
  signup = () => {
      if(this.state.firstname == "" || this.state.lastname == "" || this.state.username == "" || this.state.pw == "" 
      || this.state.repw == "" || this.state.emailadd == "" || this.state.phonenum == ""){
        alert("Please fill out all fields.");
      }
      else{
        if(this.state.pw == this.state.repw){
          var unval = true;
          var pwval = true;
          var usernamex = this.state.username;
          var pwx = this.state.pw;
          var unerrmsg = "";
          var pwerrmsg = "";
          var unwhitespacecheck = true;
          var specialcheck = true;
          var lengthcheck = true;

          //var pwspecialcheck = true;
          //var pwlengthcheck = true;
          
          for(var x = 0; x<usernamex.length; x++){
            if(usernamex.charAt(x) == " "){
              unwhitespacecheck = false;
            }
          }

          //AIzaSyD06LPlQ7Vznn3OLEgGkGuI-NUtf3mD478

          if(unwhitespacecheck == false){
            unerrmsg = unerrmsg + "White space is not allowed for username." + "\n";
          }

          if(usernamex.length < 8){
            lengthcheck = false;
            unerrmsg = unerrmsg + "Username should be comprised of at least 8 characters." + "\n";
          }

          var unstringcheck = "~`!@#$%^&*()-+=\|}]{[';:/>?,<";

          for(var chk = 0; chk < usernamex.length ; chk++){
            var unchar = usernamex.charAt(chk);
            for(var x = 0; x < unstringcheck.length; x++){
              if(unstringcheck.charAt(x) == unchar){
                specialcheck = false;
              }
            }
          }

          if(specialcheck == false){
            unerrmsg = unerrmsg + "Special characters aside from . and _ is not allowed for username." + "\n";
          }

          if(unwhitespacecheck == true && specialcheck == true && lengthcheck == true){
            unval = true;
          }else{
            unval = false;
          }

          var pwnumcheck = false;
          var pwspecialcheck = false;
          var pwlowercheck = false;
          var pwuppercheck = false;
          var pwlengthcheck = true;
          var pwstringcheck = "~`!@#$%^&*()-+=\|}]{[';:/>?,< ._";
          var numbers = "0123456789";
          var lower = "qwertyuiopasdfghjklzxcvbnm";
          var upper = "QWERTYUIOPASDFGHJKLZXCVBNM";

          if(pwx.length < 8){
            pwlengthcheck = false;
            pwerrmsg = pwerrmsg + "Password should be comprised of at least 8 characters." + "\n";
          }

          for(var b = 0; b < pwx.length ; b++){
            var pwchar = pwx.charAt(b);
            for(var x = 0; x < numbers.length; x++){
              if(numbers.charAt(x) == pwchar){
                pwnumcheck = true;
              }
            }
          }

          if(pwnumcheck == false){
            pwerrmsg = pwerrmsg + "Password should have at least one number." + "\n";
          }

          for(var b = 0; b < pwx.length ; b++){
            var pwchar = pwx.charAt(b);
            for(var x = 0; x < lower.length; x++){
              if(lower.charAt(x) == pwchar){
                pwlowercheck = true;
              }
            }
          }

          if(pwlowercheck == false){
            pwerrmsg = pwerrmsg + "Password should have at least one lowercase letter." + "\n";
          }

          for(var b = 0; b < pwx.length ; b++){
            var pwchar = pwx.charAt(b);
            for(var x = 0; x < upper.length; x++){
              if(upper.charAt(x) == pwchar){
                pwuppercheck = true;
              }
            }
          }

          if(pwuppercheck == false){
            pwerrmsg = pwerrmsg + "Password should have at least one uppercase letter." + "\n";
          }

          for(var b = 0; b < pwx.length ; b++){
            var pwchar = pwx.charAt(b);
            for(var x = 0; x < pwstringcheck.length; x++){
              if(pwstringcheck.charAt(x) == pwchar){
                pwspecialcheck = true;
              }
            }
          }

          if(pwspecialcheck == false){
            pwerrmsg = pwerrmsg + "Password should have at least one special character." + "\n";
          }

          if(pwnumcheck == true && pwspecialcheck == true && pwlowercheck == true && pwuppercheck == true && pwlengthcheck == true){
            pwval = true;
          }else{
            pwval = false;
          }
          
          if(unval == true && pwval == true){
            var dbefore = false;
            if(this.state.donatedbefore == 'No'){
              dbefore = false;
            }else{
              dbefore = true;
            }
            //MOBILE
            /**
             * fetch('http://192.168.43.18:3000/users/signup', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      user_firstname: this.state.firstname,
                      user_middlename: this.state.middlename,
                      user_lastname: this.state.lastname,
                      user_username: this.state.username,
                      user_emailAdd: this.state.emailadd,
                      user_contactNum: this.state.phonenum,
                      user_password: this.state.pw,
                      donated_before: dbefore,
                      user_gender: this.state.pickgen,
                      user_birthday: this.state.date,
                      is_Active: false,
                      user_type: 'bbuser',
                    })
      
            })
             */
            //WEB
            //fetch('http://192.168.43.210:8080/users/signup', {
            fetch('http://192.168.43.18:3000/users/signup', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      user_firstname: this.state.firstname,
                      user_middlename: this.state.middlename,
                      user_lastname: this.state.lastname,
                      username: this.state.username,
                      user_emailAdd: this.state.emailadd,
                      user_contactNum: this.state.phonenum,
                      password: this.state.pw,
                      donated_before: dbefore,
                      user_gender: this.state.pickgen,
                      user_birthday: this.state.date,
                      is_Active: false,
                      user_type: 'bbuser',
                      //MOBILE
                      user_username: this.state.username,
                    })
      
            })
            .then((response) => {
              if (response.status === 200) {
                var uname = this.state.username;
                //MOBILE
                /**
                 * fetch("http://192.168.43.18:3000/users/"+uname)
                .then((result) => result.json())
                .then((res) => {
                  //this.setState({ data: res});
                  //alert(res[0]._id);
                  try{
                    AsyncStorage.setItem('LoggedUserId', String(res[0]._id));
                    AsyncStorage.setItem('LoggedFName', String(res[0].user_firstname));
                    AsyncStorage.setItem('LoggedLName', String(res[0].user_lastname));
                    AsyncStorage.setItem('LoggedBloodType', String(res[0].user_bloodtype));
                    AsyncStorage.setItem('LoggedUser', String(res[0].user_username));
                    AsyncStorage.setItem('Logged', String(true));
                    //alert(res[0].user_firstname);
                  }catch(error){
                    alert(error.message);
                  }
                })
                .catch(e => e);
                 */
                //WEB
                //fetch("http://192.168.43.210:8080/users/"+uname)
                fetch("http://192.168.43.18:3000/users/"+uname)
                .then((result) => result.json())
                .then((res) => {
                  //this.setState({ data: res});
                  //alert(res[0]._id);
                  try{
                    AsyncStorage.setItem('LoggedUserId', String(res[0]._id));
                    AsyncStorage.setItem('LoggedFName', String(res[0].user_firstname));
                    AsyncStorage.setItem('LoggedLName', String(res[0].user_lastname));
                    AsyncStorage.setItem('LoggedBloodType', String(res[0].user_bloodtype));
                    AsyncStorage.setItem('LoggedUser', String(res[0].username));
                    AsyncStorage.setItem('Logged', String(true));
                    AsyncStorage.setItem('LoggedUserType', String(res[0].user_type));
                    //alert(res[0].user_firstname);
                  }catch(error){
                    alert(error.message);
                  }
                })
                .catch(e => e);
                this.setState({
                  firstname: '',
                  middlename: '',
                  lastname: '',
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
                alert("User account has been created.");
                this.props.navigation.navigate('Home');
              }else if(response.status === 400){
                alert("Invalid email address.")
              }
              else {
                alert("Username/Email already exists.");
              }
            })  
            .done();
          }else{
            alert(unerrmsg + "\n" + pwerrmsg);
          }
        }else{
          alert("Passwords does not match.");
        }
      }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  header: {
    width: '100%',
    height: '6%',
    backgroundColor: '#B81E12',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headtext: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image:{
    width: '35%',
    height: '25%'
  },
  text: {
    color: '#B81E12',
    fontSize: 30,
    fontWeight: 'bold',
  },
  labelInput: {
    color: '#673AB7',
  },
  formInput: {    
    borderBottomWidth: 1.5, 
    marginLeft: 20,
    borderColor: '#333',       
  },
  input: {
    borderWidth: 0
  },
  radlabel: {
    fontSize: 14,
    color: '#aaa',
    marginLeft: 35,
    marginTop: 3,
    paddingBottom: 3,
  },
  radbutton: {
    marginLeft: 20,
  },
  createview: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:10
  },
  createtext: {
    color: 'white'
  },
  modalview: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
   },
   modal: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'blue',
      flexDirection: 'row',
      padding: 10,
      height: 120,
      marginTop: 10,
      width: 300,
   },
   text: {
      color: 'white',
      marginTop: 10
   },
});
