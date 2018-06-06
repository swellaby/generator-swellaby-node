# generator-swell **** Currently in Alpha ****    
**** Note this is currently in Alpha ****  
  
Highly opinionated [Yeoman][yeoman-url] generator for various types of [Node.js][nodejs-url] ([Chatbots][chatbot-docs], [VSTS Extensions][vsts-docs], and more) plus coming soon: Angular and Aurelia projects with [TypeScript][typescript-url]. Yes, there are
others out there, but we wanted one that gave us a 100% of what we need. Pull Requests are encouraged and will be happily accepted (provided they pass the automated gates!).

[![NPM Stats Badge][nodeico-badge]][npmjs-package-url]  
  
[![NPM Version Badge][npmjs-version-badge]][npmjs-package-url]
[![npm][npmjs-downloads-badge]][npmjs-package-url]  
  
[![Travis CI Badge][travis-ci-build-status-badge]][travis-ci-url]
[![AppVeyor Status][appveyor-badge]][appveyor-url]
[![Circle CI Badge][circle-ci-build-status-badge]][circle-ci-url]
[![Test Results Badge][tests-badge]][appveyor-url]
[![Coveralls Badge][coveralls-badge]][coveralls-url]
[![SonarQube Quality Gate Badge][sonarqube-qualitygate-badge]][sonarqube-project-url]
[![SonarQube Maintainability Badge][sonarqube-maintainability-badge]][sonarqube-maintainability-url]

## Installation

Ensure you have the necessary prerequisites outlined below. Then install the generator globally (note, you may need to use sudo):
```sh
npm i -g generator-swell
```

### Prerequisites
This should be pretty obvious, but just in case here is what you will need:

- [Node.js][nodejs-url] We are developing on 8.x, but we also run our tests against 6.x, 8.x and 9.x
- [Yeoman][yeoman-url] 

If you don't have [Yeoman][yeoman-url] installed globally (note, you may need to use sudo):
```sh
npm i -g yo
```

## Usage
```sh
yo swell
```
See the [Usage Overview][generator-usage-overview-url] for detailed information about usage.
Note you will need to cd into the newly created directory if you specify an app name that is different than the name of the directory you execute the yo command from.

## Development  
First please read the [Contribution Guidelines][guidelines].  
The Swellaby Generator is developed using [Typescript][typescript-url].  
Here are some things you should know:  

- Run `npm install` to install dependencies  
- Run `npm run build` to clean, transpile, lint, test, and check-security  
- Run `npm link` (as admin) to install the locally cloned generator globally so that you can see how it behaves

[nodeico-badge]: https://nodei.co/npm/generator-swell.png?downloads=true&downloadRank=true&stars=true
[npmjs-version-badge]: https://img.shields.io/npm/v/generator-swell.svg
[npmjs-downloads-badge]: https://img.shields.io/npm/dt/generator-swell.svg
[npmjs-package-url]: https://www.npmjs.com/package/generator-swell
[yeoman-url]: http://yeoman.io
[nodejs-url]: https://nodejs.org/
[typescript-url]: http://www.typescriptlang.org/
[git-download-url]: https://git-scm.com/download
[travis-ci-build-status-badge]: https://travis-ci.org/swellaby/generator-swell.svg?branch=master
[travis-ci-url]: https://travis-ci.org/swellaby/generator-swell
[tests-badge]: https://img.shields.io/appveyor/tests/swellaby/generator-swell.svg?colorB=45BF17
[appveyor-badge]: https://ci.appveyor.com/api/projects/status/9cxyoaw8ob2684o4?svg=true
[appveyor-url]: https://ci.appveyor.com/project/swellaby/generator-swell
[circle-ci-build-status-badge]: https://circleci.com/gh/swellaby/generator-swell.svg?style=shield
[circle-ci-url]: https://circleci.com/gh/swellaby/generator-swell
[sonarqube-qualitygate-badge]: https://sonarcloud.io/api/project_badges/measure?project=swellaby%3Agenerator-swell&metric=alert_status
[sonarqube-project-url]: https://sonarcloud.io/dashboard?id=swellaby%3Agenerator-swell
[sonarqube-maintainability-badge]: https://sonarcloud.io/api/project_badges/measure?project=swellaby%3Agenerator-swell&metric=sqale_rating
[sonarqube-maintainability-url]: https://sonarcloud.io/component_measures?id=swellaby%3Agenerator-swell&metric=sqale_rating
[coveralls-badge]: https://coveralls.io/repos/github/swellaby/generator-swell/badge.svg
[coveralls-url]: https://coveralls.io/github/swellaby/generator-swell
[generator-usage-overview-url]: https://github.com/swellaby/generator-swell/blob/master/docs/USAGE-OVERVIEW.md
[guidelines]: ./CONTRIBUTING.md
[chatbot-docs]: docs/CHATBOT.md
[vsts-docs]: docs/VSTS-TASK.md