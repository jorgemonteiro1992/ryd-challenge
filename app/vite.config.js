import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
    resolve:{
        alias:{
            '@': fileURLToPath( new URL( './src' , import.meta.url ) )
        }
    },
    plugins: [ vue(), eslint() ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import '@/styles/utils/_variables.scss';
                    @import '@/styles/utils/_mixins.scss';
                `
            }
        }
    },
    server: {
        port: 3000
    }
});