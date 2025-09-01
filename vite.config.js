import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // 앱 업데이트 자동 반영
      manifest: {
        name: 'Diet App', // 전체 앱 이름
        short_name: 'Diet', // 홈 화면에 표시될 짧은 이름
        start_url: '/', // 시작 경로
        display: 'standalone', // 앱처럼 보이게 (브라우저 주소창 제거)
        background_color: '#EEFAFF', // 배경색
        theme_color: '#005A8B', // 상단 툴바 색상
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
