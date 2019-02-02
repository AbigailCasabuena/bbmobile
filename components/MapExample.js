import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Button, Icon} from 'native-base';
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import getDirections from 'react-native-google-maps-directions';

export default class MapExample extends React.Component {
    constructor(){
        super()
        this.state = {
            coordinates: []
        }
        this.getDirections = this.getDirections.bind(this);
        this.handleGetDirections = this.handleGetDirections.bind(this);
    }

    componentDidMount(){
        this.getDirections("14.68, 120.98", "14.65, 120.97");
    }

    async getDirections(startLoc, destinationLoc){
        try{
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&mode=walking&key=AIzaSyD06LPlQ7Vznn3OLEgGkGuI-NUtf3mD478`);
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index)=>{
                return {
                    latitude: point[0],
                    longitude: point[1]
                };
            });
            const newCoords = [...this.state.coordinates, coords];
            this.setState({coordinates: newCoords});
            return coords;
        }catch(error){
            alert(error);
            return error;
        }
    }

    handleGetDirections=()=>{
        const data = {
            source: {
                latitude: 14.68,
                longitude: 120.98,
            },
            destination: {
                latitude: 14.65,
                longitude: 120.97,
            },
            params: [
                {
                    key: 'travelmode',
                    value: 'walking'
                },
                {
                    key: 'dir_action',
                    value: 'navigate'
                }
            ]
        }
        getDirections(data)
    }

    render(){
        return(
            <View style={styles.map}>
                <MapView style={styles.map} 
                    initialRegion={{
                    latitude:14.65,
                    longitude:120.97,
                    latitudeDelta: 1,
                    longitudeDelta: 1
                    }}
                    showsUserLocation={false}
                >
                    <MapView.Marker
                        coordinate={{
                            latitude:14.65,
                            longitude:120.97,
                        }}
                    />
                    <Button transparent>
                        <Icon
                            size={30}
                            color={'#fff'}
                            name={'ios-man'}
                            onPress={this.handleGetDirections}
                        />
                    </Button>
                    {this.state.coordinates.map((coords, index)=>(
                        <MapView.Polyline
                            key={index}
                            index={index}
                            coordinates={coords}
                            strokeWidth={2}
                            strokeColor='blue'
                        />
                    ))}
                </MapView>
                <TouchableOpacity style={{backgroundColor: 'red', padding: 10}}
                    onPress={this.handleGetDirections}>
                        <Text style={{color: 'white'}}>Direction</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });