import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import TouchableText from "../components/TextTouch";
import { theme } from '../core/theme.js'
import { useEffect, useState } from 'react';
import { bag_bd } from '../bag/Bag_bd.js';

const PRODUCTS = [
    { id: '1', name: 'HP 24 fw with Audio Stereo 4K UHD', price: '2800', stock: '24'},
    { id: '2', name: 'LG 20 pl with Audio', price: '2400', stock: '14'},
    { id: '3', name: 'Samsung OLED 21 pl', price: '3400', stock: '28'},
    { id: '4', name: 'Sony 32 pl 4K', price: '4800', stock: '10'},
    { id: '5', name: 'HP 24 fw with Audio Stereo', price: '2800', stock: '24'},
    { id: '6', name: 'LG 20 pl with Audio', price: '2400', stock: '14'},
    { id: '7', name: 'Samsung OLED 21 pl', price: '3400', stock: '28'},
    { id: '8', name: 'Sony 32 pl 4K', price: '4800', stock: '10'}
];

export const ProductBag = ({ navigation }) => {
    const [deleteOptionState, setShowDeleteOption] = useState({});
    const { get_bag, bag_data } = bag_bd();
    
    const toggleDeleteOption = (itemId) => {
        setShowDeleteOption(prevState => ({
            ...prevState,
            [itemId]: !prevState[itemId]            
        }));
    }

    console.log(bag_data);

    return(
        <>
            {bag_data !== undefined ? (
                <FlatList data={ bag_data.products } ListHeaderComponent={<Text style={styles.title}>Mi bolsa</Text>} keyExtractor={item => item.id} numColumns={1} contentContainerStyle={styles.contentContainer}
                renderItem={({ item }) => (
                    <View style={styles.cardProduct}>
                        { deleteOptionState[item.id] && (
                            <View style={styles.deleteOption}>
                                <Text>Eliminar de mi bolsa</Text>
                            </View>
                        )}
                        <Image source={{ uri: item.data.url_imagen }} style={styles.image}/>
                        <View style={styles.info}>
                            <View style={styles.nameOptions}>
                                <Text numberOfLines={1} style={styles.productName}>{item.data.nombre}</Text>
                                <TouchableOpacity onPress={() => toggleDeleteOption(item.id)}>
                                    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                                        <Icon name='dots-vertical' size={24} color='gray'/>
                                    </IconComponentProvider>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.productPrice}>{item.data.precio} MXN</Text>
                        </View>
                    </View>
                )}/>
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
    }
});