FROM node:22-alpine

WORKDIR /app/backend
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 3010

RUN npm run build
CMD ["npm", "run", "start"]