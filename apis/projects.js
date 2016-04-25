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
    
    // preparing mondodb query for all projects
    var options = {
      "act": "list",
      "type": "sematProjects" // Entity/Collection name    
    };

    fh.db(options, function (err, data) {
      
      if (err) {
        console.error("dbcomms error: " + err);
        // internal error response
        helper.internal500(res);
      }      
      else {
        // user list response
        res.status(200);
        res.json(data);                
      }    
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

    // approach
    // 1. validate the format of userid and  user token
    // 2. get details from User service which project id's he has attached
    // 3. get the details of array of projectids and return back to the client

    // security
    // 1. client application provides user token it received after user
    // has loged in via user service.
    // 2. project service is just proxying user token. If user token is not admin
    // project service is just proxying error response back

    var token = req.headers.token || '';
    var userid = req.params.userid || '';

    // validate if valid uuid value
    if (validator.isUUID(token,4) && validator.isAlphanumeric(userid)){

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

    }     
    else { // payload validation failed      
      helper.malformed400(res);
    }

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
  projectRouter.delete('/:guid', function(req, res) {  
    
    var guid = req.params.guid || '';

    // prepare project delete
    var options = {
      "act": "delete",
      "type": "sematProjects", // Entity/Collection name
      "guid": ""+guid
    };

    fh.db(options, function (err, data) {
      
      if (err) {
        console.error("dbcomms error: " + err);
        // internal error response
        helper.internal500(res);
      }      
      else {
        // if returned object is empty 
        // the project was not found in database
        if (data == {}){
          helper.notFound404(res);
        } 
        else { // succesfully deleted the project
          res.status(200);
          res.json({status: 'success', message: 'project deleted'});
        }                     
      }            
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
