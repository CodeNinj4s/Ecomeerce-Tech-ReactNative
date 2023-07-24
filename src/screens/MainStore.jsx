import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { ProductSlidderHorizontal } from '../components/ProductSlidderHorizontal';
import { ProductSlidderVertical } from '../components/ProductSlidderVertical';
import TouchableText from "../components/TextTouch";
import { theme } from '../core/theme.js'
import { useEffect, useState } from 'react';
import { db } from '../../database/firebase';
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useIsFocused } from '@react-navigation/native';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export const MainStore = ({ navigation }) => {
    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);
    const isFocused = useIsFocused();
    
    useEffect(() => {
        const obtenerDatos = async () => {
            try{
                if(isFocused){
                    const categorias_bd = await getDocs(collection(db, "Categoria"));
                    const categoriasData = [
                        { id: '0', categoria: 'Todas', activo: true }
                    ];
        
                    categorias_bd.forEach((cat) => {
                        categoriasData.push({ id: cat.id, categoria: cat.data().categoria, activo: false});
                    });
    
                    setCategorias(categoriasData);
                    
                    const productos_bd = onSnapshot(collection(db, 'Producto'), (querySnapshot) => {
                        const productosData = [];

                        querySnapshot.forEach((prod) => {
                            productosData.push( { id: prod.id, data: prod.data() } );
                        });

                        setProductos(productosData);
                    });
    
                    return () => productos_bd();
                }
            } catch(e){
                console.log(e);
            }        
        };

        obtenerDatos();
    }, [isFocused]);

    const handleUpdateActivo = (id) => {
        setCategorias((prevCategorias) => {
            return prevCategorias.map((categoria) => {
                if(categoria.id === id){
                    return { ...categoria, activo: true };
                } else{
                    return { ...categoria, activo: false }
                }
            });
        });
    };

    return (
        <View>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Tienda</Text>

                <FlatList style={styles.categories} data={categorias} horizontal showsHorizontalScrollIndicator={false} keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return(
                            <View>
                                <TouchableText onPress={() => handleUpdateActivo(item.id)}>
                                    <Text style={[styles.item, item.activo ? styles.itemBlue : styles.itemBlack]}>{item.categoria}</Text>
                                </TouchableText>
                            </View>
                        );
                    }}
                />

                {categorias.find(item => item.id === '0' && item.activo) && (
                    categorias.map((categoria) => ( categoria.id !== '0' ? <ProductSlidderHorizontal key={categoria.id} slidderTitle={categoria.categoria} DATA={productos.filter(producto => producto.data.categoria == categoria.id)}></ProductSlidderHorizontal> : <></> ))
                )}

                { categorias.find(item => item.id === '0' && !item.activo) && (
                    <ProductSlidderVertical slidderTitle={categorias.find(item => item.activo === true).categoria} DATA={productos.filter(producto => producto.data.categoria == categorias.find(item => item.activo === true).id)}></ProductSlidderVertical>
                )} 

            </ScrollView>


            <TouchableOpacity style={styles.orderButton}>
                <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                    <Icon name='truck-fast' size={48} color='white'/>
                </IconComponentProvider>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bagButton}  onPress={() => navigation.navigate('ProductBag') }>
                <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                    <Icon name='shopping-outline' size={48} color='white'/>
                </IconComponentProvider>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignContent: 'center',
        paddingBottom: 100
    },
    title: {
        width: '100%',
        fontSize: 42,
        fontWeight: '500',
        paddingHorizontal: 20,
        marginTop: 30
    },
    categories: {
        maxHeight: 36,
    },
    item: {
        borderRadius: 50,
        paddingHorizontal: 14,
        paddingVertical: 6,
        marginHorizontal: 6,
        color: 'white',
    },
    itemBlue: {
        backgroundColor: theme.colors.primary
    },
    itemBlack: {
        backgroundColor: 'black'
    },
    bagButton: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: 76,
        height: 76,
        borderRadius: 50,
        bottom: 12,
        right: 12,
        backgroundColor: theme.colors.primary,
        elevation: 5, // Para Android (añadir sombra)
        shadowColor: 'black', // Para iOS (añadir sombra)
        shadowOpacity: 0.5, // Para iOS (opacidad de la sombra)
        shadowOffset: { width: 0, height: 2 }, // Para iOS (desplazamiento de la sombra)
        shadowRadius: 4, // Para iOS (radio de la sombra)
    },
    orderButton: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: 76,
        height: 76,
        borderRadius: 50,
        bottom: 100,
        right: 12,
        backgroundColor: theme.colors.primary,
        elevation: 5, // Para Android (añadir sombra)
        shadowColor: 'black', // Para iOS (añadir sombra)
        shadowOpacity: 0.5, // Para iOS (opacidad de la sombra)
        shadowOffset: { width: 0, height: 2 }, // Para iOS (desplazamiento de la sombra)
        shadowRadius: 4, // Para iOS (radio de la sombra)
    }
});
