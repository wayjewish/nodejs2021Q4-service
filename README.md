# RS School REST service

## Endpoints

- `User` (with attributes):
  ```javascript
  { id, name, login, password }
  ```
- `Board` (set of `columns`):
  ```javascript
  { id, title, columns }
  ```
- `Column` (set of tasks):
  ```javascript
   { id, title, order }
  ```
- `Task`:
  ```javascript
  {
    id,
    title,
    order,
    description,
    userId, //assignee
    boardId,
    columnId
  }
  ```
- `Login`:
  ```javascript
  {
    login,
    password
  }
  ```
- `File`:
  ```javascript
  {
    file, //multipart/form-data
  }
  ```

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Docker

```
docker-compose up
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run all test with authorization

```
npm run test:auth
```
## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

## Load tests
### Express
```
All VUs finished. Total time: 11 seconds

--------------------------------
Summary report @ 18:08:59(+0300)
--------------------------------

http.codes.200: ................................................................ 400
http.codes.201: ................................................................ 100
http.request_rate: ............................................................. 52/sec
http.requests: ................................................................. 500
http.response_time:
  min: ......................................................................... 1
  max: ......................................................................... 192
  median: ...................................................................... 7.9
  p95: ......................................................................... 153
  p99: ......................................................................... 186.8
http.responses: ................................................................ 500
vusers.completed: .............................................................. 100
vusers.created: ................................................................ 100
vusers.created_by_name.test: ................................................... 100
vusers.session_length:
  min: ......................................................................... 167.3
  max: ......................................................................... 391.1
  median: ...................................................................... 223.7
  p95: ......................................................................... 340.4
  p99: ......................................................................... 391.6
```

### Fastify
```
All VUs finished. Total time: 11 seconds

--------------------------------
Summary report @ 18:10:53(+0300)
--------------------------------

http.codes.200: ................................................................ 400
http.codes.201: ................................................................ 100
http.request_rate: ............................................................. 70/sec
http.requests: ................................................................. 500
http.response_time:
  min: ......................................................................... 1
  max: ......................................................................... 233
  median: ...................................................................... 7.9
  p95: ......................................................................... 153
  p99: ......................................................................... 228.2
http.responses: ................................................................ 500
vusers.completed: .............................................................. 100
vusers.created: ................................................................ 100
vusers.created_by_name.test: ................................................... 100
vusers.session_length:
  min: ......................................................................... 167.6
  max: ......................................................................... 485.6
  median: ...................................................................... 223.7
  p95: ......................................................................... 441.5
  p99: ......................................................................... 487.9
```


