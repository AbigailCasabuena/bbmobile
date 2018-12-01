import React, {Component} from 'react';
//import Button from 'react-native-button';
import {
    Text,
    View,
    Image,
    TouchableHighlight,
    AsyncStorage,
    ToolbarAndroid,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default class HeaderNew extends Component {
    _storeData = async () => {
        try {
          await AsyncStorage.setItem('LoggedUser', String(' '));
          await AsyncStorage.setItem('Logged',String(false));
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
                    marginRight: 140,
                }}>News Feed</Text>
                <TouchableOpacity style={{marginRight: 15}}
                        onPress={() => {
                            const {navigate} = this.props.navigation;
                            navigate('Notifications');
                        }}>
                        <Image
                            style={{width:24, height:24}}
                            source={require('../img/notif.png')}
                        />
                    
                </TouchableOpacity> 
                <TouchableOpacity style={{}}
                        onPress={this._storeData}>
                        <Image
                            style={{width:24, height:24}}
                            source={require('../img/settings.png')}
                        />
                    
                </TouchableOpacity> 
                
            </View>
        );
    }

}

const styles = StyleSheet.create({
   
});
