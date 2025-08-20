import React, { useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import estilo from '../estilo';
import { useFonts } from 'expo-font';

export default ({ versao }) => {
    const [fontsLoaded] = useFonts({
        'Montserrat': require('../../assets/Montserrat-Light.ttf'),
    });
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);

    if (!fontsLoaded) {
        return null; 
    }

    return (
        <SafeAreaView style={style.safeArea}>
            <TouchableOpacity style={style.container} onPress={() => setModalVisible1(true)}>
                <Text style={[style.alinhamentoTitulo, estilo.textoP16px, estilo.textoCorSecundaria, style.montserrat]}>
                    Versão: 1.0.0
                </Text>
                <Text style={[style.detalhesTexto, estilo.textoP12px, estilo.textoCorSecundaria, style.montserrat]}>
                    Clique para mais detalhes
                </Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible1}
                onRequestClose={() => setModalVisible1(false)}
            >
                <View style={style.modalContainer}>
                    <View style={style.modalContent}>
                        <Text style={[style.modalTitle, style.montserrat]}>Detalhes da Versão 1.0.0</Text>
                        <ScrollView style={style.scrollView}>
                            <Text style={[style.modalText, style.montserrat]}>
                                Versão inicial do aplicativo
                            </Text>
                        </ScrollView>
                        <TouchableOpacity style={style.closeButton} onPress={() => setModalVisible1(false)}>
                            <Text style={[style.closeButtonText, style.montserrat]}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
             <TouchableOpacity style={style.container} onPress={() => setModalVisible2(true)}>
                <Text style={[style.alinhamentoTitulo, estilo.textoP16px, estilo.textoCorSecundaria, style.montserrat]}>
                    Versão: 2.0.0
                </Text>
                <Text style={[style.detalhesTexto, estilo.textoP12px, estilo.textoCorSecundaria, style.montserrat]}>
                    Clique para mais detalhes
                </Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible2}
                onRequestClose={() => setModalVisible2(false)}
            >
                <View style={style.modalContainer}>
                    <View style={style.modalContent}>
                        <Text style={[style.modalTitle, style.montserrat]}>Detalhes da Versão 2.0.0</Text>
                        <ScrollView style={style.scrollView}>
                            <Text style={[style.modalText, style.montserrat]}>
                                - botao de informações gerais do exercicio, menu suspenso das fichas na tela de avaliação.
                                {'\n'}
                                - correção de bugs.
                                {'\n'}
                                - melhorias na interface do usuário.
                            </Text>
                        </ScrollView>
                        <TouchableOpacity style={style.closeButton} onPress={() => setModalVisible2(false)}>
                            <Text style={[style.closeButtonText, style.montserrat]}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity style={style.container} onPress={() => setModalVisible3(true)}>
                <Text style={[style.alinhamentoTitulo, estilo.textoP16px, estilo.textoCorSecundaria, style.montserrat]}>
                    Versão: 2.0.2
                </Text>
                <Text style={[style.detalhesTexto, estilo.textoP12px, estilo.textoCorSecundaria, style.montserrat]}>
                    Clique para mais detalhes
                </Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible3}
                onRequestClose={() => setModalVisible3(false)}
            >
                <View style={style.modalContainer}>
                    <View style={style.modalContent}>
                        <Text style={[style.modalTitle, style.montserrat]}>Detalhes da Versão 2.0.2</Text>
                        <ScrollView style={style.scrollView}>
                            <Text style={[style.modalText, style.montserrat]}>
                                -correção no "esqueci a senha", agora não é possivel trocar no banco.
                                {'\n'}
                                - correção de bugs.
                                {'\n'}
                                - melhorias na interface do usuário.
                                {'\n'}
                                - correção na ficha.
                            </Text>
                        </ScrollView>
                        <TouchableOpacity style={style.closeButton} onPress={() => setModalVisible3(false)}>
                            <Text style={[style.closeButtonText, style.montserrat]}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginVertical: 10,
    },
    alinhamentoTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    detalhesTexto: {
        fontSize: 14,
        marginTop: 5,
        color: '#007bff',
    },
    montserrat: {
        fontFamily: 'Montserrat',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    scrollView: {
        width: '100%',
        maxHeight: 300,
    },
    modalText: {
        fontSize: 16,
        lineHeight: 24,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
