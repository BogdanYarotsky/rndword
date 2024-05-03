FROM zenika/alpine-chrome:with-node
USER root
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . ./
EXPOSE 3000
ENV PORT 3000
RUN npm run build
CMD ["npm", "run", "start"]