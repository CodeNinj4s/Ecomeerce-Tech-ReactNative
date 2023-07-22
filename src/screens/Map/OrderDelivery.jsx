import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useRef, useState } from 'react'
import { SIZES, theme } from '../../core/theme'
import useCurrentLocation from '../../hooks/useCurrentLocation'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'
import GOOGLE_API_KEY from '../../helpers/maps'
import icons from '../../../assets/icons/icons,'
import {
    Image, Text, View, TouchableOpacity
} from 'react-native';
export const OrderDelivery = ({navigation}) => {
    const mapView = useRef()
    const [streetName, setStreetName] = useState("")
    const [fromLocation, setFromLocation] = useState(null)
    const [toLocation, setToLocation] = useState(null)
    const [region, setRegion] = useState(null)

    const [duration, setDuration] = useState(0)
    const [isReady, setIsReady] = useState(false)
    const [angle, setAngle] = useState(0)
    const currentLocation = useCurrentLocation()

    // const currentLocationData = {
    //     streetName: 'Ruiz cortines',
    //     gps: {
    //         latitude: 17.083624140490862,
    //         longitude: -96.74674877620211,
    //     },
    // };

    const destinationLocationData = {
        latitude: 17.07806828245917,
        longitude: -96.74404220614363,
    };

    useEffect(() => {
        let fromLoc;
        let street;
        let toLoc = destinationLocationData;
        if (currentLocation && currentLocation.gps) {
            fromLoc = currentLocation.gps;
            street = currentLocation.streetName
        }
        let mapRegion = {
            latitude: (fromLoc.latitude + toLoc.latitude) / 2,
            longitude: (fromLoc.longitude + toLoc.longitude) / 2,
            latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
            longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2
        }
        setStreetName(street)
        setFromLocation(fromLoc)
        setToLocation(toLoc)
        setRegion(mapRegion)
    }, [])


    function calculateAngle(coordinates) {
        let startLat = coordinates[0]["latitude"]
        let startLng = coordinates[0]["longitude"]
        let endLat = coordinates[1]["latitude"]
        let endLng = coordinates[1]["longitude"]
        let dx = endLat - startLat
        let dy = endLng - startLng

        return Math.atan2(dy, dx) * 180 / Math.PI
    }

    function zoomIn() {
        let newRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta / 2,
            longitudeDelta: region.longitudeDelta / 2
        }

        setRegion(newRegion)
        mapView.current.animateToRegion(newRegion, 200)
    }

    function zoomOut() {
        let newRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta * 2,
            longitudeDelta: region.longitudeDelta * 2
        }

        setRegion(newRegion)
        mapView.current.animateToRegion(newRegion, 200)
    }

    function renderMap() {
        const destinationMarker = () => (
            <Marker
                coordinate={toLocation}
            >
                <View
                    style={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: theme.colors.primary
                    }}
                >
                    <View
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: theme.colors.primary
                        }}
                    >
                        <Image
                            source={icons.pin}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: theme.colors.background
                            }}
                        />
                    </View>
                </View>
            </Marker>
        )

        const carIcon = () => (
            <Marker
                coordinate={fromLocation}
                anchor={{ x: 0.5, y: 0.5 }}
                flat={true}
                rotation={angle}
            >
                <Image
                    source={icons.car}
                    style={{
                        width: 40,
                        height: 40
                    }}
                />
            </Marker>
        )

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
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={5}
                        strokeColor={theme.colors.primary}
                        optimizeWaypoints={true}
                        onReady={result => {
                            setDuration(result.duration)

                            if (!isReady) {
                                // Fit route into maps
                                mapView.current.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        right: (SIZES.width / 20),
                                        bottom: (SIZES.height / 4),
                                        left: (SIZES.width / 20),
                                        top: (SIZES.height / 8)
                                    }
                                })

                                // Reposition the car
                                let nextLoc = {
                                    latitude: result.coordinates[0]["latitude"],
                                    longitude: result.coordinates[0]["longitude"]
                                }

                                if (result.coordinates.length >= 2) {
                                    let angle = calculateAngle(result.coordinates)
                                    setAngle(angle)
                                }

                                setFromLocation(nextLoc)
                                setIsReady(true)
                            }
                        }}
                    />
                    {destinationMarker()}
                    {carIcon()}
                </MapView>
            </View>
        )
    }


    function renderDestinationHeader() {
        return (
            <View
                style={{
                    position: 'absolute',
                    top: 50,
                    left: 0,
                    right: 0,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: SIZES.width * 0.9,
                        paddingVertical: SIZES.padding,
                        paddingHorizontal: SIZES.padding * 2,
                        borderRadius: SIZES.radius,
                        backgroundColor: theme.colors.background
                    }}
                >
                    <Image
                        source={icons.red_pin}
                        style={{
                            width: 30,
                            height: 30,
                            marginRight: SIZES.padding
                        }}
                    />

                    <View style={{ flex: 1 }}>
                        <Text >{streetName}</Text>
                    </View>

                    <Text >{Math.ceil(duration)} mins</Text>
                </View>
            </View>
        )
    }

    function renderDeliveryInfo() {
        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: 50,
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <View
                    style={{
                        width: SIZES.width * 0.9,
                        paddingVertical: SIZES.padding * 3,
                        paddingHorizontal: SIZES.padding * 2,
                        borderRadius: SIZES.radius,
                        backgroundColor: theme.colors.background
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* Avatar */}
                        <Image
                            source={icons.avatar_1}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25
                            }}
                        />

                        <View style={{ flex: 1, marginLeft: SIZES.padding }}>
                            {/* Name & Rating */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text >SWITECH</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        source={icons.star}
                                        style={{ width: 18, height: 18, tintColor: theme.colors.primary, marginRight: SIZES.padding }}
                                    />
                                    <Text >...</Text>
                                </View>
                            </View>

                            <Text style={{ color: theme.colors.terciario }}>SWITECH</Text>
                        </View>
                    </View>

                    {/* Buttons */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.padding * 2,
                            justifyContent: 'space-between'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                height: 50,
                                marginRight: 10,
                                backgroundColor: theme.colors.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10
                            }}
                            onPress={() => navigation.navigate("MainStore")}
                        >
                            <Text style={{ color: theme.colors.background }}>Call</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                flex: 1,
                                height: 50,
                                backgroundColor: theme.colors.secondary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10
                            }}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={{ color: theme.colors.background }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }


    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                backgroundColor={theme.colors.primary}
                barStyle="light-content"
            />
            {renderMap()}
            {renderDestinationHeader()}
            {renderDeliveryInfo()}
        </View>
    );
}
