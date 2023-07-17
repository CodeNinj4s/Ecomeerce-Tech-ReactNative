import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { TextInput } from "@react-native-material/core";
import TouchableText from "../components/TextTouch";
import {theme} from '../core/theme.js'


export const AddressRegister = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.titleRegister}>Dirección de envío</Text>
            <Text style={styles.description}>Registre la dirección de envío para sus productos</Text>
            
            <TextInput color={theme.colors.primary} inputContainerStyle={styles.input100} label='Estado' placeholder='Ejemplo: Oaxaca'/>
            <TextInput color={theme.colors.primary} inputContainerStyle={styles.input100} label='Ciudad' placeholder='Ejemplo: Oaxaca de Juárez'/>
            <TextInput color={theme.colors.primary} inputContainerStyle={styles.input100} label='Colonia' placeholder='Ejemplo: Centro'/>
            <TextInput color={theme.colors.primary} inputContainerStyle={styles.input100} label='Calle' placeholder='Ejemplo: Independencia'/>
            <View style={styles.col2}>
                <TextInput color={theme.colors.primary} inputContainerStyle={styles.input50} label='Numero' placeholder='Ejemplo: 147'/>
                <TextInput color={theme.colors.primary} inputContainerStyle={styles.input50} label='Código postal' placeholder='Ejemplo: 68001'/>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.textButton} onPress={() => navigation.navigate('AddressRegister')}>Continuar</Text>
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