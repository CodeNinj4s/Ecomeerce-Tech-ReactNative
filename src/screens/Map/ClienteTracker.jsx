import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import icons from '../../../assets/icons/icons,'
import { db } from '../../../database/firebase';
import { onSnapshot, doc, getDoc, getDocs, collection, deleteDoc } from 'firebase/firestore';
import { theme } from '../../core/theme.js';
import { useNavigation } from '@react-navigation/native';

export const ClienteTracker = () => {
    const mapView = useRef();
    const [deliveryGuyLocation, setDeliveryGuyLocation] = useState({
        latitude: 17.077792,
        longitude: -96.745168,
    });
    const [destinationLocation, setDestinationLocation] = useState(null);
    const [distance, setDistance] = useState(0);
    const navigation = useNavigation();

    const fetch_destination = async () => {
        const ordenes_bd = await getDocs(collection(db, 'Orden'));
        const ordenes = [];

        ordenes_bd.forEach((orden) => {
            ordenes.push(orden.data());
        });

        setDestinationLocation({ latitude: ordenes[0].latitude, longitude: ordenes[0].longitude });
    }

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3; // Radio de la Tierra en metros
        const φ1 = (lat1 * Math.PI) / 180; // Convertir latitud 1 a radianes
        const φ2 = (lat2 * Math.PI) / 180; // Convertir latitud 2 a radianes
        const Δφ = ((lat2 - lat1) * Math.PI) / 180; // Diferencia de latitudes en radianes
        const Δλ = ((lon2 - lon1) * Math.PI) / 180; // Diferencia de longitudes en radianes
      
        const a =
          Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      
        const distance = Math.round(R * c); // Distancia en metros
        return distance;
    }

    const terminarPedido = async () => {

        const ordenes_bd = await getDocs(collection(db, 'Orden'));
        const ordenes = [];

        ordenes_bd.forEach((orden) => {
            ordenes.push(orden);
        });

        const orden_id = ordenes[0].id
        await deleteDoc(doc(db, 'Orden', orden_id));

        navigation.reset({
            index: 0,
            routes: [{ name: 'MainStore' }],
        });
    }

    useEffect(() => {
        const repartidorRef = doc(db, 'Repartidor', 'gI0sUAEOk8zkxaBrkce4');

        const unsubscribe = onSnapshot(repartidorRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                setDeliveryGuyLocation(docSnapshot.data());
            } else {
                console.log('El repartidor no existe o no se encontró.');
            }
        });

        if(destinationLocation === null){
            fetch_destination();
        }

        setDistance(calculateDistance(deliveryGuyLocation.latitude, deliveryGuyLocation.longitude, destinationLocation === null ? 0 : destinationLocation.latitude, destinationLocation === null ? 0 : destinationLocation.longitude));

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
                <Marker coordinate={destinationLocation === null ? {latitude: 0, longitude: 0} : destinationLocation}/>
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
            <View style={styles.directionView}>
                <View style={styles.directionCard}>
                    <Text style={{fontSize: 16, fontWeight: 500}}>Distancia aproximada: {distance} metros</Text>
                    <Text>El pedido únicamente puede ser finalizado si la distancia es menor a 30 </Text>
                    <TouchableOpacity disabled={!(distance < 30)} style={[styles.confirmButton, distance < 30 ? styles.buttonEnabled : styles.buttonDisabled]} onPress={() => terminarPedido()}>
                        <Text style={styles.confirmButtonText}>Terminar pedido</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    directionView: {
        position: 'absolute',
        width: '100%',
        paddingHorizontal: 20,
        bottom: 40
    },
    directionCard: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: 'white',
        levation: 5, // Para Android (añadir sombra)
        shadowColor: 'black', // Para iOS (añadir sombra)
        shadowOpacity: 0.5, // Para iOS (opacidad de la sombra)
        shadowOffset: { width: 0, height: 2 }, // Para iOS (desplazamiento de la sombra)
        shadowRadius: 4, // Para iOS (radio de la sombra)
    },
    confirmButton: {
        marginTop: 16,
        paddingVertical: 10,
        borderRadius: 12,
    },
    buttonEnabled: {
        backgroundColor: theme.colors.primary
    },
    buttonDisabled: {
        backgroundColor: 'gray'
    },
    confirmButtonText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 500,
        color: 'white'
    }
});