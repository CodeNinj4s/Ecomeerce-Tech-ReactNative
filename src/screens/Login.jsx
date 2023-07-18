import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import Titulo from '../components/Titulo';
import { TextInput } from '@react-native-material/core';
import TouchableText from '../components/TextTouch';
import { Stack, Button } from '@react-native-material/core';
import { theme } from '../core/theme';
import { useForm } from '../hooks/useForm';
import { auth } from '../../database/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const Login = ({ navigation }) => {
    const { onInputChange, correo, contraseña } = useForm({
        correo: 'alfredgarcia14200@gmail.com',
        contraseña: 'aciga200',
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
                <TouchableText>
                    {/* <Text>O inicia sesion con una red social</Text> */}
                </TouchableText>

                <View style={styles.icons}></View>
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
        width: 90,
        height: 60,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    google: {
        width: 90,
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
