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
        this.setState({username: res[0].username});
        uname = res[0].username;
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
        if(!(this.state.repw == "" || this.state.repw == null) && (!(this.state.username == "" || this.state.username == null))){
          //formData2.append("user_password", this.state.newpw);
          pwcheck = true;
        }
      }
    }

    //formData2.append("null", null);
    if(unamecheck == true && pwcheck == true){
      if(this.state.repw == this.state.newpw){
        var unval = true;
        var usernamex = this.state.username;
        var unwhitespacecheck = true;
        var specialcheck = true;
        var lengthcheck = true;
        var unerrmsg = "";

        for(var x = 0; x<usernamex.length; x++){
          if(usernamex.charAt(x) == " "){
            unwhitespacecheck = false;
          }
        }

        if(unwhitespacecheck == false){
          unerrmsg = unerrmsg + "White space is not allowed for username." + "\n";
        }

        if(usernamex.length < 8){
          lengthcheck = false;
          unerrmsg = unerrmsg + "Username should be comprised of at least 8 characters." + "\n";
        }

        var unstringcheck = "~`!@#$%^&*()-+=\|}]{[';:/>?,<";

        for(var chk = 0; chk < usernamex.length ; chk++){
          var unchar = usernamex.charAt(chk);
          for(var x = 0; x < unstringcheck.length; x++){
            if(unstringcheck.charAt(x) == unchar){
              specialcheck = false;
            }
          }
        }

        if(specialcheck == false){
          unerrmsg = unerrmsg + "Special characters aside from . and _ is not allowed for username." + "\n";
        }

        if(unwhitespacecheck == true && specialcheck == true && lengthcheck == true){
          unval = true;
        }else{
          unval = false;
        }

        var pwval = true;
        var pwx = this.state.newpw;
        var pwerrmsg = "";
        var pwnumcheck = false;
        var pwspecialcheck = false;
        var pwlowercheck = false;
        var pwuppercheck = false;
        var pwlengthcheck = true;
        var pwstringcheck = "~`!@#$%^&*()-+=\|}]{[';:/>?,< ._";
        var numbers = "0123456789";
        var lower = "qwertyuiopasdfghjklzxcvbnm";
        var upper = "QWERTYUIOPASDFGHJKLZXCVBNM";

        if(pwx.length < 8){
          pwlengthcheck = false;
          pwerrmsg = pwerrmsg + "Password should be comprised of at least 8 characters." + "\n";
        }

        for(var b = 0; b < pwx.length ; b++){
          var pwchar = pwx.charAt(b);
          for(var x = 0; x < numbers.length; x++){
            if(numbers.charAt(x) == pwchar){
              pwnumcheck = true;
            }
          }
        }

        if(pwnumcheck == false){
          pwerrmsg = pwerrmsg + "Password should have at least one number." + "\n";
        }

        for(var b = 0; b < pwx.length ; b++){
          var pwchar = pwx.charAt(b);
          for(var x = 0; x < lower.length; x++){
            if(lower.charAt(x) == pwchar){
              pwlowercheck = true;
            }
          }
        }

        if(pwlowercheck == false){
          pwerrmsg = pwerrmsg + "Password should have at least one lowercase letter." + "\n";
        }

        for(var b = 0; b < pwx.length ; b++){
          var pwchar = pwx.charAt(b);
          for(var x = 0; x < upper.length; x++){
            if(upper.charAt(x) == pwchar){
              pwuppercheck = true;
            }
          }
        }

        if(pwuppercheck == false){
          pwerrmsg = pwerrmsg + "Password should have at least one uppercase letter." + "\n";
        }

        for(var b = 0; b < pwx.length ; b++){
          var pwchar = pwx.charAt(b);
          for(var x = 0; x < pwstringcheck.length; x++){
            if(pwstringcheck.charAt(x) == pwchar){
              pwspecialcheck = true;
            }
          }
        }

        if(pwspecialcheck == false){
          pwerrmsg = pwerrmsg + "Password should have at least one special character." + "\n";
        }

        if(pwnumcheck == true && pwspecialcheck == true && pwlowercheck == true && pwuppercheck == true && pwlengthcheck == true){
          pwval = true;
        }else{
          pwval = false;
        }

        if(unval == true && pwval == true){
          fetch('http://192.168.43.18:3000/users/'+userid, {  
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'PATCH',
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.newpw,
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
              alert("User information was successfully updated.");
            }
          });
        }
      }else{
        alert("Passwords does not match.");
      }
    }
    else if(unamecheck == true){
      var unval = true;
      var usernamex = this.state.username;
      var unwhitespacecheck = true;
      var specialcheck = true;
      var lengthcheck = true;
      var unerrmsg = "";

      for(var x = 0; x<usernamex.length; x++){
        if(usernamex.charAt(x) == " "){
          unwhitespacecheck = false;
        }
      }

      if(unwhitespacecheck == false){
        unerrmsg = unerrmsg + "White space is not allowed for username." + "\n";
      }

      if(usernamex.length < 8){
        lengthcheck = false;
        unerrmsg = unerrmsg + "Username should be comprised of at least 8 characters." + "\n";
      }

      var unstringcheck = "~`!@#$%^&*()-+=\|}]{[';:/>?,<";

      for(var chk = 0; chk < usernamex.length ; chk++){
        var unchar = usernamex.charAt(chk);
        for(var x = 0; x < unstringcheck.length; x++){
          if(unstringcheck.charAt(x) == unchar){
            specialcheck = false;
          }
        }
      }

      if(specialcheck == false){
        unerrmsg = unerrmsg + "Special characters aside from . and _ is not allowed for username." + "\n";
      }

      if(unwhitespacecheck == true && specialcheck == true && lengthcheck == true){
        unval = true;
      }else{
        unval = false;
      }

      if(unval == true){
        fetch('http://192.168.43.18:3000/users/'+userid, {  
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({
          username: this.state.username,
          prevname: uname
        })
        })
        .then((response)=>{
          if(response.status === 200){
            AsyncStorage.setItem('LoggedUser', this.state.username);
            alert("Username was successfully updated.");
          }else if(response.status === 403){
            alert("Username already exists.")
          }
        });
      }else{
        alert(unerrmsg);
      }
    }
    else if(pwcheck == true){
      if(this.state.newpw == this.state.repw){
        var pwval = true;
        var pwx = this.state.newpw;
        var pwerrmsg = "";
        var pwnumcheck = false;
        var pwspecialcheck = false;
        var pwlowercheck = false;
        var pwuppercheck = false;
        var pwlengthcheck = true;
        var pwstringcheck = "~`!@#$%^&*()-+=\|}]{[';:/>?,< ._";
        var numbers = "0123456789";
        var lower = "qwertyuiopasdfghjklzxcvbnm";
        var upper = "QWERTYUIOPASDFGHJKLZXCVBNM";

        if(pwx.length < 8){
          pwlengthcheck = false;
          pwerrmsg = pwerrmsg + "Password should be comprised of at least 8 characters." + "\n";
        }

        for(var b = 0; b < pwx.length ; b++){
          var pwchar = pwx.charAt(b);
          for(var x = 0; x < numbers.length; x++){
            if(numbers.charAt(x) == pwchar){
              pwnumcheck = true;
            }
          }
        }

        if(pwnumcheck == false){
          pwerrmsg = pwerrmsg + "Password should have at least one number." + "\n";
        }

        for(var b = 0; b < pwx.length ; b++){
          var pwchar = pwx.charAt(b);
          for(var x = 0; x < lower.length; x++){
            if(lower.charAt(x) == pwchar){
              pwlowercheck = true;
            }
          }
        }

        if(pwlowercheck == false){
          pwerrmsg = pwerrmsg + "Password should have at least one lowercase letter." + "\n";
        }

        for(var b = 0; b < pwx.length ; b++){
          var pwchar = pwx.charAt(b);
          for(var x = 0; x < upper.length; x++){
            if(upper.charAt(x) == pwchar){
              pwuppercheck = true;
            }
          }
        }

        if(pwuppercheck == false){
          pwerrmsg = pwerrmsg + "Password should have at least one uppercase letter." + "\n";
        }

        for(var b = 0; b < pwx.length ; b++){
          var pwchar = pwx.charAt(b);
          for(var x = 0; x < pwstringcheck.length; x++){
            if(pwstringcheck.charAt(x) == pwchar){
              pwspecialcheck = true;
            }
          }
        }

        if(pwspecialcheck == false){
          pwerrmsg = pwerrmsg + "Password should have at least one special character." + "\n";
        }

        if(pwnumcheck == true && pwspecialcheck == true && pwlowercheck == true && pwuppercheck == true && pwlengthcheck == true){
          pwval = true;
        }else{
          pwval = false;
        }

        if(pwval == true){
          fetch('http://192.168.43.18:3000/users/'+userid, {  
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'PATCH',
          body: JSON.stringify({
            password: this.state.newpw,
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
              alert("Password was successfully updated.");
              //qalert(this.state.curpw);
            }
          });
        }else{
          alert(pwerrmsg);
        }
      }else{
        alert("Passwords does not match.");
      }
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



