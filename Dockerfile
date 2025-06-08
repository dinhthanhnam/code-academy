FROM node:22 as dev
# Chạy với user node có sẵn (UID 1000)
USER node

WORKDIR /var/www

# COPY --chown=node:node package.json ./

# RUN npm install --loglevel verbose

COPY --chown=node:node . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
