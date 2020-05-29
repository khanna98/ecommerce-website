# Express + MongoDB - Ecommerce Website

This is the backend designed for a MERN stack based Ecommerce Website. This application uses [express](https://expressjs.com/) to manage the routes and middlewares and [passport](http://www.passportjs.org/) for authentication.

This website is under development and uses the following technologies: 

1. [MongoDB](https://www.mongodb.com/) - Database
2. [Node.js](https://nodejs.org/en/) - Logic 

For authenticating, it is using passport - the Google Strategy.

## Getting Started

To get started with using the application, you can clone this repository and follow the commonds to start using the app:

```
1. Firstly clone this repo
git clone https://github.com/khanna98/ecommerce-website.git

2. Install all the dependencies
npm install

3. Fill in the fields in the `.env` file in `config` folder

4. After all of this, run the following command
npm run dev

If you see the message on the console,  

API Server is running on port 3000., 

where 3000 is the port number defined in `.env` file, your dev server is successfully running.
```

## Folder Structure

The outer structure of the Express Application looks something like this.

```
  .
  ├── config
  ├── src
  ├── test
  ├── .gitignore
  ├── package.json
  ├── package-lock.json
  └── README.md
```

The `config` folder contains the `.env` file, that has the environment variables.

```
    config
    └── .env.development
``` 
**NOTE**: Before using Passport Google Strategy, you must register an application with Google. If you have not already done so, a new project can be created in the [Google Developers Console](https://console.developers.google.com/). Your application will be issued a client ID and client secret, which need to be provided to the strategy. You will also need to configure a redirect URI which matches the route in your application.

---

All the controllers, routes etc are present inside the `src` folder. Here is the structure for the src folder.

```
    src
     ├── controllers
     │   ├── cartController.js
     │   ├── orderController.js
     │   ├── productController.js
     │   ├── userController-JWT.js
     │   └── userController.js
     │
     ├── middleware
     │   ├── auth-jwt.js
     │   ├── auth.js
     │   └── passportAuth.js
     │
     ├── models
     │   ├── index.js
     │   ├── order.js
     │   ├── product.js
     │   ├── user-auth-jwt.js
     │   └── user.js
     │
     ├── routes
     │   ├── cart.js
     │   ├── order.js
     │   ├── passportAuth.js
     │   ├── product.js
     │   └── user.js
     │
     └── index.js
```

**Note**: The default route for all REST API calls is `api`.

--- 

This is application is using [mocha](https://mochajs.org/) for writing test. Further tests can be wriiten, although a basic test is written for reference.

```
    test
    └── test.js
``` 

## Dependencies

This application uses the following NPM modules to function properly: 

| Dependency |Version|
|----------|:-------------:|
| [bcryptjs](https://www.npmjs.com/package/bcrypt) | ^2.4.3 |
| [express](https://www.npmjs.com/package/express) | ^4.17.1 |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)| ^8.5.1 |
| [mocha](https://mochajs.org/) | ^7.2.0 | 
| [mongoose](https://www.npmjs.com/package/mongoose) | ^5.9.15 | 
| [passport](https://www.npmjs.com/package/passport) | ^0.4.1 | 
| [passport-google-oauth](https://www.npmjs.com/package/passport-google-oauth) | ^2.0.0 | 
| [passport-google-oauth20](https://www.npmjs.com/package/passport-google-oauth20) | ^2.0.0 | 
| [validator](https://www.npmjs.com/package/validator) | ^13.0.0 | 