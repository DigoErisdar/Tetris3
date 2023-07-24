import vue from '@vitejs/plugin-vue'
import {fileURLToPath} from 'url'

import {ConfigEnv, defineConfig} from 'vite'

export default (options: ConfigEnv) => {
    return defineConfig({
        plugins: [vue()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
    })

}
