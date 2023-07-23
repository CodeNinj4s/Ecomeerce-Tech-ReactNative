import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../database/firebase.js';

export const bag = () => {
    const [product_bag, setBag] = useState([]);

    useEffect(() => {
        load_bag();
    }, [])

    const load_bag = async () => {
        try{
            const saved_bag = await AsyncStorage.getItem(`bag-${auth.currentUser.email}`);
            if(saved_bag !== null){
                setBag(JSON.parse(saved_bag));
            }
        } catch(e){
            console.log('Error al cargar la bolsa: ' + e);
        }
    };
    
    const add_to_bag = async (producto) => {
        const new_bag = [ ...product_bag, producto ];
        setBag(new_bag);
        save_bag(new_bag);
        console.log(new_bag);
    };
    
    const delete_from_bag = async (producto) => {
        const new_bag = product_bag.filter(item => item.id !== producto.id);
        setBag(new_bag);
        save_bag(new_bag);
    };
    
    const save_bag = async (updated_bag) => {
        try{
            await AsyncStorage.setItem(`bag-${auth.currentUser}`, JSON.stringify(updated_bag));
        } catch(e){
            console.log('Error al guardar la bolsa: ', e);
        }
    }
    
    const get_total = () => {
        return product_bag.reduce((total, producto) => total + producto.data.precio);
    }
    
    return{
        product_bag,
        load_bag,
        add_to_bag,
        delete_from_bag,
        save_bag,
        get_total
    };
};