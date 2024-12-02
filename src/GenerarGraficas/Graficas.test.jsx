import React from 'react';
import { render, screen } from '@testing-library/react';
import Graficas from '../GenerarGraficas/Graficas.jsx';

test('renders Graficas component', () => {
  render(<Graficas />);
  const linkElement = screen.getByText(/Generador de Gráficos/i);
  expect(linkElement).toBeInTheDocument();
});