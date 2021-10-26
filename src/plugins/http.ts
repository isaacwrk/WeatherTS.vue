import axios from "axios"

const http = axios.create({
    baseURL:'https://api.openweathermap.org/data/2.5/'
})

export default http