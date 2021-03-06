import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage,
  AppState
} from 'react-native';
import Header from './Header';
import Button from 'react-native-button';
import { YellowBox } from 'react-native';
//import RNRestart from 'react-native-restart';
//import CodePush from 'react-native-code-push';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

var PushNotification = require('react-native-push-notification');

PushNotification.configure({
  onNotification: function(notification) {
    console.log( 'NOTIFICATION:', notification );
  },
  popInitialNotification: true,
  requestPermissions: true,
})

type Props = {};
export default class Login extends Component<Props> {
  constructor(props) {
    //super(props)
    //this.mydate = 0;
    //this.date = 0;
    super(props);

    this.handleAppStateChange = this.handleAppStateChange.bind(this);

    this.state = {
      username: '',
      password: '',
      data: [],
    }

  }
  //static date;
  //static month;
  //static year;

  onPress = () => {
    
  }

  sName = "Login";

  componentDidMount(){
    console.log('hello');
    this._retrieveData();
    /*PushNotification.localNotification({
      message: "My Notification Message", 
      //date: new Date(Date.now() + (5 * 1000)) 
    });*/
    AppState.addEventListener('change', this.handleAppStateChange);
    //setInterval(()=>{console.log('hello')},10000);
  }

  componentWillUnmount(){
    AppState.removeEventListener('change', this.handleAppStateChange); 
  }

  hello(){
    console.log('hello');
  }

  handleAppStateChange(appstate){
    //setInterval methodd
    //var x= "hello";
    var mydate = new Date(2019,2,13,0,0,0); //date of appointment
    var currdate = new Date();
    var curyear = new Date().getFullYear();
    var curmonth = currdate.getMonth() + 1;
    var curday = currdate.getDate();
    //var currdatex = new Date(curyear,curmonth,curday,0,0,0);

    var myyear = mydate.getFullYear();
    var mymonth = mydate.getMonth();
    var myday = mydate.getDate();
    if(appstate === 'background'){
      if((curyear == myyear) && (curmonth == mymonth) && (curday == myday)){
        PushNotification.localNotification({
          message: "My Notification Message", 
          //date: new Date(Date.now()) 
        });
        //x = "lol";
      }
    }
  }

  _storeData = async () => {
    try {
      //alert(this.state.username)
      //await AsyncStorage.setItem('LoggedName', String(this.state.username));
      await AsyncStorage.setItem('LoggedUser', String(this.state.username));
      await AsyncStorage.setItem('Logged', String(true));
      //alert(this.state.username);
    } catch (error) {
      alert(error.message);
    }
  }

  _retrieveData = async () => {
    try {
      /*const value1 = await AsyncStorage.getItem('LoggedUser');
      if(!(value1 == null || value1 == '')){
        this.props.navigation.navigate('Home');
      }*/
      const value1 = await AsyncStorage.getItem('Logged');
      const value2 = await AsyncStorage.getItem('LoggedUser');
      if(value1 == 'true'){
        //alert(value2);
        this.props.navigation.navigate('Home');
      }
    } catch (error) {
      alert(error.message);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container1}>
        <KeyboardAvoidingView style={styles.style1}
        keyboardVerticalOffset={-500}>
        <View style={styles.container2}>
          <Text style={styles.text}>
            BloodBank PH
          </Text>
          <TextInput style={styles.un}
            keyboardType= 'email-address'
            placeholder='username'
            onChangeText={ (username) => this.setState({username}) }
            autoCapitalize = 'none'
          >
          </TextInput> 
          <TextInput style={styles.un}
            placeholder='password'
            secureTextEntry={true}
            onChangeText={ (password) => this.setState({password}) }
            autoCapitalize = 'none'
          >
          </TextInput>
          <View style={styles.forview}>
            <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigate('Forgot', { name: 'ForgotScreens' })
            }}
            >
              <Text style={styles.buttontext}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signview}>
            <TouchableOpacity
            style={{backgroundColor: '#B81E12',
                  padding: 15,}}
            /*onPress={() => {
              navigate('Home', { name: 'HomeScreens' })
            }}*/
            onPress={this.login}
            >
              <Text style={styles.signtext}>Sign in</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.accview}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigate('SignUpScreen', { name: 'SignUpScreens' })
                //mydate = date +3;
                //Alert.alert(mydate + '-' + month + '-' + year);
              }}
            >
              <Text style={styles.buttontext}>Don't have an account?</Text>
            </TouchableOpacity>
          </View>
        </View>
        </KeyboardAvoidingView>
      </View>
    );
  }

  login = () => {
      /*fetch('http://192.168.43.18:3000/api/userauth', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
              })

      })
      .then((response) => response.json())
      .then((res) => {
          if (res !==null) {
              //alert("Welcome " + s);
              alert('Hello ' + this.state.username);
              //AsyncStorage.setItem('user', res);
              this.props.navigation.navigate('Home');
          }
          else {
            alert(res.message);
          }
      })
      .done();*/
      //alert('annyeong');

      //MOBILE old attribs
      /*fetch('http://192.168.43.18:3000/users/login', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_username: this.state.username,
                user_password: this.state.password,
              })

      })*/
      //WEB
      //fetch('http://192.168.43.210:8080/users/login', {
        fetch('http://192.168.43.18:3000/users/login', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
              })

      })
      //.then((response) => response.json())
      /*.then((res) => {
          alert('hellooo');
          if (res !== null) {
              //alert("Welcome " + s);
              alert('Hello ' + res.username);
              //AsyncStorage.setItem('user', res);
              this.props.navigation.navigate('Home');
          }
          else {
            alert(res.message);
          }
      })*/
      .then((response) => {
        if (response.status === 200) {
            //alert('Hello' + response.username);
            var uname = this.state.username;
            //MOBILE
            /**
             * fetch("http://192.168.43.18:3000/users/"+uname)
            .then((result) => result.json())
            .then((res) => {
              //this.setState({ data: res});
              //alert(res[0]._id);
              try{
                AsyncStorage.setItem('LoggedUserId', String(res[0]._id));
                AsyncStorage.setItem('LoggedFName', String(res[0].user_firstname));
                AsyncStorage.setItem('LoggedLName', String(res[0].user_lastname));
                AsyncStorage.setItem('LoggedBloodType', String(res[0].user_bloodtype));
                AsyncStorage.setItem('LoggedUserType', String(res[0].user_type));
                
                //alert(res[0].user_firstname);
              }catch(error){
                alert(error.message);
              }
            })
            .catch(e => e);
             */
            //WEB
            //fetch("http://192.168.43.210:8080/users/"+uname)
            fetch("http://192.168.43.18:3000/users/"+uname)
            .then((result) => result.json())
            .then((res) => {
              //this.setState({ data: res});
              //alert(res[0]._id);
              try{
                AsyncStorage.setItem('LoggedUserId', String(res[0]._id));
                AsyncStorage.setItem('LoggedFName', String(res[0].user_firstname));
                AsyncStorage.setItem('LoggedLName', String(res[0].user_lastname));
                AsyncStorage.setItem('LoggedBloodType', String(res[0].user_bloodtype));
                AsyncStorage.setItem('LoggedUserType', String(res[0].user_type));
                if(!(res[0].user_type == "bbuser")){
                  AsyncStorage.setItem('LoggedChapterId', String(res[0].chapter_id._id));
                  AsyncStorage.setItem('LoggedChapterName', String(res[0].chapter_id.chapter_name));
                }
                //alert(res[0].user_firstname);
              }catch(error){
                alert(error.message);
              }
            })
            .catch(e => e);
            this._storeData();
            //CodePush.restartApp();
            this.props.navigation.navigate('Home');
            //RNRestart.Restart();
        }
        else {
          alert("Invalid username and/or password.");
        }
    })  
    .done();
  }

}

const styles = StyleSheet.create({
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
  },
  forview: {
    width: '70%',
    flexDirection: 'row'
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ECE6E6',
  },
  buttontext: {
    color: 'black'
  },
  signview: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 50
  },
  /*buttonsign: {
    backgroundColor: '#B81E12',
    padding: 15,
  },*/
  signtext: {
    color: 'white'
  },
  accview: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
