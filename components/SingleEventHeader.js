import React, {Component} from 'react';
//import Button from 'react-native-button';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    AsyncStorage,
    ToolbarAndroid,
    StyleSheet,
} from 'react-native';

import {Icon} from 'native-base';

export default class SingleEventHeader extends Component {
    _storeData = async () => {
        try {
          await AsyncStorage.setItem('LoggedUser', String(''));
          await AsyncStorage.setItem('Logged',String(false));
          await AsyncStorage.setItem('LoggedUserId', String(''));
          await AsyncStorage.setItem('LoggedFName', String(''));
          await AsyncStorage.setItem('LoggedLName', String(''));
          await AsyncStorage.setItem('LoggedBloodType', String(''));
          await AsyncStorage.setItem('LoggedUserType', String(''));
          //alert(AsyncStorage.getItem('LoggedUser'));
          this.props.navigation.navigate('Login');
        } catch (error) {
          alert('error store logged user');
        }
    }

    render(){
        return (
            <View style={{
                height: 50,
                marginTop: 5,
                marginBottom: 5,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderBottomColor: '#B81E12',
                borderBottomWidth: 2
            }}> 
                <TouchableOpacity style={{marginLeft: 10}}
                    onPress={() => {
                        const {navigate} = this.props.navigation;
                        navigate('DrawerOpen');
                    }}>
                    <Image
                        style={{width:32, height:32}}
                        source={require('../img/bbphicon.png')}
                    />
                
                </TouchableOpacity>  
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginLeft: 13,
                    marginRight: 180,
                }}>Event</Text>
                <TouchableOpacity style={{marginRight: 15}}
                        onPress={() => {
                            const {navigate} = this.props.navigation;
                            navigate('Notifications');
                        }}>
                        <Icon name="md-notifications" />
                </TouchableOpacity> 
                <TouchableOpacity style={{}}
                        onPress={this._storeData}>
                        <Icon name="md-log-out" />
                </TouchableOpacity> 
            </View>
            
        );
    }

}

const styles = StyleSheet.create({
   
});
