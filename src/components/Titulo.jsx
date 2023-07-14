import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Titulo = ({ titulo, tamaño }) => {
    const styles = StyleSheet.create({
        titulo: {
            fontSize: tamaño,
            fontWeight: 'bold',
            margin: 5
        },
    });

    return <Text style={styles.titulo}>{titulo}</Text>;
};

export default Titulo;
