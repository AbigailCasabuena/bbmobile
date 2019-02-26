import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
  Picker,
  AsyncStorage,
  Alert,
  Modal,
  TouchableHighlight,
  ScrollView
} from 'react-native';

import { Container, Header, Content, ListItem, Text, Radio, Right, Left, List, Body, Spinner} from 'native-base';
import Login from './Login';
import BloodRequestHeader from './BloodRequestHeader';
import ImagePicker from 'react-native-image-picker';
import geolib from 'geolib';

type Props = {};

var request_form = [];
var counter = 0;

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
            style={{width:'84%',fontSize: 16, color: '#000',marginBottom: 10}}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </View>
      );
    }
  }

export default class BloodRequest extends Component<Props> {

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
      
       /*var dist = geolib.getDistance(position.coords, {
           latitude: latx,
           longitude: longx
       })/1000;*/
       //this.setState({distanceaway: dist});
       //alert(position.coords.latitude);
       this.setState({curLat: position.coords.latitude, curLong: position.coords.longitude});
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
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
      pickbgroup: 'A',
      pickbrh: '+',
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
      modalVisible: false,
      cancel1: true,
      cancel2: false,
      hospital: '',
      curLat: 0,
      curLong: 0,
      date_req: '',
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
    if(!(this.state.patient_name == "") && !(this.state.person_claim == "") && !(this.state.hospital == "")){
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
        var curyearx = new Date().getFullYear();
        var curdate = new Date();
        var curmonth = curdate.getMonth() + 1;
        var curday = curdate.getDate();

        var stringmnth = curmonth.toString();

        if(stringmnth.length == 1){
          stringmnth = "0" + stringmnth;
        }

        var date_requested = curyearx + "-" + stringmnth + "-" + curday;

        formData.append("requester_id",this.state.userid);
        formData.append("patient_name",this.state.patient_name);
        formData.append("no_of_bags", this.state.bags);
        formData.append("chapter_id", this.state.chapter_id);
        formData.append("is_urgent", urg);
        formData.append("person_claim", this.state.person_claim);
        formData.append("hospital", this.state.hospital);
        formData.append("blood_product", this.state.pickbprod);
        formData.append("date_requested", date_requested);
        //formData.append("request_form", request_form)

        //MOBILE
        //fetch('http://192.168.43.18:3000/bloodrequest', {
        fetch('http://192.168.43.210:8080/bloodrequest', {
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
            //MOBILE
            //fetch('http://192.168.43.18:3000/bloodstock/'+this.state.stockid, {  
            fetch('http://192.168.43.210:8080/bloodstock/'+this.state.stockid, {  
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: 'PATCH',
              body: JSON.stringify({
                reserved_stock: newres,
                remaining_stock: newrem
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
          <FloatingLabelInput
            label="Hospital"
            onChangeText={(text) => this.setState({hospital: text})}
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
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <TouchableOpacity
                style={{backgroundColor: '#B81E12',
                  padding: 10,marginBottom: 15, width: 120, alignSelf: 'center', marginRight:15}}
                onPress={this.submit}
              >
                <Text style={{color: 'white', alignSelf: 'center'}}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{backgroundColor: '#B81E12',
                  padding: 10,marginBottom: 15, width: 100, alignSelf: 'center', marginRight:15}}
                onPress={()=>{this.setState({disp: false, btndisp: true, cancel1: true, selecttext: true})}}
              >
                <Text style={{color: 'white', alignSelf: 'center'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
        </Content>
    }
  }

  showCancel(){
    if(this.state.btndisp == false && this.state.cancel1 == false){
      return <TouchableOpacity
              style={{backgroundColor: '#B81E12',
                padding: 10,marginBottom: 15, width: 100, alignSelf: 'center'}}
              onPress={()=>{this.setState({cancel1: !this.state.cancel1, btndisp: !this.state.btndisp})
                counter = 0;
              }}
            >
              <Text style={{color: 'white', alignSelf: 'center'}}>Cancel</Text>
      </TouchableOpacity>
    }
  }

  addcount(){
    counter += 1;
  }

  hidelist=()=>{
    if(this.state.disp == false && this.state.cancel1 == false){
        var manarr = this.state.data;
        var dist = [];
        var dist_copy = [];
        var finalarr = [];

        if(this.state.curLat != 0){
          for(var x = 0; x<manarr.length; x++){
            var latx = manarr[x].chapter.latitude;
            var longx = manarr[x].chapter.longitude;
            var distance1 = geolib.getDistance({latitude: this.state.curLat, longitude: this.state.curLong}, {
              latitude: latx,
              longitude: longx
            })/1000;
            dist.push(distance1);
          }

          for(var j=0; j< dist.length; j++){
            dist_copy.push(dist[j]);
          }

          dist_copy.sort(function(a, b){return a-b});

          for(var z=0; z < dist_copy.length; z++){
            for(var l=0; l < dist.length; l++){
              if(dist_copy[z] == dist[l]){
                finalarr.push(manarr[l]);
              }
            }
          }

          //alert(finalarr[0].chapter.chapter_name);

          //alert(dist + "\n" + dist_copy)
  
          //alert(dist);
          return <Content style={{marginLeft: 10, marginBottom: 20}}>
            <List dataArray={finalarr}
                renderRow={(itemx) =>
                  <ListItem>
                    <Body>
                    <TouchableOpacity onPress={_=>this.setState({selecttext: false, disp: true, 
                      chapter_id: itemx.chapter._id, 
                      chap_name: itemx.chapter.chapter_name, 
                      stockid: itemx._id,
                      totalstock: itemx.num_stock,
                      reserved: itemx.reserved_stock,
                      remaining: itemx.remaining_stock,
                      cancel1: true})}>
                      <Text> {itemx.chapter.chapter_name}</Text>
                    </TouchableOpacity>
                    </Body>
                    <Right>
                      <Text style={{color: 'gray', fontSize: 12}}>{dist_copy[counter] + " km away"}</Text>
                    </Right>
                    {this.addcount()}
                  </ListItem>
                }>
            </List>
          </Content>
        }else{
          return <Spinner color='red' />
        }
    }
  }

  check=()=>{
    //this.setState({disp: !this.state.disp})
    //var numbags = this.state.bags.
    if(this.state.bags <= 0){
      alert("Invalid value for no. of bags needed.");
    }else{
      //MOBILE
      //fetch('http://192.168.43.18:3000/bloodstock/check', {
      fetch('http://192.168.43.210:8080/bloodstock/check', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    blood_type: this.state.pickbgroup,
                    rh_factor: this.state.pickbrh,
                    blood_component: this.state.pickbprod,
                    num_stock: this.state.bags
                  })
      })
      .then((response)=> response.json())
      .then((res)=>{
        this.setState({data: res});
        if(res.length == 0){
          alert(this.state.bags + " bags of " + this.state.pickbgroup + this.state.pickbrh + " " + this.state.pickbprod
          + " is currently not available. Please try again after 30 to 45 mins." );
        }else{
          this.setState({btndisp: false, cancel1: false})
        }
      })
      .done()
    }
  }

  buttondisplay=()=>{
    if(this.state.btndisp == true && this.state.cancel1 == true){
      return <Content>
        <TouchableOpacity
            style={{backgroundColor: '#B81E12',
              padding: 10,marginBottom: 20, width: 170, alignSelf: 'center'}}
              onPress={this.check}
        >
          <Text style={{color: 'white', alignSelf: 'center'}}>Check Availability</Text>
        </TouchableOpacity>
      </Content>
    }else if(this.state.btndisp == false && this.state.selecttext == true && this.state.cancel1 == false){
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
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                //Alert.alert('Modal has been closed.');
                this.setModalVisible(!this.state.modalVisible);
              }}>
              <ScrollView style={{marginTop: 15, backgroundColor: 'white', marginBottom: 10}}>
                <Text style={{color: '#B81E12', fontWeight:'bold', alignSelf: 'center'}}>Processing Fees of Blood Components</Text>
                <View style={{marginLeft: 0}}>
                  <ScrollView>
                    <ListItem style={{marginRight: 0}}>
                      <Body>
                        <Text>Apheresis Platelets</Text>
                      </Body>
                      <Right>
                        <Text style={{color: 'gray'}}>PHP 15,000</Text>
                      </Right>
                    </ListItem>
                    <ListItem style={{marginRight: 0}}>
                      <Body>
                        <Text>Leukocyte-poor RBC</Text>
                      </Body>
                      <Right>
                        <Text style={{color: 'gray'}}>PHP 2,000</Text>
                      </Right>
                    </ListItem>
                    <ListItem style={{marginRight: 0}}>
                      <Body>
                        <Text>Whole Blood</Text>
                      </Body>
                      <Right>
                        <Text style={{color: 'gray'}}>PHP 1,800</Text>
                      </Right>
                    </ListItem>
                    <ListItem style={{marginRight: 0}}>
                      <Body>
                        <Text>Packed RBC</Text>
                      </Body>
                      <Right>
                        <Text style={{color: 'gray'}}>PHP 1,500</Text>
                      </Right>
                    </ListItem>
                    <ListItem style={{marginRight: 0}}>
                      <Body>
                        <Text>Leukocyte-poor PC</Text>
                      </Body>
                      <Right>
                        <Text style={{color: 'gray'}}>PHP 1,200</Text>
                      </Right>
                    </ListItem>
                    <ListItem style={{marginRight: 0}}>
                      <Body>
                        <Text>Platelet Concentrate (PC)</Text>
                      </Body>
                      <Right>
                        <Text style={{color: 'gray'}}>PHP 1,000</Text>
                      </Right>
                    </ListItem>
                    <ListItem style={{marginRight: 0}}>
                      <Body>
                        <Text>Frozen Plasma</Text>
                      </Body>
                      <Right>
                        <Text style={{color: 'gray'}}>PHP 1,000</Text>
                      </Right>
                    </ListItem>
                    <ListItem style={{marginRight: 0}}>
                      <Body>
                        <Text>Cryoprecipitate</Text>
                      </Body>
                      <Right>
                        <Text style={{color: 'gray'}}>PHP 1,000</Text>
                      </Right>
                    </ListItem>
                    <ListItem style={{marginRight: 0}}>
                      <Body>
                        <Text>Cryosupernate</Text>
                      </Body>
                      <Right>
                        <Text style={{color: 'gray'}}>PHP 1,000</Text>
                      </Right>
                    </ListItem>
                  </ScrollView>
                  <TouchableOpacity
                    style={{backgroundColor: '#B81E12', padding: 10, width: 80, alignSelf: 'center'}}
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Text style={{color: 'white', alignSelf: 'center'}}>Close</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </Modal>
            <Content>
              <View style={{backgroundColor: '#B81E12', height: 230, alignItems: 'center', alignContent: 'center'}}>
                <View style={{alignItems: 'center', alignContent: 'center', marginLeft: 20, marginRight: 20}}>
                  <Text style={{color: 'white', fontWeight:'bold', marginTop: 10}}>Notice</Text>
                  <Text style={{color: 'white', marginTop: 5, alignSelf: 'stretch'}}>
                    While donated blood is free, there are significant costs associated with collecting, testing, preparing components, labeling, storing and shipping; recruiting and educating donors; and quality assurance. As a result, processing fees are charged to recover costs. 
                  </Text>
                </View>
                <TouchableOpacity
                  style={{padding: 10}}
                  onPress={() => {
                    this.setModalVisible(true);
                  }}>
                  <Text style={{color: 'white', fontWeight:'bold'}}>View Processing Fees</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.radlabel}>Blood Type and Rh Factor</Text>
              <View style={{flexDirection: 'row'}}>
                <Picker
                  selectedValue={this.state.pickbgroup}
                  style={{ height: 50, width: 100, marginLeft: 35, marginBottom: 20}}
                  onValueChange={(itemValue, itemIndex) => this.setState({pickbgroup: itemValue})}>
                  <Picker.Item label="A" value="A"/>
                  <Picker.Item label="B" value="B"/>
                  <Picker.Item label="AB" value="AB"/>
                  <Picker.Item label="O" value="O"/>
                </Picker>
                <Picker
                selectedValue={this.state.pickbrh}
                style={{ height: 50, width: 100, marginLeft: 20, marginBottom: 20}}
                onValueChange={(itemValue, itemIndex) => this.setState({pickbrh: itemValue})}>
                  <Picker.Item label="+" value="+"/>
                  <Picker.Item label="-" value="-"/>
                </Picker>
              </View>
              <Text style={styles.radlabel}>Blood Product</Text>
              <Picker
                selectedValue={this.state.pickbprod}
                style={{ height: 50, width: 250, marginLeft: 35, marginBottom: 20}}
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
              {this.showCancel()}
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
