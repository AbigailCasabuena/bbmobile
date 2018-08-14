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
} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
//import ModalExample from './ModalExample';
//import BloodBanksModal from './BloodBanksModal';
//import Modal from 'react-native-modalbox';
//import FloatingLabel from 'react-native-floating-labels';
//var me = new ModalExample();
type Props = {};
var screen= Dimensions.get('window');

var radio_props = [
  {label: 'Male          ', value: 'M' },
  {label: 'Female', value: 'F' ,marginLeft: 35},
];

var radio_props2 = [
  {label: 'Yes          ', value: 'Yes' },
  {label: 'No', value: 'No' ,marginLeft: 35},
];

class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
    cont: '',
  };

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => {
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
      top: !isFocused ? 18 : 0,
      fontSize: !isFocused ? 16 : 14,
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
          onChangeText={ (cont) => this.setState({cont})}
          style={{width:'84%',fontSize: 16, color: '#000',}}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </View>
    );
  }
}

export default class SignUp extends React.Component {
  static navigationOptions = ({navigation}) =>{
    return { };
  };
  
  constructor(props){
    super(props);
    var year = new Date().getFullYear();
    var minyear = year - 70;
    var maxyear = year -18;
    this.state = {value: 'M', date:"1-1-2000",
      mindate:"1-1-" + minyear,
      maxdate:"12-31-" + maxyear,
      //modalVisible: false,
    };
  }
  /*setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }*/
  onBlur() {
    console.log('#####: onBlur');
  }

  /*toggleModal(visible) {
    this.setState({ modalVisible: visible });
  }*/

  render() {
    //let x = this.state.mindate + "";
    //let y = this.state.maxdate + "";
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headtext}>Sign Up</Text>
        </View>
        <FloatingLabelInput
          label="Name"
          onChange={this.handleTextChange}
        />
        <FloatingLabelInput
          label="Password"
          secureTextEntry={true}
          onChange={this.handleTextChange}
        />
        <FloatingLabelInput
          label="Re-enter Password"
          secureTextEntry={true}
          onChange={this.handleTextChange}
        />
        <Text style={styles.radlabel}>Gender</Text>
        <RadioForm
          radio_props={radio_props}
          initial={0}
          formHorizontal={true}
          labelHorizontal={true}
          buttonColor={'#B81E12'}
          animation={true}
          style={styles.radbutton}
          selectedButtonColor={'#B81E12'}
          onPress={(value) => {
            this.setState({value:value})
            //this.props.refs.modal.showModal();
            //this.setModalVisible(true);
            //me.setModalVisible(true);

          }}
          outerCircleSize={1}
          innerCircleSize={0.5}
        />
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
        <FloatingLabelInput
          label="Phone Number"
          onChange={this.handleTextChange}
          keyboardType='numeric'
        />
        <Text style={styles.radlabel}>Have you donated blood?</Text>
        <RadioForm
          radio_props={radio_props2}
          initial={0}
          formHorizontal={true}
          labelHorizontal={true}
          buttonColor={'#B81E12'}
          animation={true}
          style={styles.radbutton}
          selectedButtonColor={'#B81E12'}
          onPress={(value) => {
            this.setState({value:value})}
            //alert(this.mindate);
          }
          outerCircleSize={1}
          innerCircleSize={0.5}
        />
        <View style={styles.createview}>
            <TouchableOpacity
            style={{backgroundColor: '#B81E12',
                  padding: 15,}}
            onPress={() => {
              this.toggleModal(true)
            }}
            >
              <Text style={styles.createtext}>Create Account</Text>
            </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
    fontSize: 16,
    marginLeft: 35,
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
