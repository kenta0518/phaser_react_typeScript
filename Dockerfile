# ベースイメージを指定
FROM node:18

# 作業ディレクトリを設定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存パッケージをインストール
RUN npm install

# ソースコードをコンテナにコピー
COPY . .

# ポートを公開 (デフォルトで Vite が使うポート)
EXPOSE 3000

# 開発モードで起動
CMD ["npm", "run", "dev"]