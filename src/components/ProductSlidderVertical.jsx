import React from 'react'
import {StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from '../core/theme.js'

export const ProductSlidderVertical = ({ slidderTitle, DATA }) => {
    return (
        <FlatList data={ DATA } ListHeaderComponent={<Text style={styles.categorieTitle}>{slidderTitle}</Text>} keyExtractor={item => item.id} numColumns={2} contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
            <View style={styles.cardProduct}>
                <Image source={{ uri: item.data.url_imagen }} style={styles.image}/>
                <Text numberOfLines={1} style={styles.productName}>{item.data.nombre}</Text>
                <Text>{item.data.precio} MXN</Text>
                <View style={styles.stockAddView}>
                    <Text>Stock: {item.data.cantidad}</Text>
                    <TouchableOpacity>
                        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                            <Icon name='plus-circle' size={24} color={theme.colors.primary}/>
                        </IconComponentProvider>
                    </TouchableOpacity>
                </View>
            </View>
        )}/>
    )
}

const styles = StyleSheet.create({
    categorieTitle: {
        width: '100%',
        fontSize: 32,
        fontWeight: 600,
        paddingLeft: 10,
    },
    cardProduct: {
        padding: 12,
        marginVertical: 6,
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
    },
    contentContainer: {
        padding: 6,
        flexDirection: 'column',
        paddingHorizontal: 10,
    },
    stockAddView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});