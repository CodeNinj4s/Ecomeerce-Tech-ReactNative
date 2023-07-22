import React, { createContext, useEffect, useState } from 'react';
import { auth, db } from '../../database/firebase';
import { collection, getDoc, query, setDoc, updateDoc, where, doc } from "firebase/firestore";

export const bag_bd = () => {
    const [bag_data, set_bag] = useState([]);

    useEffect(() => {
        get_bag();
    },[]);

    const add_to_bag = async (producto) => {
        try{
            const ref = doc(db, 'Bolsa', auth.currentUser.uid);
            const document = await getDoc(ref);
    
            console.log(document);

            if(!document.exists()){
                await setDoc(ref, { products: [producto] });
            } else{
                const products = document.data().products;
                products.push(producto);
                await updateDoc(ref, { products: products });
            }
        } catch(e){
            console.log('Error al agregar al producto: ' + e);
        }
    }

    const get_bag = async () => {
        try{
            const data = await getDoc(doc(db, 'Bolsa', auth.currentUser.uid));
            // console.log(data.data());
            set_bag(data.data());
        } catch(e){
            console.log('Error al obtener el carrito: ' + e);
        }
    }

    return{
        bag_data,
        bag_bd,
        add_to_bag,
        get_bag
    };
}