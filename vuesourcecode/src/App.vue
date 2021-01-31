<template>
  <div id="app">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-view></router-view>
    <br>
    <p @click="$store.commit('add')">{{ $store.state.counter }}</p>
    <p @click="$store.dispatch('add')">{{ $store.state.counter }}</p>
    <p>doubleCounter: {{ $store.getters.doubleCounter }}</p>

  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>

</style>
