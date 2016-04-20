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
    
    // initial stage, mock responses
    res.status(200);

    var project = {'projectname':'Project Name 1','projectid':'5703f9eb5306583d5a000018','current_practice':'Discovery',"semat_alphas": {"opportunity": "identified","requirements": "conceived","stakeholders": "recognised","team": "not established","way_of_working": "not established","work": "not established","software_system": "not established"},"users":[{"userid": "5703f9eb5306583d5a000118"}]};
    
    res.json({
      status: "success",
      project: project
    });
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


  return projectRouter;
};

module.exports = projectRoutes;
// the end
