import { addDoc, collection } from "firebase/firestore";
import { db } from "../../database/firebase";

export const addDocumento = (tabla,objeto) => {
    const dbRef = collection(db, tabla);

    addDoc(dbRef, objeto)
        .then((docRef) => {
            console.log("Documento agregado exitosamente");
        })
        .catch((error) => {
            console.log(error);
        });
}