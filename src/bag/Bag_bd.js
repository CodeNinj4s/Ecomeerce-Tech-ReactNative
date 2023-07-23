import { useEffect, useState } from 'react';
import { auth, db } from '../../database/firebase';
import { getDoc, setDoc, updateDoc, doc, deleteField } from "firebase/firestore";

export const bag_bd = () => {
    const [bag_data, set_bag] = useState([]);

    useEffect(() => {
        get_bag();
    },[]);

    const add_to_bag = async (producto) => {
        try{
            const ref = doc(db, 'Bolsa', auth.currentUser.uid);
            const document = await getDoc(ref);

            if(!document.exists()){
                await setDoc(ref, { products: {
                    [producto.id]: {
                        id: producto.id,
                        cantidad: 1,
                        precio: producto.data.precio,
                        nombre: producto.data.nombre,
                        url_imagen: producto.data.url_imagen,
                        subtotal: Number(producto.data.precio)
                    }
                } });
            } else{
                await updateDoc(ref, { 
                    [`products.${producto.id}`]: {
                        id: producto.id,
                        cantidad: 1,
                        precio: producto.data.precio,
                        nombre: producto.data.nombre,
                        url_imagen: producto.data.url_imagen,
                        subtotal: Number(producto.data.precio)
                    }
                });
            }
        } catch(e){
            console.log('Error al agregar al producto: ' + e);
        }
    }

    const get_bag = async () => {
        try{
            const data = await getDoc(doc(db, 'Bolsa', auth.currentUser.uid));
            set_bag(data.data());
            return data;
        } catch(e){
            console.log('Error al obtener el carrito: ' + e);
        }
    }

    const update_product_amount = async (producto, cantidad) => {
        try{
            const ref = doc(db, 'Bolsa', auth.currentUser.uid);
            const document = await getDoc(ref);

            await updateDoc(ref, { 
                [`products.${producto.id}`]: {
                    id: producto.id,
                    cantidad: Number(cantidad),
                    precio: producto.precio,
                    nombre: producto.nombre,
                    url_imagen: producto.url_imagen,
                    subtotal: Number(producto.precio) * Number(cantidad)
                }
            });
        } catch(e){
            console.log('Error al acutalizar la cantidad de productos: ' + e);
        }
    }

    const dele_from_bag = async (producto) => {
        try{
            const data = await getDoc(doc(db, 'Bolsa', auth.currentUser.uid));
            const new_data = { ...data.data().products }

            delete new_data[producto.id];

            await updateDoc(doc(db, 'Bolsa', auth.currentUser.uid), {
                products: new_data
            });
        } catch(e) {
            console.log('Error al eliminar producto del carrito:' + e);
        }
    }

    return{
        bag_data,
        bag_bd,
        add_to_bag,
        get_bag,
        update_product_amount,
        dele_from_bag
    };
}