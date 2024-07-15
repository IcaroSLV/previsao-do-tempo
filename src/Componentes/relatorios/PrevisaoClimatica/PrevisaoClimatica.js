import { useEffect, useState } from 'react';
import style from './PrevisaoClimatica.module.css';
import ClimaCard from '../../Card/ClimaCard/ClimaCard';

function PrevisaoClimatica({ DadosLat, DadosLon, APIKey }) {

  const [dados, setDados] = useState('')
  const [kelvin, setKelvin] = useState('')

  useEffect(() => {
    if (DadosLat && DadosLon && APIKey) {
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${DadosLat}&lon=${DadosLon}&lang=pt_br&appid=${APIKey}`)
        .then(resp => resp.json())
        .then(data => {
          setDados(data)
          setKelvin(data.list[0].main.temp)
          console.log(data.list[0])
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
    }
  }, [DadosLat, DadosLon, APIKey]);

  useEffect(() => {
    const getCurrentDay = () => {
    const date = new Date();
    const daysOfWeek = [
        'DOMINGO', 'SEGUNDA', 'TERÇA', 
        'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'
    ];
    return daysOfWeek[date.getDay()];
};

setDay(getCurrentDay());
}, []);

useEffect(() => {
  if(dados && dados.weather) {
      setWeatherIcon(dados.weather[0].icon)
      setCelsius((kelvin - 273.15).toFixed(1))
      setFarenheit(((kelvin - 273.15) * 9/5 + 32).toFixed(1))
  }
}, [dados, kelvin]);

const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  
  let dayName = daysOfWeek[date.getDay()];
  if (dayName === 'Domingo') {
    dayName = 'Segunda-feira';
  }

  return dayName;
};

return(
  <div>
        {dados && 
        <div className={style.CardsContainer}>
          {dados.list.map((item, index) => {
            if(index === 0 || index === 6 || index === 12 || index === 20 || index === 30 || index === 39) {
              return (<ClimaCard
                weatherIcon={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                day={item.dt_txt}
                week={getDayOfWeek(item.dt_txt)}
                description={item.weather[0].description}
                celsius={(item.main.temp - 273.15).toFixed(1)}
                farenheit={((item.main.temp - 273.15) * 9/5 + 32).toFixed(1)}
              />)
            }
            return null
          })}

        </div>
      }
  </div>
);
}

export default PrevisaoClimatica;
