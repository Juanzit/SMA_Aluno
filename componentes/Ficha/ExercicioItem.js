import React from 'react';
import ExerciciosAlongamento from "./ExerciciosAlongamento";
import ExerciciosCardio from "./ExerciciosCardio";
import ExerciciosForca from "./ExerciciosForça";

const ExercicioItem = ({ item }) => {
  const nomeFinal = item.nomeExercicio?.exercicio ?? item.Nome?.exercicio ?? item.Nome;

  const imagemExercicio = item.Nome && item.Nome.imagem
    ? item.Nome.imagem
    : item.imagem;

  switch (item.tipo) {
    case 'força':
      return (
        <ExerciciosForca
          nomeDoExercicio={nomeFinal}
          imagem={imagemExercicio}
          series={item.series}
          repeticoes={item.repeticoes}
          descanso={item.descanso}
          cadencia={item.cadencia}
        />
      );
    case 'aerobico':
      return (
        <ExerciciosCardio
          nomeDoExercicio={nomeFinal}           
          velocidade={item.velocidade}
          duracao={item.duracao}
          series={item.series}
          descanso={item.descanso}
        />
      );
    case 'alongamento':
      return (
        <ExerciciosAlongamento
          nomeDoExercicio={nomeFinal}
          imagem={imagemExercicio}
          series={item.series}
          repeticoes={item.repeticoes}
          descanso={item.descanso}
        />
      );
    default:
      return null;
  }
};


export default ExercicioItem;