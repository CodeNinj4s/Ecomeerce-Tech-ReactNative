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
        const getLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();

                if (status !== 'granted') {
                    console.log('Permission to access location was denied.');
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;



                setCurrentLocationData({
                    streetName: 'Ruiz cortines',
                    gps: {
                        latitude,
                        longitude,
                    },
                });
            } catch (error) {
                console.log('Error al obtener la ubicación:', error);
            }
        };

        getLocation();
    }, []);

    return currentLocationData;
};

export default useCurrentLocation;
