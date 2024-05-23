import './App.css';
import React, { useState, useEffect } from 'react';

import RelatorioLocal from './Componentes/relatorios/RelatorioLocal/RelatorioLocal.js'
import PrevisaoMaritima from './Componentes/relatorios/PrevisaoMaritima/PrevisaoMaritima.js';
function App() {

  const [DadosLat, setDadosLat] = useState('');
  const [DadosLon, setDadosLon] = useState('');
  const [localPesquisa, setLocalPesquisa] = useState('')

  const [climaLocal, setClimaLocal] = useState('')

  const [APIKey] = useState('36c1bc257e47292962e98d75553193b4')

  const handleInputChange= (e) => {
    setLocalPesquisa(e.target.value)
  }

  const handleSearchLocal = async (e) => {
    e.preventDefault()
    await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${localPesquisa}&appid=${APIKey}`)
    .then(resp => {
      if (!resp.ok) {
        throw new Error('Não foi possível obter os dados');
      }
       return resp.json()
      })
    .then(data => {
      setDadosLat(data[0].lat)
      setDadosLon(data[0].lon)
    })
    .catch(err => console.log(err))
  }

  useEffect(()=>{
    if(!DadosLat == '') {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${DadosLat}&lon=${DadosLon}&lang=pt_br&appid=${APIKey}`)
      .then(resp => resp.json()) 
      .then(data => {
        setClimaLocal(data)
      })
    }
  }, [DadosLat])

  return (
    <div className="App">
        <div className="Title">
          <h2>PREVISAO DO TEMPO</h2>
          <form onSubmit={handleSearchLocal}>
            <input type='text' value={localPesquisa} onChange={handleInputChange} placeholder='Digite sua cidade/estado/pais'></input>
            <input type='submit'/>
          </form>
        </div>
        <div>
            {climaLocal && (
              <div><RelatorioLocal data={climaLocal}/></div>
            )}
            {climaLocal && (
              <div><PrevisaoMaritima data={climaLocal}/></div>
            )}

          
        </div>
    </div>
  );
}

export default App;
