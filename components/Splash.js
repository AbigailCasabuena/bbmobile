import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { Button } from 'react-native';
import Header from './Header';

type Props = {};
export default class Splash extends React.Component {
  static navigationOptions = ({navigation}) =>{
    return { };
  };
  
  render() {
    //const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <Header {...this.props} />
        <Image
          style={styles.image}
          source={require('../img/bbphicon.png')}
        />
        <Text style={styles.text}>
          BloodBank PH
        </Text>
        <Button
          title="Go to Jane's profile"
          onPress={() => {
            //navigate('LoginScreen', { name: 'LoginScreens' })
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image:{
    width: '35%',
    height: '25%'
  },
  text: {
    color: '#B81E12',
    fontSize: 30,
    fontWeight: 'bold',
  }
});
