// Cronometro.js
import React, { useState, useEffect } from 'react';
import './App.css';  // Importamos el archivo de estilos

const Cronometro = () => {
  // Estados para los minutos, segundos y milisegundos
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [milisegundos, setMilisegundos] = useState(0);
  const [activo, setActivo] = useState(false);
  const [parciales, setParciales] = useState([]); // Estado para almacenar los parciales

  // useEffect que maneja el intervalo del cronómetro
  useEffect(() => {
    let intervalo;

    if (activo) {
      intervalo = setInterval(() => {
        setMilisegundos((prevMilisegundos) => {
          if (prevMilisegundos < 99) {
            return prevMilisegundos + 1; // Incrementa los milisegundos
          } else {
            setSegundos((prevSegundos) => {
              if (prevSegundos < 59) {
                return prevSegundos + 1; // Incrementa los segundos
              } else {
                setMinutos((prevMinutos) => prevMinutos + 1); // Incrementa los minutos
                return 0; // Reinicia los segundos
              }
            });
            return 0; // Reinicia los milisegundos
          }
        });
      }, 10); // El intervalo de 10ms para milisegundos
    } else {
      clearInterval(intervalo); // Detiene el intervalo cuando el cronómetro está pausado
    }

    return () => clearInterval(intervalo); // Limpiar el intervalo cuando el componente se desmonte
  }, [activo]);

  // Funciones para manejar los botones
  const iniciar = () => setActivo(true);
  const pausar = () => setActivo(false);
  const reiniciar = () => {
    setActivo(false);
    setMinutos(0);
    setSegundos(0);
    setMilisegundos(0);
    setParciales([]); // Reinicia los parciales también al reiniciar
  };

  // Función para guardar el parcial
  const agregarParcial = () => {
    const parcial = formatTime(); // Obtener el tiempo formateado
    setParciales((prevParciales) => [...prevParciales, parcial]); // Agregar el parcial a la lista
  };

  // Formatear el tiempo en formato MM:SS:MS
  const formatTime = () => {
    const minutosFormateados = minutos.toString().padStart(2, '0');
    const segundosFormateados = segundos.toString().padStart(2, '0');
    const milisegundosFormateados = milisegundos.toString().padStart(2, '0');
    return `${minutosFormateados}:${segundosFormateados}.${milisegundosFormateados}`;
  };

  return (
    <div className="container">
      <div className="cronometro">
        <h1>Cronómetro</h1>
        <p className="time">{formatTime()}</p>
        <div>
          {/* Botón de Iniciar/Detener */}
          <button
            onClick={activo ? pausar : iniciar}
            className={activo ? 'btn detener' : 'btn iniciar'}
          >
            {activo ? 'Detener' : 'Iniciar'}
          </button>
          {/* Botón de Reiniciar */}
          <button onClick={reiniciar} className="btn verde">Reiniciar</button>
          {/* Botón de Parcial */}
          <button onClick={agregarParcial} className="btn verde">Parcial</button>
        </div>
        
        {/* Mostrar los parciales */}
        {parciales.length > 0 && (
          <div className="parciales">
            <h3>Parciales</h3>
            <ul>
              {parciales.map((parcial, index) => (
                <li key={index}>{parcial}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cronometro;
