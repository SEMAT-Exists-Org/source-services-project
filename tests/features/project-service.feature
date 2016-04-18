@core
Feature:
	Project service exposes API resources for managing SEMAT projects.
	Project service allows to create new projects, manage existing ones, 
	assign users to the project. Below scenarios are for validating that required
	funcionality is working as expected

	Scenario: As a client application I should get the list of all created projects
		Given I set User-Agent header to cucumber-tests
		When I GET /projects
		Then response code should be 200
		And response body should be valid json

	Scenario: As a client application I should get the detailed information about 
	the specific project by its id
		Given I set User-Agent header to cucumber-tests
		When I GET /projects/5703f9eb5306583d5a000018
		Then response code should be 200
		And response body should be valid json

	Scenario: As a client application I should get the detailed information about 
	all the projects specific user is associated with
		Given I set User-Agent header to cucumber-tests
		When I GET /projects/user/5703f9eb5306583d5a000018
		Then response code should be 200
		And response body should be valid json

	Scenario: As a client application I should be able to create new project
		Given I set User-Agent header to cucumberjs-tests
		And I set Content-Type header to application/json
		And I set body to {"projectname":"Existing Name"}
		When I POST to /projects
		Then response code should be 200
		And response body should be valid json

	Scenario: As a client application I should be able to update existing project
		Given I set User-Agent header to cucumberjs-tests
		And I set Content-Type header to application/json
		And I set body to {"projectname":"New Name"}
		When I PUT /projects/5703f9eb5306583d5a000018
		Then response code should be 200
		And response body should be valid json

	Scenario: As a client application I should delete the project by specific id
		Given I set User-Agent header to cucumber-tests
		And I set Content-Type header to application/json
		When I DELETE /projects/5703f9eb5306583d5a000018
		Then response code should be 200
		And response body should be valid json
