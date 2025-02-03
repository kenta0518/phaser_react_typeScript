# ベースイメージを指定（Node.jsの最新安定バージョンを使用）
FROM node:22-slim

# 必要なパッケージをインストール
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends git \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 最新のnpmをインストール
RUN npm install -g npm@latest

# 作業ディレクトリを設定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# Remixプロジェクトの依存パッケージをインストール
RUN npm install

# ソースコードをコンテナにコピー
COPY . .

# ポートを公開 (Remixのデフォルトポート)
EXPOSE 3000

# Buildステップを実行（本番環境用）
RUN npm run build

# 開発モードで起動 (開発中に利用)
CMD ["npm", "run", "dev"]