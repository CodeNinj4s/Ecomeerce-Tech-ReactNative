import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import Titulo from '../components/Titulo';
import { TextInput } from '@react-native-material/core';
import TouchableText from '../components/TextTouch';
import { Stack, Button } from '@react-native-material/core';
import { theme } from '../core/theme';
import { useForm } from '../hooks/useForm';
import { auth } from '../../database/firebase';
import { signInWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
//Para el inicio de sesión con facebook
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { FacebookAuthProvider, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
//Para el inicio de sesión con Google
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
//Para Google
GoogleSignin.configure({
    webClientId: '784715387338-h33ji35l0n8q0kdsav0g2piaghbpl95c.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});

export const Login = ({ navigation }) => {
    //Variable para guardar el token 
    const [fbAccessToken, setFbAccessToken] = React.useState(null);

    //Para google
    const [userInfo, setUserInfo] = React.useState(null);

    const { onInputChange, correo, contraseña } = useForm({
        correo: 'njr01397@gmail.com',
        contraseña: '12345678',
    });

    const handleLogin = async () => {

        try {
            const userCredential = await signInWithEmailAndPassword(auth, correo, contraseña);
            const user = userCredential.user;
            console.log('Exito xd')
            // console.log(user);
            navigation.reset({

                index: 0,
                routes: [{ name: 'MainStore' }],
            });
        } catch (err) {
            console.log('Erroe al iniciar sesion', err)
        }

    };

    //Metodo de inicio de sesion con facebook
    const signInF = async (error, result) => {
        //const permissions = ['public_profile', 'email'];
        //const result = await LoginManager.logInWithPermissions(permissions);
        if (error) {
            console.log("login has error: " + result.error);
        } else if (result.isCancelled) {
            console.log("login is cancelled." + error + "-->" + result.error);
        } else {/*
            data = await AccessToken.getCurrentAccessToken()
            console.log(data.accessToken.toString())
            setFbAccessToken(data.accessToken.toString());
            const credencial = FacebookAuthProvider.credential(data.accessToken);
            const user = await signInWithCredential(auth, credencial);
            console.log(user.user.email);
            // Consulta para verificar si el correo electrónico del usuario ya está registrado
            const signInMethods = await fetchSignInMethodsForEmail(auth, user.user.email);
            const isUserRegistered = signInMethods && signInMethods.length > 0;
            */
            data = await AccessToken.getCurrentAccessToken()
            console.log(data.accessToken.toString())
            setFbAccessToken(data.accessToken.toString());
            const credencial = FacebookAuthProvider.credential(data.accessToken);
            
            // Obtener el correo electrónico del usuario de Facebook
            const graphResponse = await fetch(
                `https://graph.facebook.com/me?access_token=${data.accessToken}&fields=email`
            );
            const userData = await graphResponse.json();
            const user = await fetchSignInMethodsForEmail(auth, userData.email);
    
            // Consulta para verificar si el correo electrónico del usuario ya está registrado
            const isUserRegistered = user && user.length > 0;
            const usere = await signInWithCredential(auth, credencial);
            if (!isUserRegistered) {
                console.log("El usuario no está registrado.");
                // El usuario no está registrado, redirigir a la pantalla de registro.
                navigation.navigate('Register', { nombre: user.displayName, correo: user.email });
            } else {
                console.log("El usuario ya está registrado.");
                // El usuario ya está registrado, redirigir a la pantalla principal.
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MainStore' }],
                });
            }
        }

    }

    //Metodo para iniciar sesion con Google
    const signInG = async () => {

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            //setState({ userInfo });
            setUserInfo(userInfo); // Update the state with the user info
            console.log(userInfo.idToken.toString);
            //Obtener el token
            const { idToken } = userInfo;
            //Iniciar sesión con el token
            const credencial = GoogleAuthProvider.credential(idToken);
            const userCredential = await signInWithCredential(auth, credencial);
            const user = userCredential.user;
            console.log(user);
            navigation.reset({
                index: 0,
                routes: [{ name: 'MainStore' }],
            });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("Se ha cancelado el inicio de sesion");
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log("En proceso");
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("Servicios de google play requeridos");
                // play services not available or outdated
            } else {
                // some other error happened
                console.log(error);
                console.log(error.code);
            }
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.header}>
                <Titulo titulo={'Iniciar Sesion'} tamaño={30} />
            </View>
            <View style={styles.form}>
                <Stack spacing={30} style={[{ margin: 2 }, { marginTop: 25 }]}>
                    <TextInput
                        variant="outlined"
                        label="Correo"
                        style={{ margin: 16 }}
                        color={theme.colors.primary}
                        value={correo}
                        onChangeText={(value) => onInputChange('correo', value)}
                    />
                    <TextInput
                        variant="outlined"
                        label="Contraseña"
                        secureTextEntry={true}
                        color={theme.colors.primary}
                        style={{ margin: 16 }}
                        value={contraseña}
                        onChangeText={(value) => onInputChange('contraseña', value)}
                    />

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
                        onPress={handleLogin}
                    />
                </Stack>
            </View>
            <View style={styles.footer}>
                <TouchableText onPress={handleLogin}>
                    <Text>O inicia sesion con una red social</Text>
                </TouchableText>
                <View style={styles.icons}>
                    <GoogleSigninButton
                        style={styles.google}
                        onPress={signInG}
                    />
                    <LoginButton
                        style={styles.facebook}
                        onLoginFinished={signInF}
                        onLogoutFinished={() => {
                            setFbAccessToken(null);
                            console.log("logout.")
                        }} />

                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        height: '100%',
    },
    icons: {
        marginTop: '5%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '70%',
    },
    facebook: {
        width: 100,
        height: 60,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    google: {
        width: 100,
        height: 60,
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    textouch: {
        alignItems: 'flex-end',
        marginRight: 15,
        marginBottom: 10,
    },
});
