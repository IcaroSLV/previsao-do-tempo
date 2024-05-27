import { useEffect, useState } from 'react';
import style from './PrevisaoClimatica.module.css';

function PrevisaoClimatica({ DadosLat, DadosLon, APIKey }) {

    const [dadosPrevisao, setDadosPrevisao] = useState('');

  useEffect(() => {
    if (DadosLat && DadosLon && APIKey) {
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${DadosLat}&lon=${DadosLon}&lang=pt_br&appid=${APIKey}`)
        .then(resp => resp.json())
        .then(data => {
          setDadosPrevisao(data);
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
    }
  }, [DadosLat, DadosLon, APIKey]);

  return (
    <div>
      <h1></h1>
    </div>
  );
}

export default PrevisaoClimatica;
