<div align="center">
  <img src="https://github.com/user-attachments/assets/927335c4-98b2-4b6f-936f-060df5cad139" width="500" alt="Vue 3 Trend">
  <br>
  <h1>Vue 3 Trend</h1>
  <p>🌈 Simple, elegant spark lines for Vue.js</p>
  <br>
  <a href="https://www.npmjs.com/package/@hotdogee/vue3-trend"><img src="https://img.shields.io/npm/v/@hotdogee/vue3-trend.svg?style=flat" alt="npm"></a>
  <img src="https://img.shields.io/badge/vue-^3.3-4fc08d.svg?colorA=2c3e50&style=flat" alt="vue">
</div>

<br>

## Live

- [Demo](https://vue3-trend.hanl.in/)
- [Playground](https://stackblitz.com/~/github.com/hotdogee/vue3-trend?file=src/App.vue)

## Installation

```shell
npm i @hotdogee/vue3-trend
```

## Usage

```js
import VueTrend from '@hotdogee/vue3-trend'
```

_vue template_

```vue
<VueTrend
  :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
  :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
  auto-draw
  smooth
>
</VueTrend>
```

## Lineage

All credits go to these open-source works and resources 🙏

- Rewritten for Vue 3 in TypeScript
- Forked from [vue-trend](https://github.com/QingWei-Li/vue-trend) - 🌈 Simple, elegant spark lines (Vue 2)
- Inspired by [unsplash/react-trend](https://github.com/unsplash/react-trend) - 📈 Simple, elegant spark lines (React)

## Props

| Name              | Type           | Default     | Description                                                                                                                                                                                                                                       | Example                                                                      |
| ----------------- | -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| data              | Number\|Object | `undefined` | The data accepted by Vue Trend is incredibly simple: An array of y-axis values to graph.                                                                                                                                                          | `[120, 149, 193.4, 200, 92]` or `[{ value: 4 }, { value: 6 }, { value: 8 }]` |
| gradient          | String         | `['#000']`  | Colour can be specified as any SVG-supported format (named, rgb, hex, etc).                                                                                                                                                                       | `['#0FF', '#F0F', '#FF0']`                                                   |
| gradientDirection | String         | `top`       | Top, Bottom, Left or Right.                                                                                                                                                                                                                       | -                                                                            |
| width             | String         | `100%`      | Set an explicit width for your SVG.                                                                                                                                                                                                               | `100%` or `300px`                                                            |
| height            | String         | `100%`      | Set an explicit height for your SVG.                                                                                                                                                                                                              | `100%` or `75px`                                                             |
| viewWidth         | Number         | `300`       | Set an explicit width for your SVG viewBox.                                                                                                                                                                                                       | -                                                                            |
| viewHeight        | Number         | `75`        | Set an explicit height for your SVG viewBox.                                                                                                                                                                                                      | -                                                                            |
| padding           | Number         | `8`         | If you set a very large `strokeWidth` on your line, you may notice that it gets "cropped" towards the edges.                                                                                                                                      | -                                                                            |
| smooth            | Boolean        | `false`     | Smooth allows the peaks to be 'rounded' out so that the line has no jagged edges.                                                                                                                                                                 | -                                                                            |
| radius            | Number         | `10`        | When using **smoothing**, you may wish to control the amount of curve around each point. This prop has no effect if `smooth` isn't set to `true`.                                                                                                 | -                                                                            |
| autoDraw          | Boolean        | `false`     | Allow the line to draw itself on mount. Set to `true` to enable, and customize using `autoDrawDuration` and `autoDrawEasing`.                                                                                                                     | -                                                                            |
| autoDrawDuration  | Number         | `2000`      | The amount of time, in milliseconds, that the autoDraw animation should span. This prop has no effect if `autoDraw` isn't set to `true`.                                                                                                          | -                                                                            |
| autoDrawEasing    | String         | `ease`      | The easing function to use for the autoDraw animation. Accepts any transition timing function within [the CSS spec](http://www.w3schools.com/cssref/css3_pr_transition-timing-function.asp) (eg. `linear`, `ease`, `ease-in`, `cubic-bezier`...). | -                                                                            |
| max               | Number         | `-Infinity` | Specify max value                                                                                                                                                                                                                                 | -                                                                            |
| min               | Number         | `Infinity`  | Specify min value, This is useful if you have multiple lines.                                                                                                                                                                                     | -                                                                            |

#### SVG Props

By default, all properties not recognized by Vue Trend will be delegated to the SVG.

This means that, among other properties, you can use:

- `stroke` to set a solid colour,
- `strokeWidth` to change the default line thickness,
- `strokeOpacity` to create a transparent line,
- `strokeLinecap`/`strokeLinejoin` to control the edges of your line,
- `strokeDasharray` to create a dashed line, and
- `strokeDashoffset` to control where the dashes start.

## Development

```bash
npm i
npm run dev
# open localhost:5173
```

### Documentation Site

```bash
npm i
npm run docs:dev
# open localhost:5173
```

## License

MIT
