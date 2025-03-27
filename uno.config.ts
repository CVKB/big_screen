// uno.config.ts
import { defineConfig } from 'unocss'


const designWidth = 1280
const designHeight = 1024

export default defineConfig({
  rules: [
    // 定义 vw 工具类，如 `vw-100` => `width: (100 / 1280) * 100vw`
    [/^vw-(\d+)$/, ([, num]) => ({ width: `${(Number(num) / designWidth) * 100}vw` })],
    // 定义 vh 工具类，如 `vh-20` => `height: (20 / 1024) * 100vh`
    [/^vh-(\d+)$/, ([, num]) => ({ height: `${(Number(num) / designHeight) * 100}vh` })],
    // 定义字体大小的 vh 工具类，如 `text-vh-18` => `font-size: (18 / 1024) * 100vh`
    [/^text-vh-(\d+)$/, ([, num]) => ({ 'font-size': `${(Number(num) / designHeight) * 100}vh` })],
  ],
})