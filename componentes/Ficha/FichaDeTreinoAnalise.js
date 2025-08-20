import React, { useState, useMemo } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import estilo from "../estilo";
import AntDesign from '@expo/vector-icons/AntDesign';
import ExercicioItem from "./ExercicioItem";
export default function FichaDeTreino({ exercicios }) {
    const [selectedFicha, setSelectedFicha] = useState(null);

    const exerciciosAgrupados = useMemo(() => {
        if (!exercicios || exercicios.length === 0) {
            return {};
        }
        return exercicios.reduce((acc, exercicio) => {
            const { ficha } = exercicio;
            if (!acc[ficha]) {
                acc[ficha] = [];
            }
            acc[ficha].push(exercicio);
            return acc;
        }, {});
    }, [exercicios]);

    const fichas = Object.keys(exerciciosAgrupados);

    const toggleFicha = (ficha) => {
        setSelectedFicha(prev => prev === ficha ? null : ficha);
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            {fichas.length > 0 ? (
                fichas.map((ficha) => (
                    <View key={ficha} style={styles.fichaContainer}>
                        <TouchableOpacity
                            style={[
                                estilo.botao,
                                estilo.corLightMenos1,
                                styles.fichaHeader,
                                {
                                    borderBottomLeftRadius: selectedFicha === ficha ? 0 : 8,
                                    borderBottomRightRadius: selectedFicha === ficha ? 0 : 8
                                }
                            ]}
                            onPress={() => toggleFicha(ficha)}
                        >
                            <View style={styles.headerContent}>
                                <AntDesign name="filetext1" size={24} color={estilo.corPrimaria} />
                                <Text style={styles.tituloFicha}>Ficha {ficha}</Text>
                                <AntDesign
                                    name={selectedFicha === ficha ? "up" : "down"}
                                    size={16}
                                    color={estilo.corPrimaria}
                                />
                            </View>
                        </TouchableOpacity>

                        {selectedFicha === ficha && (
                            <View style={styles.exercisesContainer}>
                                {exerciciosAgrupados[ficha].map((item, index) => (
                                    <View key={index} style={styles.exerciseContainer}>
                                        <ExercicioItem item={item} />
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                ))
            ) : (
                <Text style={styles.mensagemVazia}>
                    A última ficha ainda não foi lançada. Solicite ao professor responsável para lançá-la e tente novamente mais tarde.
                </Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: estilo.corLight
    },
    contentContainer: {
        padding: 5
    },
    fichaContainer: {
        marginBottom: 10,
        overflow: 'hidden',
        backgroundColor: estilo.corLightMenos1,
        elevation: 0,
    },
    fichaHeader: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: estilo.corLightMais1,
        borderWidth: 1,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        flex: 1,
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 5,
        paddingVertical: 2,
    },
    tituloFicha: {
        ...estilo.tituloH523px,
        color: estilo.corPrimaria,
    },
    exercisesContainer: {
        padding: 15,
        backgroundColor: estilo.corLight,
        borderTopWidth: 1,
        borderTopColor: estilo.corLightMais1,
    },
    exerciseContainer: {
        marginVertical: 10,
    },
    mensagemVazia: {
        ...estilo.textoP16px,
        ...estilo.textoCorSecundaria,
        marginHorizontal: 15,
        textAlign: 'justify'
    },
});