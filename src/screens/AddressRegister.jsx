import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from "@react-native-material/core";
import TouchableText from "../components/TextTouch";
import { theme } from '../core/theme.js'
import { useForm } from '../hooks/useForm';
import { addDocumento } from '../helpers/Rest';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../database/firebase';
import { addDoc, collection } from '@firebase/firestore';


export const AddressRegister = ({ navigation, route }) => {
    const { nombre, correo, pass } = route.params;

    const { onInputChange, estado, ciudad, colonia, calle, numero, cp } = useForm({
        estado: '',
        ciudad: '',
        colonia: '',
        calle: '',
        numero: '',
        cp: ''
    });

    const handleRegister = async () => {
        try{
            if(estado.trim() !== '' && ciudad.trim() !== '' && colonia.trim() !== '' && calle.trim() !== '' && numero.trim() !== '' && cp.trim() !== ''){
                const credentialas = await createUserWithEmailAndPassword(auth, correo, pass)
                const user = credentialas.user
                const id = user.uid

                const envio = await addDoc(collection(db, "Envio"), {calle: calle, ciudad: ciudad, codigoPostal: cp, colonia: colonia, estado: estado, numero: numero});
                addDocumento("Usuario", { nombre: nombre, id: id, idEnvio: envio.id, tipo: 'cliente', password: pass })

                navigation.navigate('MainStore');
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleRegister}>Dirección de envío</Text>
            <Text style={styles.description}>Registre la dirección de envío para sus productos</Text>

            <TextInput
                color={theme.colors.primary}
                inputContainerStyle={styles.input100}
                label='Estado'
                value={estado}
                onChangeText={(value) => onInputChange('estado', value)}
            />
            <TextInput
                color={theme.colors.primary}
                inputContainerStyle={styles.input100}
                label='Ciudad'
                value={ciudad}
                onChangeText={(value) => onInputChange('ciudad', value)}
            />
            <TextInput
                color={theme.colors.primary}
                inputContainerStyle={styles.input100}
                label='Colonia'
                value={colonia}
                onChangeText={(value) => onInputChange('colonia', value)}
            />
            <TextInput
                color={theme.colors.primary}
                inputContainerStyle={styles.input100}
                label='Calle'
                value={calle}
                onChangeText={(value) => onInputChange('calle', value)}
            />
            <View style={styles.col2}>
                <TextInput
                    color={theme.colors.primary}
                    inputContainerStyle={styles.input50}
                    label='Numero'
                    value={numero}
                    onChangeText={(value) => onInputChange('numero', value)}
                />
                <TextInput
                    color={theme.colors.primary}
                    inputContainerStyle={styles.input50}
                    label='Código postal'
                    value={cp}
                    onChangeText={(value) => onInputChange('cp', value)}
                />
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.textButton} onPress={handleRegister}>Continuar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    titleRegister: {
        bottom: 80,
        width: '100%',
        fontSize: 42,
        fontWeight: '500',
    },
    description: {
        bottom: 70,
        width: '100%',
        fontSize: 16
    },
    input100: {
        width: '100%',
        marginBottom: 10,
        backgroundColor: 'white'
    },
    input50: {
        minWidth: '48%',
        marginBottom: 10,
        backgroundColor: 'white'
    },
    col2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        width: '100%',
        backgroundColor: theme.colors.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 50,
        padding: 14
    },
    textButton: {
        color: 'white',
        fontSize: 16
    }
});