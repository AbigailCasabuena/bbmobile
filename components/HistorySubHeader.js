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

export default class HistorySubHeader extends Component {

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
                <TouchableOpacity onPress={()=>{
                    alert("Blood Donations");
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginLeft: 30,
                        marginRight: 40,
                    }}>Blood Donations</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    alert("Blood Requests");
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginLeft: 20,
                        marginRight: 100,
                    }}>Blood Requests</Text>
                </TouchableOpacity>
            </View>
            
        );
    }

}

const styles = StyleSheet.create({
   
});
