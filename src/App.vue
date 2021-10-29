<template>
    <WeatherView/>
    <Footer/>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import WeatherView  from '@/views/WeatherView.vue';
import Footer from '@/components/Footer.vue';

const App = defineComponent({
    components:{
        WeatherView,
        Footer
    }
});

export default App;
</script>

<style>

</style>