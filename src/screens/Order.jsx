import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from 'react';
import { bag_bd } from '../bag/Bag_bd.js';
import { auth, db } from '../../database/firebase';
import {  getDoc, doc, onSnapshot } from "firebase/firestore";
import { theme } from '../core/theme.js';
import { useIsFocused } from '@react-navigation/native';

export const Order = ({ navigation, route}) => {
    const { total, bag_data } = route.params;

    console.log(total);
    console.log(bag_data);

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Orden</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    title: {
        width: '100%',
        fontSize: 42,
        fontWeight: '500',
        paddingHorizontal: 20,
        marginTop: 30
    },
});