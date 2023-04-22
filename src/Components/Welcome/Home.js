import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';

function Home() {
    const [city, setCity] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [weather, setWeather] = useState({
        temp: "",
        city: ""
    })

    // By default this will load the weather report of visakhapatnam.
    useEffect(() => {
        var url = `https://api.openweathermap.org/data/2.5/weather?q=Visakhapatnam&units=metric&appid=387729f8d6de06a1c05a3ac870ffb50c`
        axios.get(url)
            .then(response => {
                var temperature = String(response.data.main.temp).split(".");
                setWeather({
                    temp: temperature[0],
                    city: response.data.name,
                })
            })
    }, [])

    // Updates the loading state according to the weather state.
    useEffect(() => {
        if (!weather.temp && !weather.city) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    })

    // This function handle the input given by the user.
    const handleChange = (e) => {
        setCity(e.target.value);
    }

    // This function will handle the getWeather button.
    const handleClick = () => {
        setWeather({
            temp: "",
            city: ""
        })
        var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=387729f8d6de06a1c05a3ac870ffb50c`
        axios.get(url)
            .then(response => {
                var temperature = String(response.data.main.temp).split(".");
                setWeather({
                    temp: temperature[0],
                    city: response.data.name,
                });
                setCity('');
            })
    }

    return (
        <React.Fragment>
            <div className='home'>
                <div className='display'>
                    <div className='title'>
                        The Weather App
                    </div>
                    {
                        isLoading ? <span className="fa fa-spinner fa-3x fa-fw fa-pulse text-dark"></span> :
                            <React.Fragment>
                                <div className='temp'>
                                    {weather.temp}° Celcius
                                </div>
                                <div className='city'>
                                    {weather.city}
                                </div>
                            </React.Fragment>
                    }

                </div>
                <div className='input'>
                    <div className='inputField'>
                        <input type='text' onChange={handleChange} value={city} name='city' placeholder='Enter city' />
                    </div>

                    <button onClick={handleClick}>Get Weather</button>
                </div>
            </div>

            <div className='image'>
                <img src='Images/weather-illustration.png' />
            </div>
        </React.Fragment>
    )
}

export default Home;