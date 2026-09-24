FROM node:22-alpine

WORKDIR /app/backend
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3010

RUN npm run db:generate && npm run build
CMD ["npm", "run", "start"]
