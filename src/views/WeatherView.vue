<template>
    <div class="h-min-screen">
        <div v-if="!data.weather" wire:loading class="fixed top-0 left-0 right-0 bottom-0 w-full min-h-screen h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
            <div>
                <div style="border-top-color:transparent"
                     class="w-16 h-16 border-4 border-blue-400 border-double rounded-full animate-spin"></div>
            </div>
            <h2 class="text-center text-white text-xl font-semibold">Carregando...</h2>
            <p class="w-1/3 text-center text-white">Quase lá, estamos nos últimos ajustes :)</p>
        </div>
        <div v-else class="min-h-screen min-w-min" :class="data.weather.main.temp > 23 ? 'warm' : 'weather' ">
            <div class="text-right mr-3 pt-1 text-white font-normal font-sans">
                {{calendar}}
            </div>
            <div class="search-box">
                <input
                    type="text"
                    class="search-bar hover:bg-gray-200 font-mono tracking-tighter"
                    placeholder="Pesquisar..."
                    v-model="data.location"
                    @keypress="getWeatherData">
            </div>

           
            <div class="weather-app">
                <div class="location-box bg-gray-50 bg-opacity-25 rounded mr-2 ml-2">
                    <div class="location font-mono font-normal text-white tracking-tighter">{{data.weather.name}}-{{data.weather.sys.country}}</div>
                    <div v-if="data.weather.main.temp > 23" class="text-white">Hoje vai ser quente! sensação térmica chegando a {{Math.round(data.weather.main.feels_like)}}ºc</div>
                    <div v-else class="text-white">Leve o agasalho! Sensação térmica chegando a {{Math.round(data.weather.main.feels_like)}}ºc</div>
                </div>
            </div>

            
            <div class="weather-box">
                <div class="temp">{{Math.round(data.weather.main.temp)}}ºc</div>
                <div class="wheather mb-5">{{ data.weather.weather[0].description }}</div>
            </div>

            <div class="extra mr-2 ml-2">
                <div class="info-box  text-center">
                    <p>Minima: {{Math.round(data.weather.main.temp_min)}}ºc</p>
                    <p>Máxima: {{Math.round(data.weather.main.temp_max)}}ºc</p>
                    <p>Umidade: {{data.weather.main.humidity}}%</p>
                    <p>Velocidade do vento: {{data.weather.wind.speed}} km/h</p>
                </div>
            </div>
            

        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive } from 'vue';
import weatherServices from '@/services/WeatherService';
import WeatherDTO from '@/dtos/WeatherDTO';


interface NewWeatherState{
    weather:WeatherDTO | null
    loading : boolean
    location:string
}

const weather = defineComponent({
    setup(){
        const data = reactive<NewWeatherState>({
            weather:null, 
            loading: true,
            location: 'João Pessoa'
        });

        const calendar = new Date().toISOString().substr(0, 10).split('-').reverse().join('/');
        
        const getWeatherData = async() =>{
            data.loading = true; 
            try{
                const resp = await weatherServices.getWeather({ q:data.location });
                data.weather = resp;
            } catch(error){
                console.log(error);
            }
        };

        onMounted(() => getWeatherData());

        return { getWeatherData, data, calendar };
    }


});
export default weather;
</script>

<style>

.weather{
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.55)),url('../assets/sky-bg.jpg');
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}
.warm{
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.55)),url('../assets/sky-bg-heat.jpg');
  background-size: cover;
  transition: 0.4s;
}
.main{
  height: 100vh;
  padding: 25px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
}
.search-box{
  width: 100%;
  margin-bottom: 30px;
  padding: 15px;
}
.search-bar{
  display:block;
  width: 100%;
  padding: 15px;
  color:#313131;
  font-size:20px;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color:rgba(255,255,255,0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}
.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}
.location-box .location{
  
  font-size:32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}
.location-box, .date{
  
  font-size:20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}
.weather-box{
  text-align:center;
}
.weather-box .temp{
  display: inline-block;
  padding: 10px 25px;
  color: #FFF;
  font-size: 102px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
.weather-box, .weather-box{
  color:#FFF;
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
.extra{
  margin-top:28px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.349);
  border-radius: 4px;
  color: #FFF;
}
</style>