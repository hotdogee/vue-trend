<script setup lang="ts">
import VueTrend from './components/VueTrend.vue'
</script>

<template>
  <main>
    <h1>Vue 3 Trend</h1>
    <p class="headline">Simple, elegant spark lines for Vue.js</p>
    <div class="chart-container">
      <VueTrend
        :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
        :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
        auto-draw
        smooth
      >
      </VueTrend>
    </div>
    <footer>
      Released under the
      <a href="//github.com/hotdogee/vue3-trend/blob/master/LICENSE">MIT</a> license.
      <a href="//github.com/hotdogee/vue3-trend">View source.</a>
    </footer>
  </main>
</template>

<style scoped>
main {
  font-family: Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 20px; /* Adding space between the VueTrend */
}

.chart-container {
  border: 1px solid whitesmoke; /* Removed 'shadow' as it's not valid CSS */
  border-radius: 8px; /* Added border-radius for rounded corners */
  width: 300px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1); /* Added box-shadow for subtle depth */
}

h1 {
  margin: 0;
  font-size: 3rem;
  font-weight: bold;
}

.headline {
  font-family:
    Courier,
    Courier New,
    monospace;
  font-size: 15px;
  font-weight: 400;
  padding: 20px 0;
}

a {
  color: #2ab854;
}

footer {
  margin-top: 40px;
  line-height: 2;
  font-size: 0.8rem;
  color: #c1c1c1;
  font-family:
    Courier,
    Courier New,
    monospace;
}
</style>
