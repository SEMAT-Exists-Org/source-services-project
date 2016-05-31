### Project Service

Project service is responsible for providing resources for creating and managing SEMAT projects. 
Consumed by mobile and web client apps.

#### Running Project Service locally

Project service is a NodeJS application. 

It is designed to run locally on developers box or to be deployed to the cloud instance of [RedHat Mobile Application platform](https://www.redhat.com/en/technologies/mobile/application-platform).

**Important:** *Project currently only supports NodeJS version v0.10.30*

In order to run this service locally on developer machine, you have to have [NodeJS (and npm)](https://nodejs.org/en/) + [MongoDB](https://www.mongodb.org/downloads#production) (default ports) + [Redis](http://redis.io) (default ports) installed an running.
Developers also need [Grunt](http://gruntjs.com/getting-started) for managing tasks.

Project service will detect that its running on local environment and will connect to the the default ports of local MongoDB and Redis instances.

First switch to the Node.js v0.10.30 and install all the dependencies

    nvm use v0.10.30
    npm install

Make sure Grunt.js is installed globally

	npm install -g grunt-cli
	
After npm finishes installing all dependencies, you can start the service with 

	grunt serve
	
By default application will be listening on localhost port 8002

#### API Resources

Project service exposes the following resources

	GET /projects
	GET /projects/{projectid}
	GET /projects/{projectid}/history	
	GET /projects/user/{userid}
	
	POST /projects	
	PUT /projects/{projectid}
	DELETE /projects/{projectid}

#### JSON Schemas

The request / response examples and JSON schemas for communication with Project service are documented in the [SCHEMAS description document](https://github.com/SEMAT-Exists-Org/source-services-project/blob/master/SCHEMAS.md).

#### RedHat Mobile Application Platform deployment

If you are deploying this service as a cloud application to RedHat Mobile Application platfrom, git push the code to the platform and [follow the instructions to deploy cloud application to the environment](http://docs.feedhenry.com/v3/product_features/cloud_apps.html) of your choice.

All contirbutions (pull requests) and feedback (GitHub comments) are welcome!