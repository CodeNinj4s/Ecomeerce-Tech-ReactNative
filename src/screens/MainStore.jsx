import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { ProductSlidderHorizontal } from '../components/ProductSlidderHorizontal';
import { ProductSlidderVertical } from '../components/ProductSlidderVertical';
import TouchableText from "../components/TextTouch";
import { theme } from '../core/theme.js'

const PRODUCTS = [
    { id: '1', name: 'HP 24 fw with Audio Stereo', price: '2800', stock: '24'},
    { id: '2', name: 'LG 20 pl with Audio', price: '2400', stock: '14'},
    { id: '3', name: 'Samsung OLED 21 pl', price: '3400', stock: '28'},
    { id: '4', name: 'Sony 32 pl 4K', price: '4800', stock: '10'},
    { id: '5', name: 'HP 24 fw with Audio Stereo', price: '2800', stock: '24'},
    { id: '6', name: 'LG 20 pl with Audio', price: '2400', stock: '14'},
    { id: '7', name: 'Samsung OLED 21 pl', price: '3400', stock: '28'},
    { id: '8', name: 'Sony 32 pl 4K', price: '4800', stock: '10'}
];

const CATEGORIES = [
    { id: '1', text: 'Todas', activo: true, data: PRODUCTS },
    { id: '2', text: 'Monitores', activo: false, data: PRODUCTS },
    { id: '3', text: 'Teclados', activo: false, data: PRODUCTS },
    { id: '4', text: 'Ratones', activo: false, data: PRODUCTS },
    { id: '5', text: 'Componentes', activo: false, data: PRODUCTS }
];

export const MainStore = ({ navigation }) => {
    return (
        <View>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Tienda</Text>

                <FlatList style={styles.categories} data={CATEGORIES} horizontal showsHorizontalScrollIndicator={false} keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        if (item.activo) {
                            return (
                                <View>
                                    <TouchableText onPress={() => navigation.navigate('ProductBag')}>
                                        <Text style={[styles.item, styles.itemBlue]}>{item.text}</Text>
                                    </TouchableText>
                                </View>
                            )
                        } else {
                            return (
                                <View>
                                    <TouchableText>
                                        <Text style={[styles.item, styles.itemBlack]}>{item.text}</Text>
                                    </TouchableText>
                                </View>
                            )
                        }

                    }}
                />

                {CATEGORIES.find(item => item.id === '1' && item.activo) && (
                    <>
                        <ProductSlidderHorizontal slidderTitle={'Monitores'} DATA={PRODUCTS}></ProductSlidderHorizontal>

                        <ProductSlidderHorizontal slidderTitle={'Teclados'} DATA={PRODUCTS}></ProductSlidderHorizontal>

                        <ProductSlidderHorizontal slidderTitle={'Ratones'} DATA={PRODUCTS}></ProductSlidderHorizontal>

                        <ProductSlidderHorizontal slidderTitle={'Componentes'} DATA={PRODUCTS}></ProductSlidderHorizontal>
                    </>
                )}


            </ScrollView>

                { CATEGORIES.find(item => item.id === '1' && !item.activo) && (
                    <>
                        <ProductSlidderVertical slidderTitle={CATEGORIES.find(item => item.activo === true).text} DATA={CATEGORIES.find(item => item.activo === true).data}></ProductSlidderVertical>
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