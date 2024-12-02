import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Graficas from '../GenerarGraficas/Graficas.jsx';
import fs from 'fs';
import path from 'path';

// Función para generar una cadena aleatoria de longitud dada
const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Función para generar un valor aleatorio entre un rango dado
const generateRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

test('renders Graficas component and saves chart parameters', () => {
  render(<Graficas />);
  
  // Generar valores aleatorios para los parámetros
  const randomTipo = 'circular';
  const randomTitulo = `Test Chart ${generateRandomString(5)}`;
  const randomLeyenda = `Leyenda ${generateRandomString(5)}`;
  const randomValor = generateRandomValue(1, 100).toString();

  // Interactúa con la página para ingresar los parámetros
  fireEvent.change(screen.getByLabelText(/Tipo de Gráfico/i), { target: { value: randomTipo } });
  fireEvent.change(screen.getByPlaceholderText(/Título del Gráfico/i), { target: { value: randomTitulo } });
  fireEvent.change(screen.getAllByPlaceholderText(/Leyenda/i)[0], { target: { value: randomLeyenda } });
  fireEvent.change(screen.getAllByPlaceholderText(/Valor/i)[0], { target: { value: randomValor } });

  // Guarda los parámetros en un archivo de texto con nombre aleatorio
  const parameters = {
    tipo: screen.getByLabelText(/Tipo de Gráfico/i).value,
    titulo: screen.getByPlaceholderText(/Título del Gráfico/i).value,
    datos: [
      {
        leyenda: screen.getAllByPlaceholderText(/Leyenda/i)[0].value,
        valor: screen.getAllByPlaceholderText(/Valor/i)[0].value,
      },
    ],
  };

  const randomFileName = `${generateRandomString(5)}.txt`;
  const parametersPath = path.resolve(__dirname, randomFileName);
  fs.writeFileSync(parametersPath, JSON.stringify(parameters, null, 2));

  // Verifica que el archivo de parámetros se haya creado
  expect(fs.existsSync(parametersPath)).toBe(true);
});
