import React, { useState, useEffect } from "react";
import { Text,Linking,View , SafeAreaView, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import Versao from "./Versoes";
import estilo from "../estilo";
import NetInfo from '@react-native-community/netinfo';
import { AntDesign } from '@expo/vector-icons';
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import Globais from "../../classes/Globais";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { getAuth, signOut } from "firebase/auth";

export default ({ navigation,route }) => {
    const variavelGlobal = new Globais('2.0.3'); 
    const [atVersao, setAtVersao] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [conexao, setConexao] = useState(true);
    const DRIVE_DOWNLOAD_LINK = "https://drive.google.com/drive/folders/1gvIHTPxzwYtxOrfBrTKD0fG-PmfTOFso?usp=sharing";

    useEffect(() => {
        async function getVersoes() {
            const db = getFirestore();
            const versoesRef = doc(db, "Versao", "versao");
            console.log("Chegou aqui 1");
            try {
                const docSnapshot = await getDoc(versoesRef);
                if (docSnapshot.exists()) {
                    const docData = docSnapshot.data();
                    setAtVersao(docData.aluno)
                    console.log('Versão firebase:');
                    console.log(atVersao);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.log("Error fetching version:", error);
            } finally {
                setIsLoading(false);
            }
        }
        getVersoes();
    }, []);
    
    const handleLogout = async () => {
        const auth = getAuth();
        try {
        await signOut(auth);
        console.log("Usuário deslogado com sucesso!");
        alert("Desconectado com sucesso!");
        
        await AsyncStorage.multiRemove(['email', 'senha', 'alunoLocal']);

        navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],});;
        } catch (error) {
        console.error("Erro ao deslogar: ", error.message);
        }
    };
    
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type === 'wifi' || state.type === 'cellular');
        });

        return () => {
            unsubscribe();
        };
    }, []);
    console.log('Versão atual:', variavelGlobal.versao);
    //console.log('Versão do Firebase:', atVersao);
    return (
        <ScrollView>
            <SafeAreaView style={estilo.corLightMenos1}>
                <Text style={[estilo.tituloH427px, estilo.textoCorSecundaria, style.Titulo, style.alinhamentoTexto]}>Versões</Text>
                <TouchableOpacity
                        style={style.logoutButton}
                        onPress={() =>
                        Alert.alert(
                            "Confirmação",
                            "Tem certeza de que deseja sair?",
                            [
                            { text: "Cancelar", style: "cancel" },
                            {
                                text: "Sair",
                                style: "destructive",
                                onPress: handleLogout,
                            },
                            ]
                        )
                        }
                    >
                <SimpleLineIcons name="logout" size={24} color="#FF6262" />
      </TouchableOpacity>
            </SafeAreaView>
            {conexao ? (
                    (variavelGlobal.versao === atVersao) ? (
                        <Versao versao={variavelGlobal.versao} />
                    ) : (
                        <View style={[estilo.centralizado, { marginTop: '10%', padding: 20 }]}>
                            <View
                            style={[estilo.centralizado, { marginTop: '10%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row',marginBottom: '10%' }]}>
                                <Text style={[estilo.textoP16px, estilo.textoCorDisabled]}>VERSÃO INCORRETA - </Text>
                                <AntDesign name="infocirlce" size={20} color="#CFCDCD" />
                            </View>
                            <Text style={[estilo.textoP16px, { marginVertical: 10, textAlign: 'center' }]}>
                                Por favor, atualize para a versão mais recente:
                            </Text>
                            
                            <TouchableOpacity 
                                onPress={() => Linking.openURL(DRIVE_DOWNLOAD_LINK)}
                                style={[estilo.botao, estilo.corPrimaria, { padding: 15, marginTop: 20 }]}
                            >
                                <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>
                                BAIXAR ATUALIZAÇÃO
                                </Text>
                            </TouchableOpacity>
                            
                            <Text style={[estilo.textoSmall12px, { marginTop: 20, color: '#666', textAlign: 'center' }]}>
                                Versão atual: {variavelGlobal.versao}
                                {"\n"}
                                Versão requerida: {atVersao}
                            </Text>
                            </View>
                    )
                ) : (
                    <TouchableOpacity onPress={() => {
                        Alert.alert(
                            "Modo Offline",
                            "Atualmente, o seu dispositivo está sem conexão com a internet. Por motivos de segurança, o aplicativo oferece funcionalidades limitadas nesse estado. Durante o período offline, os dados são armazenados localmente e serão sincronizados com o banco de dados assim que uma conexão estiver disponível."
                        );
                    }}
                    style={[estilo.centralizado, { marginTop: '10%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}
                    >
                        <Text style={[estilo.textoP16px, estilo.textoCorDisabled]}>MODO OFFLINE - </Text>
                        <AntDesign name="infocirlce" size={20} color="#CFCDCD" />
                    </TouchableOpacity>
                )}
        </ScrollView>
    );
}

const style = StyleSheet.create({
    alinhamentoTexto: {
        margin: 20
    },
    Titulo:{
        marginTop: 25,
        marginBotton: 20
    },logoutButton: {
        position: 'absolute',
        top: 25,
        right: 25,
        padding: 10,
      },
});
