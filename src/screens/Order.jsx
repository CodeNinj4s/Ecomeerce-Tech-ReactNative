import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { auth, db } from '../../database/firebase';
import { getDoc, doc, getDocs, deleteDoc } from "firebase/firestore";
import { theme } from '../core/theme.js';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import GOOGLE_API_KEY from '../helpers/maps';
import Geocoder from 'react-native-geocoding';
import { collection, addDoc } from 'firebase/firestore';

export const Order = ({ navigation, route }) => {
    const mapView = useRef();
    const { total, bag_data } = route.params;
    const [coords, setCoords] = useState(null);
    const [address, setAddress] = useState();
    const [region, setRegion] = useState();
    const numero = "951 50 81335"

    const handleMapPress = async (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        const response = await Geocoder.from(latitude, longitude);
        const address = response.results[0].formatted_address;

        setCoords({ latitude: latitude, longitude: longitude });
        setRegion({ latitude: latitude, longitude: longitude, latitudeDelta: region.latitudeDelta, longitudeDelta: region.longitudeDelta });
        setAddress(address);
    }

    const zoomIn = () => {
        let newRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta / 2,
            longitudeDelta: region.longitudeDelta / 2
        }

        setRegion(newRegion)
        mapView.current.animateToRegion(newRegion, 200)
    }

    const zoomOut = () => {
        let newRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta * 2,
            longitudeDelta: region.longitudeDelta * 2
        }

        setRegion(newRegion)
        mapView.current.animateToRegion(newRegion, 200)
    }

    const make_order = async () => {
        const querySnapshot = await getDocs(collection(db, 'Repartidor'));
        const repartidores = [];
        const telefono = (await getDoc(doc(db, 'Usuario', auth.currentUser.uid))).data().telefono;

        querySnapshot.forEach((doc) => {
            repartidores.push(doc);
        });

        const max = repartidores.length - 1;
        const index = Math.random() * (max - 0) + 0;
        const idRepartidor = repartidores[index].id;

        const orden = await addDoc(collection(db, 'Orden'), {
            fecha: new Date().toUTCString(),
            idCliente: auth.currentUser.uid,
            latitude: coords.latitude,
            longitude: coords.longitude,
            idRepartidor: idRepartidor,
            productos: bag_data.products,
            total: total
        });

        await deleteDoc(doc(db, 'Bolsa', auth.currentUser.uid));
        send_message('52' + telefono);

        navigation.navigate('Tracker', { coordenadas: coords, numero: '951 508 1335' })
    }

    const send_message = (telefono) => {
        var botId = '110126298832457';
        var phoneNbr = telefono;
        var bearerToken = 'EAACS6Mbj7RYBO4JcP7it21S8BHuBTTuUXheVSFzhIazXRfmxDlj9pXAjdVxYg22HOvQVuVOKWfJ3Mj3h1q1KObjNeJr3oAI9IrU9pXogVDlMi42tK9fu1QuRHEfhEIDzlROtQktF9wHLZCcusJOfTZB3C9gm8Y1mxODW1hcbBznTHzKIu7HfT0bBSN41Ke8wG5IWY8q7IByCxRsBsZD';
        var url = 'https://graph.facebook.com/v17.0/' + botId + '/messages';

        var data = {
            messaging_product: 'whatsapp',
            to: phoneNbr,
            type: 'template',
            template: {
                name: 'hello_world',
                language: { code: 'en_US' }
            }
        };

        var postReq = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + bearerToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            json: true
        };

        fetch(url, postReq)
            .then(data => {
                return data.json()
            })
            .then(res => {
                console.log(res)
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const idEnvio = (await getDoc(doc(db, 'Usuario', auth.currentUser.uid))).data().idEnvio;
                const envio = (await getDoc(doc(db, 'Envio', idEnvio))).data();
                const address = `${envio.calle} ${envio.numero}, ${envio.colonia}, ${envio.codigoPostal} ${envio.ciudad}, ${envio.estado}`;
                setAddress(address);

                Geocoder.init(GOOGLE_API_KEY);

                const response = await Geocoder.from(address)
                const { lat, lng } = response.results[0].geometry.location;
                setCoords({ latitude: lat, longitude: lng });
                setRegion({ latitude: lat, longitude: lng, latitudeDelta: 0.01, longitudeDelta: 0.01 });
            } catch (e) {
                console.log('Error al obtener la dirección: ' + e);
            }
        }

        fetchData();
    }, []);


    return (
        <View style={{ flex: 1 }}>
            {coords ? (
                <MapView ref={mapView} style={{ flex: 1 }} initialRegion={region} onPress={handleMapPress}>
                    <Marker coordinate={coords} />
                </MapView>
            ) : (
                <Text>Cargando...</Text>
            )}

            <TouchableOpacity style={[styles.zoomButtons, { right: 20, bottom: 280 }]} onPress={() => zoomIn()}>
                <Text style={{ fontSize: 18 }}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.zoomButtons, { right: 20, bottom: 210 }]} onPress={() => zoomOut()}>
                <Text style={{ fontSize: 18 }}>-</Text>
            </TouchableOpacity>

            <View style={styles.directionView}>
                <View style={styles.directionCard}>
                    <Text style={{ fontWeight: 500, fontSize: 18 }}>Dirección:</Text>
                    <Text style={{ fontSize: 16 }}>{address}</Text>
                    <TouchableOpacity style={styles.confirmButton} onPress={() => make_order()}>
                        <Text style={styles.confirmButtonText}>Confirmar dirección</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    zoomButtons: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: 'white'
    },
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