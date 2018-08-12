import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from './Header';
import Button from 'react-native-button';
//import { YellowBox } from 'react-native';
//YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

type Props = {};
export default class NewsFeed extends Component<Props> {
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


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container1}>
        <Header {...this.props} />
        <View style={styles.container2}>
          <Text style={styles.text}>
            BloodBank PH
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  style1: {
    flex: 1,
  },
  container1: {
    flex: 1,
    flexDirection: 'column',
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  un: {
    width: '70%',
    height: 60,
  },
  text: {
    color: '#B81E12',
    fontSize: 20,
    fontWeight: 'bold',
  },
  forview: {
    width: '70%',
    flexDirection: 'row'
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
  },
  buttontext: {
    color: 'black'
  },
  signview: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 50
  },
  buttonsign: {
    backgroundColor: '#B81E12',
    padding: 15,
  },
  signtext: {
    color: 'white'
  },
  accview: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
