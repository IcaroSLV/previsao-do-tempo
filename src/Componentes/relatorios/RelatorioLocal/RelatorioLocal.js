import { useEffect, useState } from "react"
import style from './RelatorioLocal.module.css'

function RelatorioLocal(dados) {

    const [weatherIcon, setWeatherIcon] = useState('')
    const [day, setDay] = useState('')

    const [celsius, setCelsius] = useState('')
    const [farenheit, setFarenheit] = useState('')
    const [kelvin] = useState(dados.data.main.temp)

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
    })

    useEffect(() => {
        setWeatherIcon(dados.data.weather[0].icon)
        setCelsius((kelvin - 273.15).toFixed(1))
        setFarenheit(((kelvin - 273.15) * 9/5 + 32).toFixed(1))
    })

    return(
        <>
        {dados && (
            <div className={style.boxContent}>
                <div className={style.title}>
                    <h3>RELATÓRIO DE CLIMA LOCAL</h3>
                </div>
                <div className={style.weatherInfo}>
                    <div>
                        <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}></img>
                    </div>
                    <div className={style.description}>
                        <div className={style.day}>
                            <div>
                                {day}
                            </div>
                            <div>
                                {(dados.data.weather[0].description).toUpperCase()}
                            </div>
                        </div>
                        <div className={style.temp}>
                            <div>
                                {celsius} C°
                            </div>
                            <div>
                                {farenheit} F°
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export default RelatorioLocal