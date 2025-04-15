import type { App, Plugin } from 'vue'
import VueTrendComponent from './components/VueTrend.vue'

const install: Plugin = (app: App) => {
  app.component('VueTrend', VueTrendComponent)
}

// Attach the install function directly to the component object.
// Use a type assertion with an intersection type to inform TypeScript
// that this object now also has an 'install' property.
const VueTrend = VueTrendComponent as typeof VueTrendComponent & { install: Plugin }
VueTrend.install = install

export default VueTrend

// export type { Boundary, InputData } from './components/VueTrend.vue';
