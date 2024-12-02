import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const Graficas = () => {
  const [datos, setDatos] = useState([
    { leyenda: "Leyenda 1", valor: "" },
    { leyenda: "Leyenda 2", valor: "" },
  ]);
  const [titulo, setTitulo] = useState("");
  const [tipoGrafico, setTipoGrafico] = useState("circular");
  const [googleChartsLoaded, setGoogleChartsLoaded] = useState(false);

  useEffect(() => {
    const loadGoogleCharts = () => {
      const script = document.createElement("script");
      script.src = "https://www.gstatic.com/charts/loader.js";
      script.async = true;
      script.onload = () => {
        window.google.charts.load("current", { packages: ["corechart"] });
        window.google.charts.setOnLoadCallback(() => setGoogleChartsLoaded(true));
      };
      document.body.appendChild(script);
    };

    if (!window.google || !window.google.charts) {
      loadGoogleCharts();
    } else {
      setGoogleChartsLoaded(true);
    }
  }, []);

  const agregarDato = () => {
    const nuevaLeyenda = `Leyenda ${datos.length + 1}`;
    setDatos([...datos, { leyenda: nuevaLeyenda, valor: "" }]);
  };

  const actualizarDato = (index, field, value) => {
    const nuevosDatos = [...datos];
    nuevosDatos[index][field] = value;
    setDatos(nuevosDatos);
  };

  const cargarGrafico = () => {
    if (!googleChartsLoaded) {
      alert("Google Charts aún no está cargado. Por favor espera unos segundos.");
      return;
    }

    if (
      titulo.trim() === "" ||
      datos.some((d) => d.leyenda.trim() === "" || d.valor.trim() === "")
    ) {
      alert("Cargue todos los campos");
      return;
    }

    const arregloDatos = [
      ["Gráfico", ""],
      ...datos.map(({ leyenda, valor }) => [leyenda, parseInt(valor, 10)]),
    ];

    const options = {
      title: titulo,
      width: 600,
    };

    const data = window.google.visualization.arrayToDataTable(arregloDatos);
    const chartElement = document.getElementById("piechart");

    if (tipoGrafico === "circular") {
      const chart = new window.google.visualization.PieChart(chartElement);
      chart.draw(data, options);
    } else {
      const chart = new window.google.visualization.ColumnChart(chartElement);
      chart.draw(data, options);
    }
  };

  return (
    <div className="container-grafico">
        <div className="container">
      <h1 className="text-center my-4">Generador de Gráficos</h1>

      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="form-group">
              <label htmlFor="tipo">Tipo de Gráfico</label>
              <select
                className="form-control"
                id="tipo"
                value={tipoGrafico}
                onChange={(e) => setTipoGrafico(e.target.value)}
              >
                <option value="circular">Gráfico Circular</option>
                <option value="columna">Gráfico de Columnas</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="titulo">Título del Gráfico</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                placeholder="Título del Gráfico"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>

            <div id="datos">
              {datos.map((dato, index) => (
                <div className="form-row dato" key={index}>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control mb-2 serie"
                      placeholder={dato.leyenda}
                      value={dato.leyenda}
                      onChange={(e) => actualizarDato(index, "leyenda", e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control mb-2 valor"
                      placeholder="Valor"
                      value={dato.valor}
                      onChange={(e) => actualizarDato(index, "valor", e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={agregarDato}
              className="btn btn-primary my-2"
            >
              Agregar Dato
            </button>
            <button
              type="button"
              onClick={cargarGrafico}
              className="btn btn-success my-2"
            >
              Crear Gráfico
            </button>
          </form>
        </div>

        <div className="col-md-6">
          <div id="piechart" className="border p-3"></div>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Graficas;

