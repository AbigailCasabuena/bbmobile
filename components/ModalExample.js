import React, { Component } from 'react';

import {
   Modal,
   Text,
   TouchableHighlight,
   View,
   StyleSheet
} 
from 'react-native'

export default class ModalExample extends Component {
   state = {
      modalVisible: false,
   }
   toggleModal(visible) {
      this.setState({ modalVisible: visible });
   }
   render() {
      return (
         <View style = {styles.container}>
            <Modal animationType = {"slide"} transparent = {true}
               visible = {this.state.modalVisible}
               onRequestClose = {() => { console.log("Modal has been closed.") } }>
               <View style={styles.modalview}>
                  <View style = {styles.modal}>
                      <Text style = {styles.text}>Modal is open!</Text>
                      
                      <TouchableHighlight onPress = {() => {
                        this.toggleModal(!this.state.modalVisible)}}>
                        
                        <Text style = {styles.text}>Close Modal</Text>
                      </TouchableHighlight>
                  </View>
               </View>
            </Modal>
            
            <View style={styles.cont1}>
              <TouchableHighlight onPress = {() => {this.toggleModal(true)}}>
                <Text style = {styles.text}>Open Modal</Text>
              </TouchableHighlight>
            </View>
         </View>
      )
   }
}

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
      flexDirection: 'row',
      padding: 10,
      height: 150
   },
   cont1: {
      backgroundColor: 'white',
      height: 75,
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
      color: '#3f2949',
      marginTop: 10
   }
})