### Nemo - Dental Clinic Management System

## Setting up local environment:

Prerequisites:
- Install node.js verison 16.14.0. and npm version 8.3.1
- Enter the project root directory and run `npm install`
- cd into client direcotry and run `npm run start`
- Similarly cd in to server directory and run `npm run start`
- Great! You have successfully started your client and server. 

### Connect to Heroku Database:
- git pull on `develop` branch.
- run `cd server` and edit the env file as follows:
- The .env file should only have these entries.
- JWTSECRET 
- DATABASE_URL
> Get credentials from the owner of this repo.

### Connect your pgAdmin to the Heroku database.
- Follow steps on this link https://medium.com/@vapurrmaid/getting-started-with-heroku-postgres-and-pgadmin-run-on-part-2-90d9499ed8fb
> Get credentials from the owner of this repo.
