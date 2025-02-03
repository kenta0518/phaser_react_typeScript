// vite.config.ts
import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
    plugins: [
      reactRouter(), // React Router v7 サポート
      tsconfigPaths(), // TypeScript config paths support
    ],
    server: {
      host: true, // ローカルネットワークアクセスを許可
      port: 3000, // 開発サーバーのポートを設定
      strictPort: true, // 指定したポートが使用中の場合エラーをスロー
      watch: {
        usePolling: true, // ファイル変更監視方法の設定（特に Docker 環境で有効）
      },
    },
    resolve: {
      alias: {
        // 必要に応じて Remix のディレクトリ構造に合わせたエイリアスを設定
        '@components': '/src/components',
        '@utils': '/src/utils',
      },
    },
    optimizeDeps: {
      include: ['phaser'], // Phaser.js を事前ビルドに含める
    },
    ssr: {
      external: ['phaser'], // SSR環境でphaserを外部モジュールとして扱う
    },
    build: {
      rollupOptions: {
        external: ['phaser'], // SSR時にphaserを外部モジュールとして扱う
        output: {
          manualChunks(id) {
            if (id.includes('phaser')) {
              return 'phaser'; // Phaser.js を個別チャンクに分割
            }
          },
        },
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: isProduction, // 本番時にコンソール出力を削除
          drop_debugger: isProduction, // 本番時にデバッガを削除
        },
        format: {
          comments: false, // コメントを削除
        },
      },
    },
  };
});