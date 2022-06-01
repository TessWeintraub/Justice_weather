import React, {useState, useMemo, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {asyncPostDataCoordsAction,asyncPostDataCityAction,asyncGetDataCityAction} from "../../redux/action";
import {imageWeather} from "../../mockdata/image";
import {transalate} from "../../mockdata/transalate";
import './Main.css';

const Main = () => {

    const [search, setSearch] = useState('')
    const [errorMessage, setErrorMessage] = useState(false)
    const requestWeatherData = useSelector( state => state)
    const dispatch = useDispatch()


    const weatherData = useMemo(() => (
        {
            city: requestWeatherData.name && requestWeatherData.name,
            temperature: requestWeatherData.main ? Math.round(requestWeatherData.main.temp) : 0,
            image: requestWeatherData.weather ? imageWeather[requestWeatherData.weather[0].description.replace(/\s+/g, '_')] : imageWeather.error_clouds,
            wind: requestWeatherData.wind ? requestWeatherData.wind.speed : 0,
            feelsLikeTemp: requestWeatherData.main ? Math.round(requestWeatherData.main.feels_like) : 0,
            reportDescription: requestWeatherData.weather ? transalate[requestWeatherData.weather[0].description.replace(/\s+/g, '_')] : 'Неопределенно',
            humidity: requestWeatherData.main ? requestWeatherData.main.humidity : 0
        }
    ),[requestWeatherData])


    const searchCity = search => search && dispatch(asyncPostDataCityAction(search))

    const location  =  geolocation  => dispatch(asyncPostDataCoordsAction(geolocation.coords))

    const locationError = () => dispatch(asyncGetDataCityAction(true))

    useEffect(()=>navigator.geolocation.getCurrentPosition(location, locationError),[])
    useEffect(()=> weatherData.city ? setErrorMessage(false) : setErrorMessage(true),[weatherData])


    return (
        <section className="main">
            <div className="main__container">
                <div className="main__container-search">
                    <input
                        defaultValue={weatherData.city}
                        onChange={ (e) => setSearch(e.target.value)}
                        placeholder={'Введите город'}
                    />
                    <button onClick={() => searchCity(search)}><img src={imageWeather.Search} alt="icon"/></button>
                </div>
                {errorMessage && <p  className="main__container-error">Не удалось найти город</p>}
            </div>
            <div className="main__container">
                <div className="main__container-image">
                    <img src={weatherData.image} alt="weather"/>
                </div>
                <div className="main__container-temperature">
                    <h1>{weatherData.temperature} °C</h1>
                    <h2 className="main__container-characteristic">{weatherData.reportDescription}</h2>
                </div>
            </div>
            <div className="main__container">
                <h2 className="main__container-feels-like">Ощущается как: <span>{weatherData.feelsLikeTemp} °C</span></h2>
                <h2 className="main__container-feels-like">Влажность: <span>{weatherData.humidity} %</span></h2>
                <h2 className="main__container-wind-speed">Скорость ветра: <span>{weatherData.wind} м/с</span></h2>
            </div>
        </section>
    )
}
export default Main;