import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from 'react';
import { bag_bd } from '../bag/Bag_bd.js';
import { auth, db } from '../../database/firebase';
import {  getDoc, doc, onSnapshot } from "firebase/firestore";
import { theme } from '../core/theme.js';
import { useIsFocused } from '@react-navigation/native';
import useCurrentLocation from '../hooks/useCurrentLocation'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import GOOGLE_API_KEY from '../helpers/maps';
import Geocoder from 'react-native-geocoding';

export const Order = ({ navigation, route}) => {
    const { total, bag_data } = route.params;
    const [coords, setCoords] = useState(null);
    const [address, setAddress] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try{
                const idEnvio = (await getDoc(doc(db, 'Usuario', auth.currentUser.uid))).data().idEnvio;
                const envio = (await getDoc(doc(db, 'Envio', idEnvio))).data();
                const address = `${envio.calle}, ${envio.colonia}, ${envio.ciudad}`;
                setAddress(address);
                console.log(address);
                Geocoder.init(GOOGLE_API_KEY);

                Geocoder.from(address).then(
                    response => {
                        const { lat, lng } = response.results[0].geometry.location;
                        setCoords({ latitude: lat, longitude: lng});
                    }
                ).catch(e => console.log('Error en la localización: ' + e));
            } catch(e){
                console.log('Error al obtener la dirección: ' + e);
            }
        }

        fetchData();
    }, []);

    // console.log(total);
    // console.log(bag_data);

    return(
        <View style={{flex: 1}}>
            {coords ? (
                <MapView style={{flex: 1}} initialRegion={{latitude: coords.latitude, longitude: coords.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01}}>
                    <Marker coordinate={coords}/>
                </MapView>
            ) : (
                <Text>Cargando...</Text>
            )}
            <View style={styles.directionView}>
                <View style={styles.directionCard}>
                    <Text style={{fontWeight: 500, fontSize: 18}}>Dirección:</Text>
                    <Text style={{fontSize: 16}}>{address}</Text>
                    <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('Tracker', coords, '951 508 1335')}>
                        <Text style={styles.confirmButtonText}>Confirmar dirección</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

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
        backgroundColor: theme.colors.primary
    },
    confirmButtonText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 500,
        color: 'white'
    }
});