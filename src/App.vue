<template>
    <WeatherView/>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import WeatherView  from '@/views/WeatherView.vue';

const App = defineComponent({
    components:{
        WeatherView
    }
});

export default App;
</script>

<style>

</style>