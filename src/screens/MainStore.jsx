import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import { ProductSlidder } from '../components/ProductSlidder';
import { TextInput } from "@react-native-material/core";
import TouchableText from "../components/TextTouch";
import {theme} from '../core/theme.js'

const CATEGORIES = [
    { id: '1', text: 'Todas', activo: true },
    { id: '2', text: 'Monitores', activo: false },
    { id: '3', text: 'Teclados', activo: false  },
    { id: '4', text: 'Ratones', activo: false  },
    { id: '5', text: 'Componentes', activo: false }
];

const PRODUCTS = [
    { id: '1', name: 'HP 24 fw with Audio Stereo', price: '2800', stock: '24'},
    { id: '2', name: 'LG 20 pl with Audio', price: '2400', stock: '14'},
    { id: '3', name: 'Samsung OLED 21 pl', price: '3400', stock: '28'},
    { id: '4', name: 'Sony 32 pl 4K', price: '4800', stock: '10'}
];

export const MainStore = ({navigation}) => {
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Tienda</Text>

            <FlatList style={styles.categories} data={CATEGORIES} horizontal showsHorizontalScrollIndicator={false} keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    if(item.activo){
                        return (
                            <View>
                                <Text style={[styles.item, styles.itemBlue]}>{item.text}</Text>
                            </View>
                        )
                    } else{
                        return (
                            <View>
                                <Text style={[styles.item, styles.itemBlack]}>{item.text}</Text>
                            </View>
                        )
                    }
                    
                }}
            />

            <ProductSlidder slidderTitle={'Monitores'} DATA={PRODUCTS}></ProductSlidder>

            <ProductSlidder slidderTitle={'Teclados'} DATA={PRODUCTS}></ProductSlidder>

            <ProductSlidder slidderTitle={'Ratones'} DATA={PRODUCTS}></ProductSlidder>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
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