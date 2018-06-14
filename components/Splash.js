import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

type Props = {};
export default class Splash extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../img/bbphicon.png')}
        />
        <Text style={styles.text}>
          BloodBank PH
        </Text>
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
