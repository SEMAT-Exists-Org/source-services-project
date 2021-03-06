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

	Scenario: As a client application I should get information about project by its id
		Given I set User-Agent header to cucumber-tests
		When I GET /projects/574dcd5969b2b461a1000002
		Then response code should be 200
		And response body should be valid json

	Scenario: As a client application I should get information about all the user projects
		Given I set User-Agent header to cucumber-tests
		And I set token header to c8cb2c19-06e3-47c8-97e5-99b4a864cf25
		When I GET /projects/user/5703f9eb5306583d5a000018
		Then response code should be 302
		And response body should be valid json

	Scenario: As a client application I should be able to create a new project
		Given I set User-Agent header to cucumberjs-tests
		And I set Content-Type header to application/json
		And I set body to {"project_name":"NewProjectName"}
		When I POST to /projects
		Then response code should be 200
		And response body should be valid json

	Scenario: As a client application I should not create new project with spaces in project name
		Given I set User-Agent header to cucumberjs-tests
		And I set Content-Type header to application/json
		And I set body to {"project_name":"New ProjectName"}
		When I POST to /projects
		Then response code should be 400
		And response body should be valid json

	Scenario: As a client application I should be able to update existing project
		Given I set User-Agent header to cucumberjs-tests
		And I set Content-Type header to application/json
		And I set body to {"semat_alphas":{"opportunity":"identified","requirements":"identified","stakeholders":"not_defined","team":"not_defined","way_of_working":"not_defined","work":"not_defined","software_system":"not_defined"},"history":[{"time":"2016-05-31 16:19:33","message":"new update"}]}
		When I PUT /projects/5721e0eea36a8b556c000008
		Then response code should be 200
		And response body should be valid json

	Scenario: As a client application I should delete the project by specific id
		Given I set User-Agent header to cucumber-tests
		And I set Content-Type header to application/json
		When I DELETE /projects/5703f9eb5306583d5a000018
		Then response code should be 404
		And response body should be valid json
