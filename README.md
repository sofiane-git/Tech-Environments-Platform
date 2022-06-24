# Skilleos Environments

Show technical environments availability.

### Stack

**_Front_** :

- Vue 3 / TypeScipt
- Pinia store
- Apollo-client
- Tailwind CSS
- Atomic Design

**_Back_** :

- Node / TypeScipt
- Express
- Apollo-server
- TypeGraphQl
- Mongo DB

### Project Setup

#### Create config files

**_In CLIENT AND SERVER folder, create a .env file_**

For .env in Client folder, you have to inform these keys :

- VITE_GOOGLE_CLIENT_ID
- VITE_SLACK_CHANNEL_PLATFORM
- VITE_BASE_URL
- VITE_PORT_SERVER

For .env in Server folder, you have to inform these keys :

- BASE_URL
- PORT
- NODE_ENV
- DATABASE_URL
- GOOGLE_CLIENT_ID
- SLACK_WEBHOOK_URL

**_Install modules_**

```sh
cd client && yarn && cd ../server && yarn && cd ..
```

_Reload your editor if errors persist_

**_Compile and Hot-Reload for Development with Docker_**

```sh
docker-compose -f docker-compose.dev.yml up --build
```
