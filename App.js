import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  Platform,
  PermissionsAndroid,
  Dimensions,
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

const { width, height } = Dimensions.get("screen");

export default function App() {
  const [region, setRegion] = useState(null);

  useEffect(() => {
    getMyLocation();
  }, []);

  function getMyLocation() {
      Location.getCurrentPositionAsync((info) => {
      console.log("LAT", info.coords.latitude);
      console.log("LONG", info.coords.longitude);

      setRegion({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    },
     () => {console.log('DEU ALGUM ERRO')}, {
       enableHighAccurracy: true,
       timeout: 2000
     }
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        onMapReady={() => {
          () =>
            Platform.OS === "android"
              ? PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                ).then(() => {
                  console.log("USUARIO ACEITOU");
                })
              : "";
        }}
        style={{ width: width, height: height }}
        region={region}
        showsUserLocation
        zoomEnabled={true}
        minZoomLevel={17}
        showsUserLocation={true}
        loadingEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
