import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from 'react';
import { bag_bd } from '../bag/Bag_bd.js';
import { auth, db } from '../../database/firebase';
import {  getDoc, doc, onSnapshot } from "firebase/firestore";
import { theme } from '../core/theme.js';
import { useIsFocused } from '@react-navigation/native';

export const ProductBag = ({ navigation }) => {
    const [deleteOptionState, setShowDeleteOption] = useState({});
    const { get_bag, dele_from_bag, bag_data } = bag_bd();
    const [loading, set_loading] = useState(true);
    const [bag_array, set_bag_array ] = useState([]);
    const isFocused = useIsFocused();
    let total = 0;
    
    const toggleDeleteOption = (itemId) => {
        setShowDeleteOption(prevState => ({
            ...prevState,
            [itemId]: !prevState[itemId]
        }));
    }

    const get_total = () => {
        bag_array.forEach((p) => {
            total += Number(p.precio);
        })

        return total;
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                if(isFocused){
                    const update_data = onSnapshot(doc(db, 'Bolsa', auth.currentUser.uid), (querySnapshot) => {
                        const bag = (querySnapshot.data());
    
                        set_bag_array(bag.products ? Object.values(bag.products) : []);
                        set_loading(false);
                    });

                    return () => update_data();
                    // const data = await getDoc(doc(db, 'Bolsa', auth.currentUser.uid));
                    // const bag = (data.data());
    
                    // set_bag_array(bag.products ? Object.values(bag.products) : []);
                    // set_loading(false);
                }
            } catch(e){
                console.log('Error al cargar la bolsa: ' + e);
                set_loading(false);
            }
        }

        fetchData();
    }, [isFocused]);

    if (loading) {
        return <ActivityIndicator size="large" color="blue" style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}/>;
    }

    return(
        <>
            {bag_data !== undefined && bag_array.length !== 0 ? (
                <>
                    <FlatList data={ bag_array } ListHeaderComponent={<Text style={styles.title}>Mi bolsa</Text>} keyExtractor={item => item.id} numColumns={1} contentContainerStyle={styles.contentContainer}
                    renderItem={({ item }) => (
                        <View style={styles.cardProduct}>
                            { deleteOptionState[item.id] && (
                                <TouchableOpacity onPress={() => dele_from_bag(item)} style={styles.deleteOption}>
                                    <Text>Eliminar de mi bolsa</Text>
                                </TouchableOpacity>
                            )}
                            <Image source={{ uri: item.url_imagen }} style={styles.image}/>
                            <View style={styles.info}>
                                <View style={styles.nameOptions}>
                                    <Text numberOfLines={1} style={styles.productName}>{item.nombre}</Text>
                                    <TouchableOpacity onPress={() => toggleDeleteOption(item.id)}>
                                        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                                            <Icon name='dots-vertical' size={24} color='gray'/>
                                        </IconComponentProvider>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.productPrice}>{item.precio} MXN</Text>
                            </View>
                        </View>
                    )}/>
                    <View style={styles.totalContainer}>
                        <View style={styles.total}>
                            <Text style={styles.textComprar}>Total: ${get_total()} MXN</Text>
                        </View>
                        <TouchableOpacity onPress={() => console.log(total)} style={styles.btnComprar}>
                            <Text style={[styles.textComprar, styles.textWhite]}>Comprar</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <View style={styles.container}>
                    <Text style={styles.title}>Mi bolsa</Text>
                    <Image source={{ uri: 'https://static.vecteezy.com/system/resources/previews/009/417/126/original/ecommerce-icon-empty-shopping-cart-3d-illustration-free-png.png' }} style={styles.emptyCar}></Image>
                    <Text style={styles.adviseText}>¡Su bola está vacía!</Text>
                </View>
                
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        width: '100%',
        fontSize: 42,
        fontWeight: '500',
        paddingHorizontal: 20,
        marginTop: 30
    },
    cardProduct: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 8,
        backgroundColor: 'white'
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 8,
        backgroundColor: 'black'
    },
    info: {
        padding: 12
    },
    nameOptions: {
        width: 210,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    productName: {
        marginTop: 6,
        minWidth: 180,
        maxWidth: 180,
        fontSize: 16,
        fontWeight: 600,
        flexWrap: 'nowrap'
    },
    productPrice: {
        textAlign: 'right',
        width: 200,
        marginTop: 40
    },
    deleteOption: {
        position: 'absolute',
        paddingHorizontal: 18,
        paddingVertical: 10,
        zIndex: 1000,
        top: 24,
        right: 26,
        borderRadius: 8,
        backgroundColor: 'white',
        elevation: 5, // Para Android (añadir sombra)
        shadowColor: 'black', // Para iOS (añadir sombra)
        shadowOpacity: 0.5, // Para iOS (opacidad de la sombra)
        shadowOffset: { width: 0, height: 2 }, // Para iOS (desplazamiento de la sombra)
        shadowRadius: 4, // Para iOS (radio de la sombra)
    },
    emptyCar: {
        marginTop: 120,
        marginBottom: 20,
        width: 240,
        height: 240
    },
    adviseText: {
        fontSize: 18
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        width: '100%',
        paddingHorizontal: 20,
        bottom: 24
    },
    total: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginRight: 10,
        borderRadius: 50,
        backgroundColor: 'white',
        elevation: 5, // Para Android (añadir sombra)
        shadowColor: 'black', // Para iOS (añadir sombra)
        shadowOpacity: 0.5, // Para iOS (opacidad de la sombra)
        shadowOffset: { width: 0, height: 2 }, // Para iOS (desplazamiento de la sombra)
        shadowRadius: 4, // Para iOS (radio de la sombra)
    },
    btnComprar: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
        backgroundColor: theme.colors.primary,
        elevation: 5, // Para Android (añadir sombra)
        shadowColor: 'black', // Para iOS (añadir sombra)
        shadowOpacity: 0.5, // Para iOS (opacidad de la sombra)
        shadowOffset: { width: 0, height: 2 }, // Para iOS (desplazamiento de la sombra)
        shadowRadius: 4, // Para iOS (radio de la sombra)
    },
    textComprar: {
        fontSize: 18,
    },
    textWhite: {
        fontWeight: 600,
        color: 'white'
    }
});