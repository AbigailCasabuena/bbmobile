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
  AsyncStorage
} from 'react-native';
//import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import RadioForm from 'react-native-radio-form';
import {INFO} from '../state/SignUpInfo';
type Props = {};

var screen= Dimensions.get('window');

const radio_props = [
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
];

class FloatingLabelInput extends Component {
  /*state = {
    isFocused: false,
    cont: '',
  };

  handleFocus = () => this.setState({ isFocused: true });
  handleBlurName = () => {
    const {cont} = this.state;
    if(!(cont=='')){
      this.setState({ isFocused: true });
    }
    else{
      this.setState({ isFocused: false });
    }
  }*/
  state = {
    isFocused: false,
    cont: '',
  };

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => {
    if(!(AsyncStorage.getItem('SignName')=='') || !(AsyncStorage.getItem('SignName') == null)){
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
      top: !isFocused ? 16 : 0,
      fontSize: !isFocused ? 15 : 13,
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
    this.state = {valuegender: '', date:"1-1-2000",
      mindate:"1-1-" + minyear,
      maxdate:"12-31-" + maxyear,
      valuedonation: 'No',
      donatedbefore: 1,
      nameinput: '', defname: '',
      pw: '', defpw: '',
      repw: '', defrepw: '',
      gender: 0, 
      emailadd: '', defemail: '',
      phonenum: '',
      //name: INFO[name].value,
      //modalVisible: false,
    };
  }
  /*setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }*/

  onBlur() {
    console.log('#####: onBlur');
  }

  /*defValueMethod = () =>{
    if(this.state.name != null || this.state.name != ''){
      return this.state.name;
    }
  }*/

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('SignName', this.state.nameinput);
    } catch (error) {
      // Error saving data
    }
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('SignName');
      if (value !== null || value !== '') {
        // We have data!!
        //alert(value);
        this.setState({nameinput: value});
      }
     } catch (error) {
       // Error retrieving data
     }
  }

  _handleBlurName = () =>{
    if(!(AsyncStorage.getItem('SignName')=='') || !(AsyncStorage.getItem('SignName') == null)){
      this.setState({ isFocused: true });
    }
    else{
      this.setState({ isFocused: false });
    }
  }

  componentDidMount(){
    this._retrieveData();
  }

  render() {
    const { navigate } = this.props.navigation;
    //const {namef} = this.state.name;
    var {height, width} = Dimensions.get('window');
    //let x = this.state.mindate + "";
    //let y = this.state.maxdate + "";
    _onSelect = (item) => {
      //alert('Item: ' + item.value);
      if(item.value == 'Yes'){
        this.setState({donatedbefore: 0}, ()=>{
          /*try {
            alert(this.state.nameinput)
            AsyncStorage.setItem('SignName', this.state.nameinput);
            //alert(namef);
          } catch (error) {
            console.log('error');
          }*/
          this._storeData();
          navigate('BloodBanksScreen',{name:'BloodBanksScreen', donatedbefore: this.state.donatedbefore});
        });
      }
    };

    

    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headtext}>Sign Up</Text>
        </View>
        <FloatingLabelInput
          label="Name"
          value={this.state.nameinput}
          onChangeText={(text) => this.setState({nameinput: text})}
          defaultValue={this.state.nameinput}
          /*onBlur={() => {
            this._retrieveData();
            const {cont} = this.state.nameinput;
            if(!(cont=='')){
              this.setState({ isFocused: true });
            }
            else{
              this.setState({ isFocused: false });
            }
          }}*/
        />
        <FloatingLabelInput
          label="Password"
          secureTextEntry={true}
          onChange={this.handleTextChange}
          onBlur={this.handleBlur}
          /*onBlur={() => {
            const {cont} = this.state;
            if(!(cont=='')){
              this.setState({ isFocused: true });
            }
            else{
              this.setState({ isFocused: false });
            }
          }}*/
        />
        <FloatingLabelInput
          label="Re-enter Password"
          secureTextEntry={true}
          onChange={this.handleTextChange}
        />
        <Text style={styles.radlabel}>Gender</Text>
        <View style={{height: 40}}>
          <RadioForm
            style={styles.radbutton}
            initial={0}
            dataSource={radio_props}
            formHorizontal={true}
            labelHorizontal={true}
            itemShowKey="label"
            itemRealKey="value"
            onPress={(item) => {
              //_onSelect(item);
            }}
            circleSize={20}
            outerColor="#B81E12"
            innerColor="#B81E12"
          />
        </View>
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
          onChange={this.handleTextChange}
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
              defaultValue={this.state.phonenum}
              onChange={this.handleTextChange}
              keyboardType='numeric'
            />
          </View>
        </View>
        <Text style={styles.radlabel}>Have you donated blood previously?</Text>
        <View style={{height: 40}}>
          <RadioForm
            style={styles.radbutton}
            initial={this.state.donatedbefore}
            dataSource={radio_props2}
            formHorizontal={true}
            labelHorizontal={true}
            itemShowKey="label"
            itemRealKey="value"
            onPress={(item) => {
              _onSelect(item);
            }}
            circleSize={20}
            outerColor="#B81E12"
            innerColor="#B81E12"
          />
        </View>
        <View style={styles.createview}>
            <TouchableOpacity
            style={{backgroundColor: '#B81E12',
                  padding: 15,marginBottom: 100}}
            onPress={() => {
              this._retrieveData();
              alert(this.state.nameinput);
            }}
            >
              <Text style={styles.createtext}>Create Account</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    );
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
    height: '8%',
    backgroundColor: '#B81E12',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headtext: {
    color: 'white',
    fontSize: 18,
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
