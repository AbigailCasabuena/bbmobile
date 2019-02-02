import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

import MapView, { Marker, ProviderPropType } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 14.678072;
const LONGITUDE = 120.978467;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const markerIDs = ['Marker1', 'Marker2', 'Marker3', 'Marker4', 'Marker5'];
const timeout = 1000;
let animationTimeout;

class FocusOnMarkers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      a: {
        latitude: LATITUDE + SPACE,
        longitude: LONGITUDE + SPACE,
      },
      b: {
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE - SPACE,
      },
      c: {
        latitude: LATITUDE - (SPACE * 2),
        longitude: LONGITUDE - (SPACE * 2),
      },
      d: {
        latitude: LATITUDE - (SPACE * 3),
        longitude: LONGITUDE - (SPACE * 3),
      },
      e: {
        latitude: LATITUDE - (SPACE * 4),
        longitude: LONGITUDE - (SPACE * 4),
      },
      lat: null,
      long: null
    };
  }

  componentDidMount() {
    //animationTimeout = setTimeout(() => {
    navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState({
                lat: position.coords.latitude,
                long: position.coords.longitude,
                error: null,
              });
              //this.mergeLot();
              //this.focus1();
              alert(position.coords.latitude);
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
    //}, timeout);
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

  focus2() {
    animationTimeout = setTimeout(() => {
      this.focusMap([
        markerIDs[2],
        markerIDs[3],
      ], false);

      this.focus3();
    }, timeout);
  }

  focus3() {
    animationTimeout = setTimeout(() => {
      this.focusMap([
        markerIDs[1],
        markerIDs[2],
      ], false);

      this.focus4();
    }, timeout);
  }

  focus4() {
    animationTimeout = setTimeout(() => {
      this.focusMap([
        markerIDs[0],
        markerIDs[3],
      ], true);

      this.focus1();
    }, timeout);
  }

  /*onMapLayout = () => {
    this.setState({ isMapReady: true });
    //setTimeout( () => { this.map.fitToCoordinates([{ latitude: this.state.latitude, longitude: this.state.longitude }, { latitude: this.state.cordLatitude, longitude: this.state.cordLongitude }], { animated: false, }); }, 2000 );
}*/
    showMap=()=>{
        if(this.state.lat != null){
            return <MapView
            provider={this.props.provider}
            ref={ref => { this.map = ref; }}
            style={styles.map}
            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            //onLayout={this.onMapLayout}
          >
            <Marker
              identifier="Marker1"
              coordinate={this.state.a}
            />
            <Marker
              identifier="Marker2"
              coordinate={{latitude:this.state.lat,longitude:this.state.long}}
            />
          </MapView>
        }
    }
  render() {
    return (
      <View style={styles.container}>
        {this.showMap()}
      </View>
    );
  }
}

FocusOnMarkers.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default FocusOnMarkers;