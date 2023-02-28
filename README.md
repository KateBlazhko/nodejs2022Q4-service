# Home Library Service

## Downloading

```
git clone https://github.com/KateBlazhko/nodejs2022Q4-service.git
```

## Change directory

```
cd nodejs2022Q4-service
```

## Change branch

```
git checkout auth_logger
```

## Installing NPM modules (optionally)

```
npm install
```

## Rename .env.example to .env

## Create folder for logs

```
mkdir ./src/logs
```

## Running application

### 1. You can do it by Docker

- Create empty database **library-service**

```
docker-compose build
docker-compose up -d
```

### Testing

After application running open new terminal and enter:

```
npm run test:auth:docker
```

### 2. You can do it by local postrgreSQL server

- run postgresql.service
- change variable POSTGRES_HOST=postgres to POSTGRES_HOST=localhost

```
npm run start:dev
```

### Testing

After application running open new terminal and enter:

```
npm run test:auth
```

## Auto-fix and format

```
npm run lint
```
