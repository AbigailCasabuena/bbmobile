import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modalbox';

type Props = {};
var screen= Dimensions.get('window');

export default class BloodBanksModal extends Component<Props> {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
  }
  showModal=()=>{
    this.refs.modal.open();
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Modal
        ref={"modal"}
        style={{
          justifyContent: 'center',
          showRadius: 10, 
          width: screen.width - 80,
          height: 280
        }}
        position='center'
        backdrop={true}
        onClosed={()=>{

        }}>
        <Text>Annyeong</Text>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  
});
