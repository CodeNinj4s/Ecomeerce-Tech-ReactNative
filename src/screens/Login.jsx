import { StyleSheet, Text, View } from "react-native"
import Titulo from "../components/Titulo"
import { TextInput } from "@react-native-material/core";
import TouchableText from "../components/TextTouch";

export const Login = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Titulo titulo={'Iniciar Sesion'} tamaño={30} />
            </View>
            <View style={styles.form}>
                <TextInput variant="outlined" label="Correo" style={{ margin: 16 }} />
                <TextInput variant="outlined" label="Contraseña" secureTextEntry={true}
                    style={{ margin: 16 }} />

                <View style = {styles.textouch}>
                    <TouchableText>
                        <Text>¿Olvidaste la Contraseña? 🠪</Text>
                    </TouchableText>
                </View>
            </View>
            <View style={styles.footer}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9D9D9',
    },
    header: {
        flex: 1,
        alignItems: 'left',
        justifyContent: 'center',
        margin: 10,
    },
    form: {
        flex: 2,
        margin: 10,
    },
    footer: {
        flex: 1,
        backgroundColor: 'yellow'
    },
    textouch:{
        alignItems: 'flex-end',
        marginRight: 15,
    }
})