import React, { useMemo, useEffect } from "react";
import { Text, View, StyleSheet } from 'react-native';
import estilo from "../estilo";
import ExercicioItem from "./ExercicioItem"; 
const FichaDeTreino = ({ exercicios }) => {

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

  return (
    <View style={styles.container}>
      {fichas.length > 0 ? (
        fichas.map((ficha) => (
          <View key={ficha} style={styles.fichaContainer}>
            <Text style={[estilo.tituloH427px, estilo.textoCorSecundaria, styles.fichaTitulo]}>Ficha {ficha}</Text>
            
            {exerciciosAgrupados[ficha].map((item, index) => (
              <View key={`${ficha}-${index}`} style={styles.exercicioWrapper}>
                <ExercicioItem item={item} />
              </View>
            ))}
          </View>
        ))
      ) : (
        null
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 15, 
  },
  fichaContainer: {
    marginBottom: 30, 
  },
  fichaTitulo: {
    fontWeight: 'bold',
    marginBottom: 15, 
    paddingBottom: 10,
    borderBottomWidth: 1, 
    borderBottomColor: '#E0E0E0', 
  },
  exercicioWrapper: {
    marginBottom: 15, 
  }
});

export default FichaDeTreino;