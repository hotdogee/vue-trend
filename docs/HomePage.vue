<template>
  <main class="main">
    <GithubBadge slug="hotdogee/vue3-trend" />

    <h1>Vue 3 Trend</h1>
    <p class="headline">Simple, elegant spark lines for Vue 3</p>
    <VueTrend
      :data="data"
      :gradient="[color1, color2, color3]"
      :padding="padding"
      :radius="radius"
      :stroke-width="width"
      :stroke-linecap="linecap"
      :gradientDirection="gradientDirection"
      auto-draw
      smooth
    >
    </VueTrend>

    <div class="playground">
      <Tabs>
        <Tab value="Configure">
          <div class="settings-container tab-content">
            <div class="settings-column">
              <div>
                <div class="setting-label">Gradient direction</div>
                <group class="inline-radio">
                  <div>
                    <input type="radio" id="gd-top" value="top" v-model="gradientDirection" />
                    <label for="gd-top">top</label>
                  </div>
                  <div>
                    <input type="radio" id="gd-bottom" value="bottom" v-model="gradientDirection" />
                    <label for="gd-bottom">bottom</label>
                  </div>
                  <div>
                    <input type="radio" id="gd-left" value="left" v-model="gradientDirection" />
                    <label for="gd-left">left</label>
                  </div>
                  <div>
                    <input type="radio" id="gd-right" value="right" v-model="gradientDirection" />
                    <label for="gd-right">right</label>
                  </div>
                </group>
              </div>

              <div>
                <div class="setting-label">Gradient first color</div>
                <VSwatches
                  v-model="color1"
                  :swatch-size="18"
                  background-color="#f7f7f7"
                  :swatches="[
                    '#b8f2e6',
                    '#6fa8dc',
                    '#42b983',
                    '#3a86ff',
                    '#2c3e50',
                    '#000000',
                    '#ffe74c',
                    '#ffbe88',
                    '#ff93df',
                    '#f94144',
                    '#d6d6d6'
                  ]"
                  inline
                ></VSwatches>
              </div>

              <div>
                <div class="setting-label">Gradient second color</div>
                <VSwatches
                  v-model="color2"
                  :swatch-size="18"
                  background-color="#f7f7f7"
                  :swatches="[
                    '#b8f2e6',
                    '#6fa8dc',
                    '#42b983',
                    '#3a86ff',
                    '#2c3e50',
                    '#000000',
                    '#ffe74c',
                    '#ffbe88',
                    '#ff93df',
                    '#f94144',
                    '#d6d6d6'
                  ]"
                  inline
                ></VSwatches>
              </div>

              <div>
                <div class="setting-label">Gradient third color</div>
                <VSwatches
                  v-model="color3"
                  :swatch-size="18"
                  background-color="#f7f7f7"
                  :swatches="[
                    '#b8f2e6',
                    '#6fa8dc',
                    '#42b983',
                    '#3a86ff',
                    '#2c3e50',
                    '#000000',
                    '#ffe74c',
                    '#ffbe88',
                    '#ff93df',
                    '#f94144',
                    '#d6d6d6'
                  ]"
                  inline
                ></VSwatches>
              </div>
            </div>

            <div class="settings-column">
              <div>
                <div class="setting-label">Width</div>
                <VueSlider v-model="width" :min="1" :max="12" :interval="0.1"></VueSlider>
              </div>

              <div>
                <div class="setting-label">Padding</div>
                <VueSlider v-model="padding" :min="1" :max="12" :interval="0.1"></VueSlider>
              </div>

              <div>
                <div class="setting-label">Radius</div>
                <VueSlider v-model="radius" :min="1" :max="12" :interval="0.1"></VueSlider>
              </div>

              <div>
                <div class="setting-label">Linecap</div>
                <group class="inline-radio">
                  <div>
                    <input type="radio" id="lc-butt" value="butt" v-model="linecap" />
                    <label for="lc-butt">butt</label>
                  </div>
                  <div>
                    <input type="radio" id="lc-round" value="round" v-model="linecap" />
                    <label for="lc-round">round</label>
                  </div>
                  <div>
                    <input type="radio" id="lc-square" value="square" v-model="linecap" />
                    <label for="lc-square">square</label>
                  </div>
                </group>
              </div>
            </div>
          </div>
        </Tab>
        <Tab value="Code">
          <pre class="code-wrap"><code class="code" v-html="code"></code></pre>
        </Tab>
      </Tabs>
    </div>

    <footer>
      Released under the
      <a href="//github.com/hotdogee/vue3-trend/blob/master/LICENSE">MIT</a> license.
      <a href="//github.com/hotdogee/vue3-trend">View source.</a>
    </footer>
  </main>
</template>

<script setup lang="ts">
import hanabi from 'hanabi'
import { Tab, Tabs } from 'super-vue3-tabs'
import { computed, ref } from 'vue'
import VueSlider from 'vue-3-slider-component'
import { VSwatches } from 'vue3-swatches'
import 'vue3-swatches/dist/style.css'
import VueTrend from '../src/components/VueTrend.vue'
import GithubBadge from './GithubBadge.vue'

// State variables
const radius = ref(8)
const padding = ref(8)
const width = ref(1)
const gradientDirection = ref<'top' | 'bottom' | 'left' | 'right'>('top')
const color1 = ref('#6fa8dc')
const color2 = ref('#42b983')
const color3 = ref('#2c3e50')
const linecap = ref<'butt' | 'round' | 'square'>('butt')
const data = ref([0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0])

const code = computed(() => {
  return hanabi(`<trend
  :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
  :gradientDirection=\"${gradientDirection.value}\"\n  :gradient=\"['${color1.value}', '${color2.value}', '${color3.value}']\"\n  :padding=\"${padding.value}\"\n  :radius=\"${radius.value}\"\n  :stroke-width=\"${width.value}\"\n  :stroke-linecap=\"${linecap.value}\"\n  auto-draw\n  smooth>
</trend>`)
})
</script>

<style>
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

.main {
  max-width: 650px;
  margin: 5vh auto 20px;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 18px;
}

.code-wrap {
  text-align: left;
  background-color: #f7f7f7;
  padding: 2em 1.4em;
  line-height: 1.5em;
  margin: 0;
  overflow: auto;
  font-size: 1rem;
}

.code {
  margin: 0;
  padding: 0;
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

footer a {
  color: #0acb1a;
}

.playground {
  margin-top: 20px;
}

.setting-label {
  text-align: left;
  font-size: 1rem;
  font-weight: 700;
  padding-top: 1rem;
}

.settings-container {
  display: flex;
}

@media only screen and (max-width: 480px) {
  .settings-container {
    display: block;
  }
}

.tab-content {
  background: #f7f7f7;
}

.settings-column {
  flex: auto;
  margin: 2rem 2rem 0;
  padding-bottom: 2rem;
  width: 80%;
}

.vue-swatches {
  display: flex;
}

.vue-swatches__wrapper {
  padding-left: 0 !important;
}

.vue-swatches__container {
  padding: 5px 0 0 !important;
  margin-bottom: 0 !important;
}

.vue-tabs .nav > li span.title {
  font-weight: 700;
}

.inline-radio {
  display: flex;
  border-radius: 3px;
  overflow: hidden;
  border: 0;
  margin-top: 10px;
}

.inline-radio div {
  position: relative;
  flex: 1;
  padding: 8px;
}

.inline-radio input {
  width: 100%;
  opacity: 0;
}

.inline-radio label {
  position: absolute;
  top: 0;
  left: 0;
  color: #333;
  width: 100%;
  height: 100%;
  background: #fff;
  font-weight: 500;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.inline-radio div:last-child label {
  border-right: 0;
}

.inline-radio input:checked + label {
  background: #d4d4d4;
}
</style>
