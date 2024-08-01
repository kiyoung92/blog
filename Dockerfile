FROM node:20.12.2-alpine AS production

WORKDIR /usr/src/app

RUN npm install -g pnpm@9.0.6

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY copy_images.sh ./copy_images.sh

RUN chmod +x ./copy_images.sh

COPY . .

RUN ls

RUN ls ./public

RUN /bin/sh ./copy_images.sh

RUN ls ./public

RUN ls ./public/posts

RUN ls ./public/posts/make-blog

RUN pnpm run build

EXPOSE 3000

CMD [ "pnpm", "start" ]