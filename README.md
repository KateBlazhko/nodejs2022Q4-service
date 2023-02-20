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
git checkout docker_postgres
```

## Installing NPM modules (optionally)

```
npm install
```

## Rename .env.example to .env

## Running application
* Create empty database **library-service**

```
docker-compose up -d
```

* If you use pgAdmin refresh the database **library-service**

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

### For check: 
* **Pay attention**: Database files and logs to be stored in volumes pgdata. 

## DockerHub

https://hub.docker.com/repository/docker/kateblazhko/nodejs2022q4-service/general.

## Testing

After application running open new terminal and enter:

To scan it for security vulnerabilities

```
npm run scan
```

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
