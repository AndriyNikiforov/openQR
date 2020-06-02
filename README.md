# OpenQa open-source solution for manage qa resurces (test-cases, bug-reports), team, tasks

## Based on AdonisJS framework

## ER diagram

![alt text](./db.png)

### For start up the project

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
