import WeatherDTO from "@/dtos/WeatherDTO";
import http from "@/plugins/http";
import WeatherQuery from '@/queryObject/WeatherQuery'

const weatherService = {
    getWeather: async (query: WeatherQuery): WeatherDTO =>{
        const resp = await http.get<WeatherDTO>('/weather', {params: query})
        return resp.data
    }
}

export default weatherService