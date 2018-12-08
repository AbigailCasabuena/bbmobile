import React, { Component } from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet, AsyncStorage, TextInput} from 'react-native';
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
        ScrollableTab,
        Form,
        Item,
        Input,
        Label} from 'native-base';

type Props = {};
var uname = "";
var userid = "";
var path = "";

const options={
  title: "Change Profile Photo",
  maxWidth: 1000, // photos only
  maxHeight: 1000,
  takePhotoButtonTitle: "Take a photo",
  chooseFromLibraryButtonTitle: "Choose from library",
}

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
      top: 0,
      fontSize: 13,
      color: '#aaa',
      marginTop: 20,
    };

    return (
      <View style={{ paddingTop: 35,flexDirection:'row',alignItems:'center',justifyContent:'center',marginLeft: 20}}>
        <Text style={labelStyle}>
          {label}
        </Text>
        <TextInput
          {...props}
          //onChangeText={ (cont) => this.setState({cont})}
          style={{width: '100%', fontSize: 16, color: '#000',}}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </View>
    );
  }
}

export default class EditProfile extends Component<Props> {

  onPress = () => {
    
  }

  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      picsource: null,
      username: '',
      curpw: '',
      newpw: '',
      repw: '',
      imgpath: 'http://192.168.43.18:3000/uploads/user.png',
    }
  }

  componentDidMount() {
    //alert('hello');
    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const value2 = await AsyncStorage.getItem('LoggedUserId');
      id=String(value2);
      userid=String(value2);
      fetch("http://192.168.43.18:3000/users/getId/"+id)
      .then((result) => result.json())
      .then((res) => {
        //this.setState({ data: res});
        //alert(res[0].user_username);
        if(res[0].user_image != null){
          this.setState({imgpath: "http://192.168.43.18:3000/" + res[0].user_image});
          path = "http://192.168.43.18:3000/" + res[0].user_image;
        }
        this.setState({username: res[0].user_username});
        uname = res[0].user_username;
      })
    .catch(e => e);
    } catch (error) {
      alert(error.message);
    }
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
        const mypic = {uri: response.uri};
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          avatarSource: source,
          picsource: mypic,
          imgpath: response.uri
        });
        //alert(mypic.uri);
      }
    });    
  }

  savepic=()=>{
    var formData = new FormData();
    var check = false;
    
    if(!(this.state.imgpath == "http://192.168.43.18:3000/uploads/user.png" || this.state.imgpath == path)){
      var pictureSource = this.state.avatarSource;
        if (pictureSource) {
          var photo = {
            uri: pictureSource.uri,
            type: pictureSource.type,
            name: pictureSource.fileName,
            path: pictureSource.uri,
          };
          formData.append("user_image", photo);
        }
      check = true;
    }else{
      check = false;
    }

    formData.append("null", null);

    if(check == true){
      //alert(check);
      fetch('http://192.168.43.18:3000/users/imageUpload/'+userid, {  
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        method: 'PATCH',
        body: formData
      });
    }
  }

  render() {
    return (
      <Container>
        <EditProfileHeader {...this.props} />
        <Content>
            <TouchableOpacity
                style={[styles.profileImgContainer]}
                onPress={this.execPic}
            >        
              <Image source={{uri: this.state.imgpath}} style={styles.profileImg}/>
            </TouchableOpacity>
            <TouchableOpacity
                  style={{backgroundColor: '#B81E12',
                  width: 110, padding: 10, alignSelf: 'center', marginTop: 10}}
                  onPress={this.savepic}
              >
                <Text style={{color:'white', alignSelf: 'center'}}>Save Photo</Text>
            </TouchableOpacity>
            <Form style={{marginRight: 20, marginBottom: 20}}>
              <FloatingLabelInput
                label="Username"
                onChangeText={(text) => this.setState({username: text})}
                defaultValue={this.state.username}
              />
              <FloatingLabelInput
                label="Current Password"
                onChangeText={(text) => this.setState({curpw: text})}
                secureTextEntry={true}
                defaultValue={this.state.curpw}
              />
              <FloatingLabelInput
                label="New Password"
                onChangeText={(text) => this.setState({newpw: text})}
                secureTextEntry={true}
                defaultValue={this.state.newpw}
              />
              <FloatingLabelInput
                label="Re-enter New Password"
                onChangeText={(text) => this.setState({repw: text})}
                secureTextEntry={true}
                defaultValue={this.state.repw}
              />
            </Form>
            <TouchableOpacity
                  style={{backgroundColor: '#B81E12',
                  width: 110, padding: 10, alignSelf: 'center', marginTop: 10, marginBottom: 10}}
                  onPress={this.saveinfo}
              >
                <Text style={{color:'white', alignSelf: 'center'}}>Save Changes</Text>
            </TouchableOpacity>
        </Content>
      </Container>
    );
  }

  saveinfo=()=>{
    //var formData2 = new FormData();
    var unamecheck = false;
    var pwcheck = false;

    if(!(this.state.username == uname || this.state.username == "" || this.state.username == null)){
      //formData2.append("user_username",this.state.username);
      unamecheck = true;
    }
    if(!(this.state.curpw == "" || this.state.curpw == null)){
      if(!(this.state.newpw == "" || this.state.newpw == null)){
        if(!(this.state.repw == "" || this.state.repw == null) && (this.state.newpw == this.state.repw) && (!(this.state.username == "" || this.state.username == null))){
          //formData2.append("user_password", this.state.newpw);
          pwcheck = true;
        }
      }
    }

    //formData2.append("null", null);
    if(unamecheck == true && pwcheck == true){
      fetch('http://192.168.43.18:3000/users/'+userid, {  
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({
          user_username: this.state.username,
          user_password: this.state.newpw,
          prevname: uname,
          prevpw: this.state.curpw,
        })
      })
      .then((response)=>{
        if(response.status === 200){
          AsyncStorage.setItem('LoggedUser', this.state.username);
          this.setState({
            curpw: '',
            newpw: '',
            repw: '',
          })
          alert("User info update successful");
        }
      });
    }
    else if(unamecheck == true){
      fetch('http://192.168.43.18:3000/users/'+userid, {  
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({
          user_username: this.state.username,
          prevname: uname
        })
      })
      .then((response)=>{
        if(response.status === 200){
          AsyncStorage.setItem('LoggedUser', this.state.username);
          alert("Username update successful");
        }
      });
    }
    else if(pwcheck == true){
      fetch('http://192.168.43.18:3000/users/'+userid, {  
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({
          user_password: this.state.newpw,
          prevpw: this.state.curpw,
        })
      })
      .then((response)=>{
        if(response.status === 200){
          //AsyncStorage.setItem('LoggedUser', this.state.username);
          this.setState({
            curpw: '',
            newpw: '',
            repw: '',
          })
          alert("Password update successful.");
          //qalert(this.state.curpw);
        }
      });
    }
  }

}

const styles = StyleSheet.create({
  profileImgContainer: {
    marginLeft: 8,
    height: 100,
    width: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginTop: 15,
    alignSelf: 'center',
  },
  profileImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});



