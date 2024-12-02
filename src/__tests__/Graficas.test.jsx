import puppeteer from 'puppeteer';
import { render, screen } from '@testing-library/react';
import Graficas from '../GenerarGraficas/Graficas.jsx';
import fs from 'fs';
import path from 'path';

test('renders Graficas component and saves chart screenshot', async () => {
  render(<Graficas />);
  const linkElement = screen.getByText(/Generador de Gráficos/i);
  expect(linkElement).toBeInTheDocument();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000'); // Asegúrate de que tu aplicación esté corriendo en esta URL

  // Interactúa con la página para generar la gráfica
  await page.select('#tipo', 'circular');
  await page.type('#titulo', 'Test Chart');
  await page.type('.serie', 'Leyenda 1');
  await page.type('.valor', '10');
  await page.click('.btn-success');

  // Espera a que la gráfica se renderice
  await page.waitForSelector('#piechart');

  // Guarda una captura de pantalla de la gráfica
  const screenshotPath = path.resolve(__dirname, 'chart-screenshot.png');
  await page.screenshot({ path: screenshotPath });

  await browser.close();

  // Verifica que el archivo de la captura de pantalla se haya creado
  expect(fs.existsSync(screenshotPath)).toBe(true);
});
