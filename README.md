# OpenQR (open qa resource ) open-source solution for manage qa resources test-cases, bug-reports, security-errors, team

## Based on AdonisJS framework

## ER diagram

![alt text](./db.png)

### For start up the project

Install packages

```npm
  npm i
```

Packaging css and js

```npm
  npm run build
```
.env file
```
HOST=0.0.0.0
PORT=8080
NODE_ENV=development
APP_URL=http://${HOST}:${PORT}
CACHE_VIEWS=false
APP_KEY=w8HZi5GvyGdrHN6AFYyvwUNW3oCSKLMz
DB_CONNECTION=pg
DB_HOST=postgres
DB_PORT=5432
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=openbox
SESSION_DRIVER=cookie
HASH_DRIVER=bcrypt
```

Run the following command to run docker

```bash
sudo docker-compose up
```

### Migrations

Run the following command to run startup migrations.

Step 1

```bash
sudo docker exec -it app /bin/bash
```

Step 2

```js
adonis migration:run
```

### Seeds

Run the following command to run startup migrations.

Step 1

```bash
sudo docker exec -it app /bin/bash
```

Step 2

```js
adonis seed
```

### Open in browser link

[Open a OpenQR](http://0.0.0.0:8080/)
