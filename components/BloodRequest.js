import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
  Picker,
  AsyncStorage
} from 'react-native';

import { Container, Header, Content, ListItem, Text, Radio, Right, Left, List } from 'native-base';
import Login from './Login';
import BloodRequestHeader from './BloodRequestHeader';
import ImagePicker from 'react-native-image-picker';

type Props = {};

var request_form = [];

const options={
  title: "Select a photo",
  maxWidth: 1700, // photos only
  maxHeight: 1500,
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
      /*if(!(AsyncStorage.getItem('SignName')=='') || !(AsyncStorage.getItem('SignName') == null)){
        this.setState({ isFocused: false });
      }
      else{
        this.setState({ isFocused: true });
      }*/
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
        color: 'gray',
        marginLeft: 35,
        marginTop: 3,
      };
  
      return (
        <View style={{ paddingTop: 10,flexDirection:'row',alignItems:'center',justifyContent:'center',}}>
          <Text style={labelStyle}>
            {label}
          </Text>
          <TextInput
            {...props}
            //onChangeText={ (cont) => this.setState({cont})}
            style={{width:'84%',fontSize: 16, color: '#000',marginBottom: 20}}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </View>
      );
    }
  }

export default class BloodRequest extends Component<Props> {

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this._retrieveData();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.navigate('Home'); 
    return true;
  }

  constructor(props){
    super(props);
    this.state = {
      bags: 0,
      pickbgroup: 'A+',
      pickbprod: 'Apheresis platelets',
      data: [],
      disp: false,
      btndisp: true,
      patient_name: '',
      chapter_id: '',
      chap_name: 'cd',
      //request_form: [],
      is_urgent: false,
      selecttext: true,
      person_claim: '',
      yes: true,
      no: false,
      userid: '',
      picslength: 0,
      stockid: '',
      reserved: 0,
      remaining: 0,
      totalstock: 0,
      hospital: '',
      personal_use: true,
    }
  }

  _retrieveData = async () => {
    try {
      const value2 = await AsyncStorage.getItem('LoggedUserId');
      //this.setState({userId: String(value2)});
      id=String(value2);
      this.setState({userid: id});
      //alert(id);
      } catch (error) {
      }
  }

  checkyes=()=>{
    if(this.state.yes == true){
      this.setState({yes: false, no: true})
    }else{
      this.setState({yes: true, no: false})
    }
  }

  checkno=()=>{
    if(this.state.no == true){
      this.setState({no: false, yes: true})
    }else{
      this.setState({no: true, yes: false})
    }
  }

  submit=()=>{
    var urg;
    if(this.state.yes == true){
      urg = true;
    }else{
      urg = false;
    }
    if(!(this.state.patient_name == "") && !(this.state.person_claim == "")){
      if(request_form.length > 0){
        var formData = new FormData();
        var rf = [];

        for(var x=0; x< request_form.length; x++){
          var brfpic = {
            uri: request_form[x].uri,
            type: request_form[x].type,
            name: request_form[x].fileName,
            path: request_form[x].uri,
          }
          //rf.push(brfpic);
          formData.append("request_form", brfpic);
        }

        //alert(rf.length);
        //alert(request_form[0].path);

        formData.append("requester_id",this.state.userid);
        formData.append("patient_name",this.state.patient_name);
        formData.append("number_bags", this.state.bags);
        formData.append("chapter_id", this.state.chapter_id);
        formData.append("is_urgent", urg);
        formData.append("person_claim", this.state.person_claim);
        //formData.append("request_form", request_form)

        fetch('http://192.168.43.18:3000/bloodrequest', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
          },
          method: 'POST',
          body: formData
        })
        .then((response)=> {
          if(response.status === 201){
            var newres = parseInt(this.state.reserved) + parseInt(this.state.bags);
            var newrem = parseInt(this.state.totalstock) - parseInt(newres);
            fetch('http://192.168.43.18:3000/bloodstock/'+this.state.stockid, {  
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: 'PATCH',
              body: JSON.stringify({
                reserved: newres,
                remaining: newrem
              })
            })
            .then((response)=>{
              
            });
            alert('Blood request was successfully submitted.');
            this.props.navigation.navigate('Home');
          }
        })
        .done()
      }else{
        alert("Please attach images of the blood request form.");
      }
    }else{
      alert("Please fill out all fields.")
    }
  }
  
  getItems=()=>{
    if(this.state.disp == true){
        return <Content>
          <Text style={{alignSelf: 'center'}}>Selected blood bank: </Text>
          <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>{this.state.chap_name + "\n"}</Text>
          <FloatingLabelInput
            label="Patient's Name"
            onChangeText={(text) => this.setState({patient_name: text})}
          />
          <Text style={styles.radlabel}>Is the blood request urgent?</Text>
          <ListItem onPress={this.checkyes} style={{marginLeft: 35}}>
            <Left>
              <Radio selected={this.state.yes} />
              <Text> Yes</Text>
            </Left>
          </ListItem>
          <ListItem onPress={this.checkno} style={{marginLeft: 35}}>
            <Left>
              <Radio selected={this.state.no} />
              <Text> No</Text>
            </Left>
          </ListItem>
          <FloatingLabelInput
            label="Person to Claim"
            onChangeText={(text) => this.setState({person_claim: text})}
          />
          <Text style={styles.radlabel}>Blood Request Form{"\n"}</Text>
          <TouchableOpacity
            style={{backgroundColor: '#B81E12',
              padding: 10,marginBottom: 15, width: 150, marginLeft: 35}}
            onPress={this.execPic}
          >
            <Text style={{color: 'white', alignSelf: 'center'}}>Attach Image</Text>
          </TouchableOpacity>
          <Text style={styles.radlabel}>{this.state.picslength + " "}image/s selected. {"\n"} </Text>
          <TouchableOpacity
            style={{backgroundColor: '#B81E12',
              padding: 10,marginBottom: 15, width: 130, alignSelf: 'center'}}
            onPress={this.submit}
          >
            <Text style={{color: 'white', alignSelf: 'center'}}>Submit</Text>
          </TouchableOpacity>
        </Content>
    }
  }

  hidelist=()=>{
    if(this.state.disp == false){
        return <Content style={{marginLeft: 20}}>
            <List dataArray={this.state.data}
                renderRow={(itemx) =>
                  <ListItem>
                    <TouchableOpacity onPress={_=>this.setState({selecttext: false, disp: true, 
                      chapter_id: itemx.chapter._id, 
                      chap_name: itemx.chapter.chapter_name, 
                      stockid: itemx._id,
                      totalstock: itemx.num_stock,
                      reserved: itemx.reserved,
                      remaining: itemx.remaining})}>
                      <Text> {itemx.chapter.chapter_name} </Text>
                    </TouchableOpacity>
                  </ListItem>
                }>
            </List>
        </Content>
    }
  }

  check=()=>{
    //this.setState({disp: !this.state.disp})
    //var numbags = this.state.bags.
    if(this.state.bags <= 0){
      alert("Invalid value for no. of bags needed.");
    }else{
      fetch('http://192.168.43.18:3000/bloodstock/check', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    blood_group: this.state.pickbgroup,
                    blood_category: this.state.pickbprod,
                    num_stock: this.state.bags
                  })
    
      })
      .then((response)=> response.json())
      .then((res)=>{
        this.setState({data: res});
        if(res.length == 0){
          alert(this.state.bags + " bags of " + this.state.pickbgroup + " " + this.state.pickbprod
          + " is currently not available. Please try again after 30 to 45 mins." );
        }else{
          this.setState({btndisp: false})
        }
      })
      .done()
    }
  }

  buttondisplay=()=>{
    if(this.state.btndisp == true){
      return <Content>
        <TouchableOpacity
            style={{backgroundColor: '#B81E12',
              padding: 10,marginBottom: 20, width: 170, alignSelf: 'center'}}
              onPress={this.check}
        >
          <Text style={{color: 'white', alignSelf: 'center'}}>Check Availability</Text>
        </TouchableOpacity>
      </Content>
    }else if(this.state.btndisp == false && this.state.selecttext == true){
      return <Content>
        <Text style={{fontWeight: 'bold', marginBottom: 20, marginLeft: 35}}>Select a blood bank to send your blood request:</Text>
      </Content>
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
        //const mypic = {uri: response.uri};
    
        /*this.setState({
          avatarSource: source,
        });*/
        if(source){
          //alert(source.fileName)
          request_form.push(source);
          this.setState({picslength: request_form.length})
        }
        
      }
    });    
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <Container>
        <BloodRequestHeader {...this.props} />
            <Content>
              <Text style={styles.radlabel}>Blood Type</Text>
              <Picker
                selectedValue={this.state.pickbgroup}
                style={{ height: 50, width: 200, marginLeft: 35, marginBottom: 20}}
                onValueChange={(itemValue, itemIndex) => this.setState({pickbgroup: itemValue})}>
                <Picker.Item label="A+" value="A+"/>
                <Picker.Item label="A-" value="A-"/>
                <Picker.Item label="B+" value="B+"/>
                <Picker.Item label="B-" value="B-"/>
                <Picker.Item label="AB+" value="AB+"/>
                <Picker.Item label="AB-" value="AB-"/>
                <Picker.Item label="O+" value="O+"/>
                <Picker.Item label="O-" value="O-"/>
              </Picker>
              <Text style={styles.radlabel}>Blood Product</Text>
              <Picker
                selectedValue={this.state.pickbprod}
                style={{ height: 50, width: 200, marginLeft: 35, marginBottom: 20}}
                onValueChange={(itemValue, itemIndex) => this.setState({pickbprod: itemValue})}>
                <Picker.Item label="Apheresis platelets" value="Apheresis platelets"/>
                <Picker.Item label="Leukocyte-poor RBC" value="Leukocyte-poor RBC"/>
                <Picker.Item label="Whole Blood" value="Whole Blood"/>
                <Picker.Item label="Packed RBC" value="Packed RBC"/>
                <Picker.Item label="Leukocyte-poor PC" value="Leukocyte-poor PC"/>
                <Picker.Item label="Platelet Concentrate (PC)" value="Platelet Concentrate (PC)"/>
                <Picker.Item label="Frozen Plasma" value="Frozen Plasma"/>
                <Picker.Item label="Cryoprecipitate" value="Cryoprecitate"/>
                <Picker.Item label="Cryosupernate" value="Cryosupernate"/>
              </Picker>
              <FloatingLabelInput
                label="No. of bags needed"
                onChangeText={(text) => this.setState({bags: text})}
                keyboardType='numeric'
              />
              {this.buttondisplay()}
              {this.hidelist()}
              {this.getItems()}
            </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  radlabel: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 35,
    marginTop: 3,
    paddingBottom: 3,
  },
  headerview: {
    width: '100%',
    height: 40,
    backgroundColor: 'black',
  },
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
    paddingBottom: 20,
  },
  forview: {
    width: '70%',
    flexDirection: 'row'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#B81E12',
    padding: 10,
  },
  buttontext: {
    color: 'white'
  },
  signview: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 50
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
