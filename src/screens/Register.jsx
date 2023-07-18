import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import TouchableText from "../components/TextTouch";
import { TextInput } from "@react-native-material/core";
import { theme } from '../core/theme.js'
import { useForm } from '../hooks/useForm';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../database/firebase';
import { addDocumento } from '../helpers/Rest';

export const Register = ({ navigation }) => {

    const { onInputChange, correo, contraseña, nombre } = useForm({
        nombre: '',
        correo: '',
        contraseña: '',
    })

    const handleRegister = async () => {
        try {

            if (nombre.trim() !== '') {
                const credentialas = await createUserWithEmailAndPassword(auth, correo, contraseña)
                const user = credentialas.user
                const id = user.uid
                addDocumento("Usuario", { nombre: nombre, id: id })
                navigation.navigate('AddressRegister', { nombre: nombre, id: id });
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
                placeholder="Aquí va tu nombrecito lindo uwu"
                value={correo}
                onChangeText={(value) => onInputChange('correo', value)}
            />
            <TextInput
                style={styles.inputCard}
                variant="outlined"
                label='Contraseña'
                placeholder="Aquí va tu nombrecito lindo uwu"
                value={contraseña}
                onChangeText={(value) => onInputChange('contraseña', value)}
                secureTextEntry={true}

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