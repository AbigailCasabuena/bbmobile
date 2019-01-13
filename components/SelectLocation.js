import React, { Component} from 'react';
/*import {
  StyleSheet,
  Text,
  View,
} from 'react-native';*/
import HeaderNew from './HeaderNew';
//import Button from 'react-native-button';
import { Image, TouchableOpacity, View, AsyncStorage,StyleSheet,Dimensions} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Moment from 'moment';
import { Container, 
        Header, 
        Content, 
        List, 
        ListItem, 
        Text, 
        Icon, 
        Left, 
        Body, 
        Right, 
        Switch,
        Button,
        Card,
        CardItem,
        Thumbnail,
        Segment} from 'native-base';

import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
//import { YellowBox } from 'react-native';
//YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
type Props = {};
var colorcolor="";
var num;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

window.navigator.userAgent = "react-native";
import io from 'socket.io-client/dist/socket.io';

export default class SelectLocation extends Component<Props> {

    constructor(props) {
        super(props);
    
        this.state = {
          latitude: null,
          longitude: null,
          error: null,
          concat: null,
          coords:[],
          x: 'false',
          //cordLatitude:-6.23,
          cordLatitude: 14.6780337,
          //cordLongitude:106.75,
          cordLongitude: 120.9763754,
          isMapReady: false,
        };
    
        this.mergeLot = this.mergeLot.bind(this);
    
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
           (position) => {
             this.setState({
               latitude: position.coords.latitude,
               longitude: position.coords.longitude,
               error: null,
             });
             this.mergeLot();
           },
           (error) => this.setState({ error: error.message }),
           { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
         );
    
    }

    onMapLayout = () => {
        this.setState({ isMapReady: true });
    }

    mergeLot(){
        if (this.state.latitude != null && this.state.longitude!=null)
         {
           let concatLot = this.state.latitude +","+this.state.longitude
           this.setState({
             concat: concatLot
           }, () => {
             this.getDirections(concatLot, "-6.270565,106.759550");
           });
         }
    
    }

    async getDirections(startLoc, destinationLoc) {

        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            })
            this.setState({coords: coords})
            this.setState({x: "true"})
            return coords
        } catch(error) {
          console.log('masuk fungsi')
            this.setState({x: "error"})
            return error
        }
    }

    show=()=>{
        alert(this.state.latitude);
    }

  render() { 
    Moment.locale('en');
    return (
      <Container>
        <Content>
        <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed='auto'    // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                console.log(data, details);
                alert(details.geometry.location.lat);
            }}
            
            getDefaultValue={() => ''}
            
            query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'AIzaSyD06LPlQ7Vznn3OLEgGkGuI-NUtf3mD478',
                language: 'en', // language of the results
                //types: 'address' // default: 'geocode'
                components: 'country:ph'
            }}
            
            styles={{
                textInputContainer: {
                width: '100%'
                },
                description: {
                fontWeight: 'bold'
                },
                predefinedPlacesDescription: {
                color: '#1faadb'
                }
            }}
            
            currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            nearbyPlacesAPI='GoogleReverseGeocoding' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }}
            GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: 'distance',
                types: 'food'
            }}
        
            //filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        
            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            //renderLeftButton={()  => <Image source={require('../img/bbphicon.png')} />}
            //renderRightButton={() => <Text>Custom text after the input</Text>}
            />

            <Content>
            <MapView style={styles.map} initialRegion={{
                //latitude:-6.270565,
                latitude: 14.68,
                //longitude:106.759550,
                longitude: 120.98,
                latitudeDelta: 1,
                longitudeDelta: 1
                }}
                onLayout={this.onMapLayout}>

                
                
                    
                    {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
                    coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
                    title={"Your Location"}
                />}

                {!!this.state.cordLatitude && !!this.state.cordLongitude && <MapView.Marker
                    coordinate={{"latitude":this.state.cordLatitude,"longitude":this.state.cordLongitude}}
                    title={"Your Destination"}
                    />}

                {!!this.state.latitude && !!this.state.longitude && this.state.x == 'true' && <MapView.Polyline
                        coordinates={this.state.coords}
                        strokeWidth={2}
                        strokeColor="red"/>
                    }

                    {!!this.state.latitude && !!this.state.longitude && this.state.x == 'error' && <MapView.Polyline
                    coordinates={[
                        {latitude: this.state.latitude, longitude: this.state.longitude},
                        {latitude: this.state.cordLatitude, longitude: this.state.cordLongitude},
                    ]}
                    strokeWidth={2}
                    strokeColor="red"/>
                    
                    
                }
            </MapView>
            </Content>
            <TouchableOpacity style={{padding:10, backgroundColor: 'yellow'}} onPress={this.show}>
                <Text>Press</Text>
            </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        width,
        height
    }
});

