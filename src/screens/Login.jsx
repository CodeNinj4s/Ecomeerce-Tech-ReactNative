import { StyleSheet, Text, View } from "react-native"
import Titulo from "../components/Titulo"
import { TextInput } from "@react-native-material/core";
import TouchableText from "../components/TextTouch";
import { Stack, Button } from "@react-native-material/core";
import { theme } from "../core/theme";

export const Login = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Titulo titulo={'Iniciar Sesion'} tamaño={30} />
            </View>
            <View style={styles.form}>
                <Stack spacing={25} style={[{ margin: 2 }, { marginTop: 25 }]}>

                    <TextInput variant="outlined" label="Correo" style={{ margin: 16 }} />
                    <TextInput variant="outlined" label="Contraseña" secureTextEntry={true}
                        style={{ margin: 16 }} />

                    <View style={styles.textouch}>
                        <TouchableText onPress={() => navigation.navigate('Register')}>
                            <Text>¿No tienes una cuenta? 🠪</Text>
                        </TouchableText>
                    </View>
                    <View style={styles.textouch}>
                        <TouchableText onPress={() => navigation.navigate('ForgetPassword')}>
                            <Text>¿Olvidaste tu contraseña? 🠪</Text>
                        </TouchableText>
                    </View>
                    <Button
                        titleStyle={{ fontSize: 17 }}
                        contentContainerStyle={{ height: 50 }}
                        title="Iniciar Sesión"
                        color={theme.colors.primary}
                        uppercase={false}
                    />
                </Stack>

            </View>
            <View style={styles.footer}>
                <TouchableText>
                    <Text>O inicia sesion con una red social</Text>
                </TouchableText>

                <View style={styles.icons}>
                    <View style={styles.facebook}>
                    <Text>F</Text>
                    </View>
                    <View style={styles.google}>
                        <Text>G</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9D9D9',
    },
    icons:{
        marginTop: '5%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width : '70%',
    },
    facebook:{
        width:90,
        height:60,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    google:{
        width:90,
        height:60,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },


    header: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 10,
    },
    form: {
        flex: 2,
        margin: 10,
    },
    footer: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    textouch: {
        alignItems: 'flex-end',
        marginRight: 15,
        marginBottom: 10
    }
})