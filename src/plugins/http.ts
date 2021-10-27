import axios from "axios"

const http = axios.create({
    baseURL:'https://api.openweathermap.org/data/2.5/',
    params:{
        'appid':process.env.VUE_APP_WEATHER_KEY,
        'units':'metric'
    }
})

export default http