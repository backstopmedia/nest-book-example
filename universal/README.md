# Nest-Angular-Universal

This project is a blending of [Tour of Heroes](https://next.angular.io/tutorial) and [Angular-Universal](https://github.com/enten/angular-universal) with [NestJS](https://github.com/nestjs/nest) as the server framework.

## About

The [Angular-Universal](https://github.com/enten/angular-universal) starter kit provides an excellent example of how to get started with an Angular Universal project. However, the goal of this project was to integrate [NestJS](https://github.com/nestjs/nest) as the server framework.

## Features

* [angular 6](https://github.com/angular/angular/tree/6.0.0-rc.6) as universal web application platform
* [module-map-ngfactory-loader](https://github.com/angular/universal/tree/v6.0.0-rc.1) as server side rendering of lazy routes
* [angular/cli 6](https://github.com/angular/angular-cli/tree/v6.0.0-rc.7) as code scaffolder
* [webpack 4](https://github.com/webpack/webpack/tree/v4.5.0) as module bundler
* [node](https://nodejs.org/dist/latest-v8.x/docs/api/) as server
* [NestJS 5](https://github.com/nestjs/nest) as request handler

## Getting started

Before you begin, you should ensure you have Docker installed and setup on your machine.

```shell
git clone https://github.com/patrickhousley/nest-angular-universal my-project
cd my-project
npm install
```

## Development server

This project makes use of Docker to run the NestJS server while also providing a support mechanism for additional development dependencies like Redis, PostgreSQL, etc. To start the development server, execute `docker-compose up` in a shell. In a separate shell, run `npm start` to start the Angular application.

**Note** Since development does not execute the NestJS server with the Angular universal bundle, changes to the Angular application may break universal rendering without knowing it. For this reason, be sure you build the project and use `node dist/server.js` to test out the universal bundle.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`. NestJS also contains a CLI that can be used for scaffolding if you would like.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist` directory. This performs a production level build of both the front-end and back-end applications.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

**TODO:** Need to implement testing for the back-end application. This will most likely require a separate npm script until a new Angular devkit builder for mocha/jasmine/jest/ava/tap/tape test runner.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

**TODO:** Need to implement testing for the back-end application. This will most likely require a separate npm script until a new Angular devkit builder for mocha/jasmine/jest/ava/tap/tape test runner.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
