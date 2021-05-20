Looney Exchange Monitor
# loonie-exchange-monitor

dev: John Gootee
for: FISPAN

node_modules are not included. before starting server, be sure to run:
## /api/v1/npm install
## /frontend/npm install

start the server:
/api/v1/npm start

start the frontend:
/frontend/npm start


The api will default to Port 3001.  Edit this by putting the new port in BOTH environment files:
-- /api/v1/lib/environment.ts
-- /frontend/src/environment.ts


The frontend runs on Port 3000


Tech I used:
  Language:
    Typescript
  API:
    NodeJS
    ExpressJS
  Frontend:
    React
    Bootstrap
    SASS