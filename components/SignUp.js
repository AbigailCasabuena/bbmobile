import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
} from 'react-native';
//import FloatingLabel from 'react-native-floating-labels';

type Props = {};

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
      fontSize: !isFocused ? 20 : 14,
      color: !isFocused ? '#aaa' : '#000',
    };
    return (
      <View style={{ paddingTop: 18 }}>
        <Text style={labelStyle}>
          {label}
        </Text>
        <TextInput
          {...props}
          onChangeText={ (cont) => this.setState({cont})}
          style={{width:100,fontSize: 20, color: '#000', borderBottomColor: '#555' }}
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
  }
  onBlur() {
    console.log('#####: onBlur');
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headtext}>Sign Up</Text>
        </View>
        <FloatingLabelInput
          label="Email"
          onChange={this.handleTextChange}
        />
      </View>
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
    height: '10%',
    backgroundColor: '#B81E12',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headtext: {
    color: 'white',
    fontSize: 20,
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
  }
});
