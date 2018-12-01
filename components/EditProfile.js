import React, { Component } from 'react';

import EditProfileHeader from './EditProfileHeader';

import { Container, 
        Header, 
        Content, 
        List, 
        ListItem, 
        Text, 
        Icon, 
        Left, 
        Body, 
        Right, 
        Switch,
        Card,
        CardItem,
        Thumbnail,
        Tab,
        TabHeading,
        Tabs,
        ScrollableTab} from 'native-base';
import { Image, Button, TouchableOpacity } from 'react-native';
//const FilePicker = require('NativeModules').FilePickerManager;
import CameraRollPicker from 'react-native-camera-roll-picker';

type Props = {};
export default class EditProfile extends Component<Props> {
  /*constructor(props) {
    super(props)

  }*/

  onPress = () => {
    
  }

  constructor(props) {
    super(props);
    this.state = {
        data: [],
        selectedImage: '',
    }
  }

  componentDidMount() {
    //alert('hello');
    
  }

  getSelectedImages=(image)=>{
    if(image[0]){
      //alert(image[0].uri);
      this.setState({selectedImage: image[0].uri});
      //alert(JSON.stringify(image[0]));
    }
  }

  saveImg(){
    alert(this.state.selectedImage);
    const data = new FormData();
    data.append('name', 'avatar');
    data.append('price', 25);
    data.append('productImage', {
      uri : this.state.selectedImage,
    });
    fetch('http://192.168.43.18:3000/products/upload', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                  },
                  body: data
          })
          .then((response) => {
            if (response.status === 200) {
              alert("Saved");
            }
          })
          .done();
  }

  render() {
    return (
      <Container>
        <EditProfileHeader {...this.props} />
        <Content>
            <Text> Hello</Text>
            <TouchableOpacity style={{backgroundColor:'red',padding: 10}} onPress={this.saveImg.bind(this)}>
              <Text> Save </Text>
            </TouchableOpacity>
            <CameraRollPicker callback={this.getSelectedImages.bind(this)} assetType="All"/>
        </Content>
      </Container>
    );
  }
}


