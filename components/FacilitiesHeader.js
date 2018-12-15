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

export default class FacilitiesHeader extends Component {

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
                    marginRight: 40,
                }}>Blood Services Facilities Details</Text>
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
