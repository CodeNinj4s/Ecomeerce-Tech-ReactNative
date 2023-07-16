import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import TouchableText from "../components/TextTouch";
import { TextInput } from "@react-native-material/core";
import { theme } from '../core/theme.js'

export const ForgetPassword = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleRegister}>Contraseña olvidada</Text>
            <View style={styles.textDescription}>
                <Text>Por favor. introduzca su dirección de correo eñectrónico. Recibirá un enlace para crear una nueva contraseña por correo electrónico</Text>
            </View>
            <TextInput style={styles.inputCard} variant="outlined" label='Correo' placeholder="Ingresa tu correo" />
            <View style={styles.viewLogin}>
                <TouchableText onPress={() => navigation.navigate('Login')}>
                    <Text>Volver </Text>
                </TouchableText>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.textButton}>Enviar</Text>
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
    },
    textDescription: {
        paddingBottom: 15,
        textAlign: 'justify',
    }
});