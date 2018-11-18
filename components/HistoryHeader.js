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
} from 'react-native';

export default class HistoryHeader extends Component {

    render(){
        return (
            <View style={{
                height: 50,
                marginTop: 5,
                marginBottom: 5,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}> 
                <TouchableHighlight style={{marginLeft: 10}}
                    onPress={() => {
                        const {navigate} = this.props.navigation;
                        navigate('DrawerOpen');
                    }}>
                    <Image
                        style={{width:32, height:32}}
                        source={require('../img/bbphicon.png')}
                    />
                
                </TouchableHighlight>  
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginLeft: 13,
                    marginRight: 140,
                }}>History</Text>
            </View>
            
        );
    }

}

const styles = StyleSheet.create({
   
});
