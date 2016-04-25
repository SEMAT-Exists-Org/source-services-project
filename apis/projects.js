// User service
// Users API resources
// author @sauliuz

var util = require('util');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');
var fh = require('fh-mbaas-api');
var validator = require('validator');
var crypto = require('crypto');
var uuid = require('uuid');

// common methods
var helper = require('../utilities/helper.js');


function projectRoutes() {
  
  var projectRouter = new express.Router();
  projectRouter.use(cors());
  projectRouter.use(bodyParser());
  
  // API resource to get all projects
  projectRouter.get('/', function(req, res) {

    // initial stage, mock responses
    res.status(200);

    var projectlist = [];
    projectlist.push({'projectname':'AB Industries','projectid':'5703f9eb5306583d5a000018','current_practice':'Discovery',"semat_alphas": {"opportunity": "identified","requirements": "conceived","stakeholders": "recognised","team": "not established","way_of_working": "not established","work": "not established","software_system": "not established"},'users':[{"userid": "5703f9eb5306583d5a000118"},{"userid": "5703f9eb5306583d5a000119"}]});
    projectlist.push({'projectname':'Lufthansa','projectid':'5703f9eb5306583d5a000019','current_practice':'Discovery',"semat_alphas": {"opportunity": "identified","requirements": "conceived","stakeholders": "recognised","team": "not established","way_of_working": "not established","work": "not established","software_system": "not established"},'users':[{"userid": "5703f9eb5306583d5a000118"}]});
    projectlist.push({'projectname':'Deloitte Digital','projectid':'5703f9eb5306583d5a000020','current_practice':'',"semat_alphas": {"opportunity": "identified","requirements": "conceived","stakeholders": "recognised","team": "not established","way_of_working": "not established","work": "not established","software_system": "not established"},'users':[{"userid": "5703f9eb5306583d5a000118"}]});

    res.json({
      status: "success",
      projects: projectlist
    });    
  });

  // API resource to retrieve single project details
  projectRouter.get('/:projectid', function(req, res) {  
    
    // initial stage, mock responses
    res.status(200);

    var project = {'projectname':'Lufthansa','projectid':'5703f9eb5306583d5a000019','current_practice':'Discovery',"semat_alphas": {"opportunity": "identified","requirements": "conceived","stakeholders": "recognised","team": "not established","way_of_working": "not established","work": "not established","software_system": "not established"},'users':[{"userid": "5703f9eb5306583d5a000118"}]};

    res.json({
      status: "success",
      project: project
    });
  });

  // API resource to get all projects for specific user
  projectRouter.get('/user/:userid', function(req, res) {

    // initial stage, mock responses
    res.status(200);

    var projectlist = [];
    projectlist.push({'projectname':'AB Industries','projectid':'5703f9eb5306583d5a000018','current_practice':'Discovery',"semat_alphas": {"opportunity": "identified","requirements": "conceived","stakeholders": "recognised","team": "not established","way_of_working": "not established","work": "not established","software_system": "not established"},'users':[{"userid": "5703f9eb5306583d5a000118"},{"userid": "5703f9eb5306583d5a000119"}]});
    projectlist.push({'projectname':'Lufthansa','projectid':'5703f9eb5306583d5a000019','current_practice':'Discovery',"semat_alphas": {"opportunity": "identified","requirements": "conceived","stakeholders": "recognised","team": "not established","way_of_working": "not established","work": "not established","software_system": "not established"},'users':[{"userid": "5703f9eb5306583d5a000118"}]});
    projectlist.push({'projectname':'Deloitte Digital','projectid':'5703f9eb5306583d5a000020','current_practice':'',"semat_alphas": {"opportunity": "identified","requirements": "conceived","stakeholders": "recognised","team": "not established","way_of_working": "not established","work": "not established","software_system": "not established"},'users':[{"userid": "5703f9eb5306583d5a000118"}]});

    res.json({
      status: "success",
      projects: projectlist
    });    
  });
  
  // API resource to create a new project
  projectRouter.post('/', function(req, res) {

    // approach
    // 1. validate project_name and users from the request JSON payload
    // 2. create new project with the requrs details. project guid becomes a unique id.

    // retrieve request payload details
    var project_name = req.body.project_name || '';
    var users = req.body.users || '';

    // only progress if all required fields are present
    if (validator.isAlphanumeric(project_name) && (Object.prototype.toString.call(users) === '[object Array]')) {

      // validation passed
      // create the new project

      // TODO
      // semat alphas / alpha states relate to specific library
      // hardcoded for now, but to be dynamically pulled in the future
      var semat_alphas = {
        "opportunity": "not defined",
        "requirements": "not defined",
        "stakeholders": "not defined",
        "team": "not defined",
        "way_of_working": "not defined",
        "work": "not defined",
        "software_system": "not defined"
      } 

      // new project data
      var options = {
        "act": "create",
        "type": "sematProjects", // Entity/Collection name
        "fields": { 
          "project_name": ""+project_name,
          "current_practice":"",
          "semat_alphas": semat_alphas,
          "users": users
        }
      };

      // mongodb request
      fh.db(options, function (err, data) {               
        // db comms error
        if (err) {
          console.error("dbcomms error: " + err);
          // internal error response
          helper.internal500(res);             
        } 
        else { // new project created
                
          var project = {};
          project.project_name = data.fields.project_name;
          project.projectid = data.guid;
          project.current_practice = data.fields.current_practice;
          project.semat_alphas = data.fields.semat_alphas;

          // good to send the response
          res.status(200);
          res.json({
            status: "success",
            project: project,
            users: data.fields.users
          });
        }
      });
    }
    else { // malformed request, wrong request values
      helper.malformed400(res);    
    }
  });

  // API resource to update an existing project
  projectRouter.put('/:projectid', function(req, res) {  
    
    // initial stage, mock responses
    res.status(200);

    var project = {'projectname':'Project Name 1','projectid':'5703f9eb5306583d5a000018','current_practice':'Discovery',"semat_alphas": {"opportunity": "identified","requirements": "conceived","stakeholders": "recognised","team": "not established","way_of_working": "not established","work": "not established","software_system": "not established"},"users":[{"userid": "5703f9eb5306583d5a000118"}]};
    
    res.json({
      status: "success",
      project: project
    });
  });

  // API resource to delete an existing project
  projectRouter.delete('/:projectid', function(req, res) {  
    
    // initial stage, mock responses
    res.status(200);
    
    res.json({
      status: "success",
      massage: "project deleted"
    });
  });
  
  // Generic catch all
  // if non of the above routes are matched
  // provide generic error responses
  projectRouter.get('*', function(req, res) {

      // error response
      res.status(400);
      res.json({
        status: 'error',
        message: 'malformed request, check JSON schema',
        "code":"400"
      });
  });

  projectRouter.get('*', function(req, res) {

      // error response
      res.status(400);
      res.json({
        status: 'error',
        message: 'malformed request, check JSON schema',
        "code":"400"
      });
  });

  // end of resources
  return projectRouter;
};

module.exports = projectRoutes;
