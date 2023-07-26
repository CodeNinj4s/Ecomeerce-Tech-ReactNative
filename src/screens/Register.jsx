import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import TouchableText from "../components/TextTouch";
import { TextInput } from "@react-native-material/core";
import { theme } from '../core/theme.js'
import { useForm } from '../hooks/useForm';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../database/firebase';
import { addDocumento } from '../helpers/Rest';

export const Register = ({ navigation }) => {

    const { onInputChange, correo, contraseña, nombre, numero } = useForm({
        nombre: '',
        correo: '',
        contraseña: '',
        numero: ''
    })

    const handleRegister = async () => {
        try {

            if (nombre.trim() !== '') {
                navigation.navigate('AddressRegister', { nombre: nombre, correo: correo, pass: contraseña, numero_tel: numero });
            }

        } catch (e) {
            console.log(e)
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.titleRegister}>Registrarse</Text>
            <TextInput
                style={styles.inputCard}
                variant="outlined"
                label='Nombre'
                placeholder="Aquí va tu nombrecito lindo uwu"
                value={nombre}
                onChangeText={(value) => onInputChange('nombre', value)}
            />
            <TextInput style={styles.inputCard}
                variant="outlined"
                label='Correo'
                placeholder="Aquí va tu correo jiji"
                value={correo}
                onChangeText={(value) => onInputChange('correo', value)}
            />
            <TextInput
                style={styles.inputCard}
                variant="outlined"
                label='Contraseña'
                placeholder="Ahora tu contraseña poderosa"
                value={contraseña}
                onChangeText={(value) => onInputChange('contraseña', value)}
                secureTextEntry={true}
            />
            <TextInput
                style={styles.inputCard}
                variant="outlined"
                label='Numero'
                placeholder="Y por último tu número: 9511235678"
                value={numero}
                onChangeText={(value) => onInputChange('numero', value)}
            />
            <View style={styles.viewLogin}>
                <TouchableText onPress={() => navigation.navigate('Login')}>
                    <Text>¿Ya tienes una cuenta?</Text>
                </TouchableText>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.textButton} onPress={handleRegister}>Registrarse</Text>
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
        bottom: 100,
        width: '100%',
        fontSize: 42,
        fontWeight: '500',
        marginTop: '25%'
    },
    inputCard: {
        width: '100%',
        borderRadius: 8,
        marginBottom: 12,
        color: 'gray',
    },
    left: {
        width: '100%',
        justifyContent: 'right'
    },
    viewLogin: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 40
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