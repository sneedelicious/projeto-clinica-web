<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
/* Estilos globais para a aplicação */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  color: #333;
  line-height: 1.6;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>