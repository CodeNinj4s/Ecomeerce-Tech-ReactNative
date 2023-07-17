import React from 'react'
import {StyleSheet, Text, View, FlatList} from 'react-native';

export const ProductSlidderHorizontal = ({ slidderTitle, DATA }) => {
    return (
        <View style={styles.categorieView}>
            <Text style={styles.categorieTitle}>{slidderTitle}</Text>
            <FlatList data={DATA} horizontal showsHorizontalScrollIndicator={false} keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View style={styles.cardProduct}>
                    <View style={styles.image}></View>
                    <Text numberOfLines={1} style={styles.productName}>{item.name}</Text>
                    <Text>{item.price} MXN</Text>
                    <Text>Stock: {item.stock}</Text>
                </View>
            )}/>
        </View>
    )
}

const styles = StyleSheet.create({
    categorieView: {
        width: '100%',
        marginTop: 20
    },
    categorieTitle: {
        fontSize: 32,
        fontWeight: 600,
        paddingLeft: 20
    },
    cardProduct: {
        padding: 12,
        marginHorizontal: 6,
        borderRadius: 8,
        backgroundColor: 'white'
    },
    image: {
        height: 120,
        width: 150,
        backgroundColor: 'black'
    },
    productName: {
        marginTop: 6,
        maxWidth: 150,
        fontSize: 16,
        fontWeight: 600,
        flexWrap: 'nowrap'
    }
});