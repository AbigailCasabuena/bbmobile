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

import MapView, {Marker, ProviderPropType} from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import MapViewDirections from 'react-native-maps-directions';
import BloodBanksLocationHeader from './BloodBanksLocationHeader';
//import { YellowBox } from 'react-native';
//YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
type Props = {};
var colorcolor="";
var num;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height - 50;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const markerIDs = ['Marker1', 'Marker2'];
const timeout = 1000;
let animationTimeout;

window.navigator.userAgent = "react-native";
import io from 'socket.io-client/dist/socket.io';

export default class SelectLocation extends Component<Props> {

    constructor(props) {
        super(props);
        //this.mapRef = null;
        this.state = {
          latitude: null,
          longitude: null,
          error: null,
          concat: null,
          coords:[],
          x: 'false',
          //cordLatitude:-6.23,
          cordLatitude: 14.678072,
          //cordLongitude:106.75,
          cordLongitude: 120.978467,
          isMapReady: false,
          listview: 'auto',
          curlat: null,
          curlong: null,
        };
    
        this.mergeLot = this.mergeLot.bind(this);
    
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
           (position) => {
             this.setState({
               latitude: position.coords.latitude,
               longitude: position.coords.longitude,
               curlat: position.coords.latitude,
               curlong: position.coords.longitude,
               error: null,
             });
             //this.mergeLot();
             this.focus1();
           },
           (error) => this.setState({ error: error.message }),
           { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
         );
    }

    componentWillUnmount() {
        if (animationTimeout) {
          clearTimeout(animationTimeout);
        }
    }

    focusMap(markers, animated) {
        console.log(`Markers received to populate map: ${markers}`);
        this.map.fitToSuppliedMarkers(markers, animated);
    }

    focus1() {
        animationTimeout = setTimeout(() => {
          this.focusMap([
            markerIDs[0],
            markerIDs[1],
          ], true);
    
          //this.focus2();
        }, timeout);
    }

    onMapLayout = () => {
        this.setState({ isMapReady: true });
        //setTimeout( () => { this.map.fitToCoordinates([{ latitude: this.state.latitude, longitude: this.state.longitude }, { latitude: this.state.cordLatitude, longitude: this.state.cordLongitude }], { animated: false, }); }, 2000 );
    }

    mergeLot(){
        if (this.state.latitude != null && this.state.longitude!=null)
         {
           let concatLot = this.state.latitude +","+this.state.longitude
           this.setState({
             concat: concatLot
           }, () => {
             this.getDirections(concatLot, "14.678072,120.978467");
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

    showMap=()=>{
        if(this.state.latitude != null){
            return <MapView style={styles.map} 
            ref={ref => { this.map = ref; }}
            //onLayout = {() => this.mapRef.fitToCoordinates([{latitude: this.state.latitude, longitude: this.state.longitude},{latitude: this.state.cordLatitude, longitude: this.state.cordLongitude}], { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: false })}
            /*initialRegion={{
            //latitude:-6.270565,
            latitude: 14.678072,
            //longitude:106.759550,
            longitude: 120.978467,
            latitudeDelta: 0.8,
            longitudeDelta: 0.8
            }}
            onLayout={this.onMapLayout}*/
            style={styles.map}
            initialRegion={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }}
            >

            
            
                
                {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
                coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
                title={"Your Location"}
                identifier="Marker1"
                />}

                {!!this.state.cordLatitude && !!this.state.cordLongitude && <MapView.Marker
                    coordinate={{"latitude":this.state.cordLatitude,"longitude":this.state.cordLongitude}}
                    title={"Your Destination"}
                    identifier="Marker2"
                />}

            {/*<Marker
                identifier="Marker1"
                coordinate={{latitude: this.state.latitude, longitude: this.state.longitude}}
            />
            <Marker
                identifier="Marker2"
                coordinate={{latitude: this.state.cordLatitude, longitude: this.state.cordLongitude}}
            />*/}

            {/*!!this.state.latitude && !!this.state.longitude && this.state.x == 'true' && <MapView.Polyline
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
                */
                
            }
            <MapViewDirections
                origin={{latitude: this.state.latitude, longitude: this.state.longitude}}
                destination={{latitude: this.state.cordLatitude, longitude: this.state.cordLongitude}}
                apikey={"AIzaSyD06LPlQ7Vznn3OLEgGkGuI-NUtf3mD478"}
                strokeWidth={3}
                strokeColor="blue"
            />
        </MapView>
        }
    }

  render() { 
    Moment.locale('en');
    return (
      <Container>
            <BloodBanksLocationHeader {...this.props} />
            <Content>
            <GooglePlacesAutocomplete
            placeholder='Origin'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed={this.state.listview}   // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                console.log(data, details);
                //alert(details.geometry.location.longitude);
                this.setState({latitude: details.geometry.location.lat,longitude: details.geometry.location.lng, listview:'false'})
                this.focus1();
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
            
            //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            //currentLocationLabel="Current location"
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
            {
                /**
                 *  <TouchableOpacity style={{padding:10, backgroundColor: 'yellow'}} onPress={this.show}>
                        <Text>Press</Text>
                    </TouchableOpacity>
                 */
            }
            <TouchableOpacity style={{padding: 10, backgroundColor: 'white'}}
                onPress={()=>{
                    this.setState({latitude: this.state.curlat, longitude: this.state.curlong})
                    this.focus1();
                }}
            >
                <Text style={{color: 'black'}}>Current location</Text>
            </TouchableOpacity>
            {this.showMap()}
        </Content>
      </Container>
    );
  }
}

SelectLocation.propTypes = {
    provider: ProviderPropType,
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
        width,
        height
    }
    /*container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },*/
      /*map: {
        ...StyleSheet.absoluteFillObject,
      },*/
});

