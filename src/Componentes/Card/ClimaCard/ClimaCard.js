import style from './ClimaCard.module.css'

function ClimaCard({weatherIcon, week,  day, description, celsius, farenheit}) {

    return(<>
        <div className={style.boxContent}>
            <div className={style.title}>
                <h3>{week}</h3>
            </div>
            <div className={style.weatherInfo}>
                <div>
                    <img src={weatherIcon} alt="Weather Icon"></img>
                </div>
                <div className={style.description}>
                    <div className={style.day}>
                        <div>
                            {day.substring(0, 10)}
                        </div>
                        <div>
                            {(description).toUpperCase()}
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
    </>)

}

export default ClimaCard