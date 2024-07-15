import './App.css';
import React, { useState} from 'react';

import PrevisaoClimatica from './Componentes/relatorios/PrevisaoClimatica/PrevisaoClimatica';

function App() {
  const [DadosLat, setDadosLat] = useState('');
  const [DadosLon, setDadosLon] = useState('');
  const [localPesquisa, setLocalPesquisa] = useState('');

  const [APIKey] = useState('36c1bc257e47292962e98d75553193b4');

  const handleInputChange = (e) => {
    setLocalPesquisa(e.target.value);
  };

  const handleSearchLocal = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${localPesquisa}&appid=${APIKey}`);
      if (!resp.ok) {
        throw new Error('Não foi possível obter os dados');
      }
      const data = await resp.json();
      setDadosLat(data[0].lat);
      setDadosLon(data[0].lon);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <div className="Title">
        <h2>PREVISAO DO TEMPO</h2>
        <form onSubmit={handleSearchLocal}>
          <input
            type="text"
            value={localPesquisa}
            onChange={handleInputChange}
            placeholder="Digite sua cidade/estado/pais"
          />
          <input type="submit" />
        </form>
      </div>
      <div>
        {DadosLat && DadosLon && (
          <div>
            <PrevisaoClimatica
              DadosLat={DadosLat}
              DadosLon={DadosLon}
              APIKey={APIKey}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
