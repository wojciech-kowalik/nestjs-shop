<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Installation

```bash
$ yarn
```
## MongoDB configuration
```bash
$ cp .env.tmp .env
Change MONGO_DB_CONNECTION_STRING to proper one
```
## Mysql on Mac
```bash
$ brew install mysql
$ brew services start mysql
$ mysql_secure_installation
$ mysql -u root -p
```
### Add ormconfig.json
```json
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "YOUR_PASSWORD",
  "database": "YOUR_DATABASE",
  "entities": ["dist/**/**.entity{.ts,.js}"],
  "bigNumberStrings": false,
  "logging": true,
  "synchronize": true
}
```
### In case of error   
**_Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client_**   
Tip:
https://nicholaspretorius.github.io/til0054/   
1. `ALTER USER 'userName'@'hostName' IDENTIFIED WITH mysql_native_password BY 'passwordHere';`
2. `FLUSH PRIVILEGES;`
3. Stop and start MySQL server


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
