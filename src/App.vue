<template>
  <div id="app">
    <div class="Content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.Content {
  width: 600px;
  padding: 50px;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
