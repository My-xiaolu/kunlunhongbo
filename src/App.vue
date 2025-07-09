<template>
  <div id="app">
    <AppHeader />
    <router-view />
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
</script>

<style lang="scss">
#app {
  font-family: 'Noto Sans TC', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  padding-top: 80px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  overflow-x: hidden;
}

// 自定義滾動條
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #0d9488;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #0f766e;
}
</style> 