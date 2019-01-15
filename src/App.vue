<template>
  <div id="app">
       <Service></Service>
      <!-- <Dingdan></Dingdan> -->
  </div>
</template>

<script>
import Service from './components/Service.vue'
import Dingdan from "./components/Dingdan.vue"
export default {
  name: 'app',
  components: {
   Service,Dingdan
  }
}
</script>

<style>

</style>
