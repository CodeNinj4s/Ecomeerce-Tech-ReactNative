import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { ProductSlidderHorizontal } from '../components/ProductSlidderHorizontal';
import { ProductSlidderVertical } from '../components/ProductSlidderVertical';
import TouchableText from "../components/TextTouch";
import { theme } from '../core/theme.js'
import { useEffect, useState } from 'react';
import { db } from '../../database/firebase';
import { collection, getDocs } from "firebase/firestore";;

export const MainStore = ({ navigation }) => {
    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const obtenerDatos = async () => {
            try{
                const categorias_bd = await getDocs(collection(db, "Categoria"));
                const categoriasData = [
                    { id: '0', categoria: 'Todas', activo: true }
                ];
    
                categorias_bd.forEach((cat) => {
                    categoriasData.push({ id: cat.id, categoria: cat.data().categoria, activo: false});
                });

                setCategorias(categoriasData);

                const productos_bd = await getDocs(collection(db, 'Producto'));
                const productosData = [];

                productos_bd.forEach((prod) => {
                    // console.log(prod.data().categoria._key.path.segments[6]);
                    productosData.push( { id: prod.id, data: prod.data() } );
                });

                setProductos(productosData);
            } catch(e){
                console.log(e);
            }        
        };

        obtenerDatos();
    }, []);

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
                    categorias.map((categoria) => (
                        <ProductSlidderHorizontal key={categoria.id} slidderTitle={categoria.categoria} DATA={productos.filter(producto => producto.data.categoria == categoria.id)}></ProductSlidderHorizontal>
                    ))
                )}

            </ScrollView>

                { categorias.find(item => item.id === '0' && !item.activo) && (
                    <>
                        <ProductSlidderVertical slidderTitle={categorias.find(item => item.activo === true).categoria} DATA={productos.filter(producto => producto.data.categoria == categorias.find(item => item.activo === true).id)}></ProductSlidderVertical>
                    </>
                )} 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 30
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
    }
});
