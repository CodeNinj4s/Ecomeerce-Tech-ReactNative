import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const useCurrentLocation = () => {
    const [currentLocationData, setCurrentLocationData] = useState({
        streetName: '',
        gps: {
            latitude: 0,
            longitude: 0,
        },
    });

    useEffect(() => {
        let isMounted = true;
        let updateInterval;

        const getLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();

                if (status !== 'granted') {
                    console.log('Permission to access location was denied.');
                    return;
                }

                const updateLocation = async () => {
                    const location = await Location.getCurrentPositionAsync({});
                    const { latitude, longitude } = location.coords;

                    // Geocodificación inversa para obtener el nombre de la calle
                    const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
                    const streetName = reverseGeocode.length > 0 ? reverseGeocode[0].street : '';

                    if (isMounted) {
                        setCurrentLocationData({
                            streetName,
                            gps: {
                                latitude,
                                longitude,
                            },
                        });
                    }
                };

                // Actualiza la ubicación inicial
                await updateLocation();

                updateInterval = setInterval(updateLocation, 5000);
            } catch (error) {
                console.log('Error al obtener la ubicación:', error);
            }
        };

        getLocation();

        return () => {
            isMounted = false;
            clearInterval(updateInterval);
        };
    }, []);

    return currentLocationData;
};

export default useCurrentLocation;
