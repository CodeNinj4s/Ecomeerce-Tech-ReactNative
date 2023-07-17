import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import TouchableText from "../components/TextTouch";
import { TextInput } from "@react-native-material/core";
import {theme} from '../core/theme.js'

export const Register = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.titleRegister}>Registrarse</Text>
            <TextInput style={styles.inputCard} variant="outlined" label='Nombre' placeholder="Aquí va tu nombrecito lindo uwu"/>
            <TextInput style={styles.inputCard} variant="outlined" label='Correo' placeholder="Aquí va tu nombrecito lindo uwu"/>
            <TextInput style={styles.inputCard} variant="outlined" label='Contraseña' placeholder="Aquí va tu nombrecito lindo uwu"/>
            <View style={styles.viewLogin}>
                <TouchableText onPress={() => navigation.navigate('Login')}>
                    <Text>¿Ya tienes una cuenta?</Text>
                </TouchableText>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.textButton} onPress={() => navigation.navigate('AddressRegister')}>Registrarse</Text>
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