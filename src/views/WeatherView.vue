<template>
    <div class="">
        <div v-if="data.loading || !data.weather" wire:loading class="fixed top-0 left-0 right-0 bottom-0 w-full min-h-screen h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
            <div>
                <div style="border-top-color:transparent"
                     class="w-16 h-16 border-4 border-blue-400 border-double rounded-full animate-spin"></div>
            </div>
            <h2 class="text-center text-white text-xl font-semibold">Carregando...</h2>
            <p class="w-1/3 text-center text-white">Quase lá, estamos nos últimos ajustes :)</p>
        </div>
        <div v-else class="min-h-screen min-w-min">
            <pre>{{data.weather}}</pre>
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
            location: 'Patos'
        });

        const getWeatherData = async() =>{
            data.loading = true; 
            try{
                const resp = await weatherServices.getWeather({ q:data.location });
                data.weather = resp;
                setTimeout(()=>{
                    data.loading = false; 
                },3000); 
            } catch(error){
                console.log(error);
            }
        };


        onMounted(() => getWeatherData());

        return { getWeatherData, data };
    }


});
export default weather;
</script>

<style>

#weather{
  background-image:url('../assets/cold-bg.jpg');
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}
#weather.warm{
  background-image: url('../assets/warm-bg.jpg');
}
main{
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
  text-align: center;
  margin-top:10px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.35);
  border-radius: 4px;
  color: #FFF;
}
</style>