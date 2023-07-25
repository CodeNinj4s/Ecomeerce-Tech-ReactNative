import React, { useEffect, useRef, useState } from 'react';
import { View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import icons from '../../../assets/icons/icons,'
import { db } from '../../../database/firebase';
import { onSnapshot, doc } from 'firebase/firestore';
export const ClienteTracker = () => {
    const mapView = useRef();
    const [deliveryGuyLocation, setDeliveryGuyLocation] = useState({
        latitude: 17.077792,
        longitude: -96.745168,
    });

    useEffect(() => {
        const repartidorRef = doc(db, 'Repartidor', 'gI0sUAEOk8zkxaBrkce4');

        const unsubscribe = onSnapshot(repartidorRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                setDeliveryGuyLocation(docSnapshot.data());
            } else {
                console.log('El repartidor no existe o no se encontró.');
            }
        });

        return () => unsubscribe();
    }, [deliveryGuyLocation]);

    return (
        <View style={{ flex: 1 }}>
            <MapView
                ref={mapView}
                style={{ flex: 1 }}
                provider="google"
                initialRegion={{
                    latitude: deliveryGuyLocation.latitude,
                    longitude: deliveryGuyLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={deliveryGuyLocation}
                    anchor={{ x: 0.5, y: 0.5 }}
                    flat={true}
                >
                    <View
                        style={{
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                        }}
                    >
                        <Image
                            source={icons.carroza}
                            style={{
                                width: 30,
                                height: 30,
                            }}
                        />
                    </View>
                </Marker>
            </MapView>
        </View>
    );
};
