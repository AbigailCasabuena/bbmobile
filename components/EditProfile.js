import React, { Component } from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import EditProfileHeader from './EditProfileHeader';
import ImagePicker from 'react-native-image-picker';

import { Container, 
        Header, 
        Content, 
        List, 
        ListItem, 
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
//const FilePicker = require('NativeModules').FilePickerManager;
//import CameraRollPicker from 'react-native-camera-roll-picker';

type Props = {};

const options={
  title: "my pic app",
  maxWidth: 800, // photos only
  maxHeight: 500,
  takePhotoButtonTitle: "camera",
  chooseFromLibraryButtonTitle: "library",
}

export default class EditProfile extends Component<Props> {
  /*constructor(props) {
    super(props)

  }*/

  onPress = () => {
    
  }

  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      data: null
    }
  }

  componentDidMount() {
    //alert('hello');
    
  }

  execPic=()=>{
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri, path: response.path, type: response.type, fileName: response.fileName };
    
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          avatarSource: source,
        });
        alert(source.path);
      }
    });    
  }

  savepic=()=>{
    var formData = new FormData();
        formData.append("name", "bts");
        formData.append("price", "100");

        // pictureSource is object containing image data.
        var pictureSource = this.state.avatarSource;
        //alert(pictureSource.path);

        if (pictureSource) {
          var photo = {
            uri: pictureSource.uri,
            type: pictureSource.type,
            name: pictureSource.fileName,
            path: pictureSource.uri,
          };
          formData.append('productImage', photo);

          fetch('http://192.168.43.18:3000/products', {  
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data'
            },
            method: 'POST',
            body: formData
          });
        }

        /*fetch('http://192.168.43.18:3000/products/', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                  },
                  body: formData
          })
          .then((response,err) => {
            if(response.status === 200){
              alert("done");
            }else{
              alert(err.message);
            }
          })  
          .done();*/
  }

  render() {
    return (
      <Container>
        <EditProfileHeader {...this.props} />
        <Content>
            <Text> Hello</Text>
            {
              /*
              <CameraRollPicker callback={this.getSelectedImages.bind(this)} assetType="All"/>
              */
            }
            <TouchableOpacity onPress={this.execPic} style={{backgroundColor: 'red',padding: 10}}>
              <Text style={{color:'white'}}> Select Image </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.savepic} style={{backgroundColor: 'red',padding: 10}}>
              <Text style={{color:'white'}}> Save </Text>
            </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}


