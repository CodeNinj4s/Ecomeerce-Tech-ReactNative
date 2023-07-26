import React from 'react'
import { TouchableOpacity } from 'react-native';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { auth } from '../../database/firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export const LogOutButton = () => {
    const navigation = useNavigation();

    const close_session = () => {
        signOut(auth);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }

    return (
        <TouchableOpacity onPress={() => close_session()}>
            <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <Icon name='logout' size={24} color='white' />
            </IconComponentProvider>
        </TouchableOpacity>
    )
}
