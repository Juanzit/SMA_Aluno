/* FichaDeTreinoTabs.js - Refatorado */

import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  LayoutAnimation,
  Platform,
  UIManager
} from "react-native";
import estilo from "../estilo";
import ExercicioItem from "./ExercicioItem"; // 1. IMPORTAR O COMPONENTE

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function FichaDeTreinoTabs({ exercicios = [] }) {
  const fichasUnicas = useMemo(() => {
    const setFichas = new Set(exercicios.map(item => item.ficha));
    return Array.from(setFichas).sort((a, b) => {
      if (typeof a === "string" && typeof b === "string") {
        return a.localeCompare(b);
      }
      const na = Number(a),
        nb = Number(b);
      if (!isNaN(na) && !isNaN(nb)) {
        return na - nb;
      }
      return 0;
    });
  }, [exercicios]);

  const [selectedFicha, setSelectedFicha] = useState(
    fichasUnicas.length > 0 ? fichasUnicas[0] : null
  );

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [selectedFicha]);

  const listaExerciciosDaFicha = useMemo(() => {
    if (!selectedFicha) return [];
    return exercicios.filter(item => item.ficha === selectedFicha);
  }, [exercicios, selectedFicha]);

  if (fichasUnicas.length === 0) {
    return (
      <View style={styles.semFichaContainer}>
        <Text style={styles.mensagemVazia}>
          A última ficha ainda não foi lançada. Solicite ao professor responsável para lançá-la e tente novamente mais tarde.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {fichasUnicas.map(ficha => {
          const isActive = ficha === selectedFicha;
          return (
            <TouchableOpacity
              key={ficha}
              style={[
                styles.tabButton,
                isActive ? styles.tabButtonActive : styles.tabButtonInactive
              ]}
              activeOpacity={0.6}
              onPress={() => setSelectedFicha(ficha)}
            >
              <Text
                style={[
                  estilo.tituloH523px,
                  isActive ? styles.tabTextActive : styles.tabTextInactive
                ]}
              >
                {`Treino ${ficha}`}
              </Text>

              {isActive && <View style={styles.indicator} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 2. ÁREA MODIFICADA */}
      <ScrollView contentContainerStyle={styles.exercisesList}>
        {listaExerciciosDaFicha.map((item, index) => (
          <View key={`${selectedFicha}-${index}`} style={styles.exerciseContainer}>
            {/* A lógica complexa foi substituída por uma única linha! */}
            <ExercicioItem item={item} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: estilo.corLight
  },
  semFichaContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  mensagemVazia: {
    ...estilo.textoP16px,
    ...estilo.textoCorSecundaria,
    textAlign: "center"
  },
  tabsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 5,
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center"
  },
  tabButtonActive: {
    backgroundColor: estilo.corPrimaria
  },
  tabButtonInactive: {
    backgroundColor: estilo.corLightMais1
  },
  tabTextActive: {
    color: estilo.corLight,
    fontWeight: "bold"
  },
  tabTextInactive: {
    color: estilo.corSecundaria
  },
  indicator: {
    position: "absolute",
    bottom: -2,
    height: 3,
    width: "70%",
    backgroundColor: estilo.corSecundaria,
    borderRadius: 1.5
  },
  exercisesList: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    paddingBottom: 30
  },
  exerciseContainer: {
    marginBottom: 15
  }
});