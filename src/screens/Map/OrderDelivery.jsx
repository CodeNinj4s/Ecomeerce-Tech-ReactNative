import React, { useEffect, useRef, useState } from 'react';
import { Image, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import GOOGLE_API_KEY from '../../helpers/maps';


const api = GOOGLE_API_KEY; // Reemplaza esto con tu clave de API

export const OrderDelivery = () => {
    const mapView = useRef();
    const [streetName, setStreetName] = useState();
    const [fromLocation, setFromLocation] = useState();
    const [toLocation, setToLocation] = useState();
    const [region, setRegion] = useState();
    const [duration, setDuration] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [angle, setAngle] = useState(0);
    const [currentLocation, setCurrentLocation] = useState(null);

    const currentLocationData = {
        streetName: 'Ruiz cortines',
        gps: {
            latitude: 17.083624140490862,
            longitude: -96.74674877620211,
        },
    };

    const destinationLocationData = {
        latitude: 17.07806828245917,
        longitude: -96.74404220614363,
    };

    useEffect(() => {
        let fromLoc = currentLocationData.gps;
        let toLoc = destinationLocationData;
        let street = currentLocationData.streetName;

        let mapRegion = {
            latitude: (fromLoc.latitude + toLoc.latitude) / 2,
            longitude: (fromLoc.longitude + toLoc.longitude) / 2,
            latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
            longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
        };

        setStreetName(street);
        setFromLocation(fromLoc);
        setToLocation(toLoc);
        setRegion(mapRegion);
    }, []);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 5000, // Cada 5 segundos se actualiza la ubicación
                    distanceInterval: 10, // Cada 10 metros se actualiza la ubicación
                },
                (location) => {
                    setCurrentLocation({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    });
                }
            );
        })();
    }, []);

    function calculateAngle(coordinates) {
        // ... (resto del código para calcular el ángulo)
        let startLat = coordinates[0]["latitude"]
        let startLng = coordinates[0]["longitude"]
        let endLat = coordinates[1]["latitude"]
        let endLng = coordinates[1]["longitude"]
        let dx = endLat - startLat
        let dy = endLng - startLng

        return Math.atan2(dy, dx) * 180 / Math.PI
    }

    function renderMap() {
        const destinationMarker = () => (
            <Marker coordinate={toLocation}>
                {/* ... (resto del código para el marcador de destino) */}

            </Marker>
        );

        function repartidorMarker() {
            if (!currentLocation) return null;

            return (
                <Marker
                    coordinate={{
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                    }}
                    anchor={{ x: 0.5, y: 0.5 }}
                    flat={true}
                    rotation={angle}
                >
                    {/* ... (código para el marcador del repartidor) */}
                </Marker>
            );
        }

        return (
            <View style={{ flex: 1 }}>
                <MapView
                    ref={mapView}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={region}
                    style={{ flex: 1 }}
                >
                    <MapViewDirections
                        origin={fromLocation}
                        destination={toLocation}
                        apikey={api}
                        strokeWidth={5}
                        strokeColor={'#3eabfc'}
                        optimizeWaypoints={true}
                        onReady={(result) => {
                            setDuration(result.duration);

                            if (!isReady) {
                                mapView.current.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        right: 40,
                                        bottom: 200,
                                        left: 40,
                                        top: 100,
                                    },
                                });

                                let nextLoc = {
                                    latitude: result.coordinates[0]['latitude'],
                                    longitude: result.coordinates[0]['longitude'],
                                };

                                if (result.coordinates.length >= 2) {
                                    let angle = calculateAngle(result.coordinates);
                                    setAngle(angle);
                                }

                                setFromLocation(nextLoc);
                                setIsReady(true);
                            }
                        }}
                    />
                    {destinationMarker()}
                    {repartidorMarker()}
                </MapView>
            </View>
        );
    }

    function renderDestinationHeader() {
        // ... (resto del código para el encabezado del destino)
    }

    return (
        <View style={{ flex: 1 }}>
            {renderMap()}
            {renderDestinationHeader()}
        </View>
    );
};
