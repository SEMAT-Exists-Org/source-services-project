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
    projectlist.push({'projectname':'Project Name 1','projectid':'5703f9eb5306583d5a000018','current_practice':'Discovery','project_users':3});
    projectlist.push({'projectname':'Project Name 2','projectid':'5703f9eb5306583d5a000019','current_practice':'Discovery','project_users':2});
    projectlist.push({'projectname':'Project Name 3','projectid':'5703f9eb5306583d5a000020','current_practice':'','project_users':0});

    res.json({
      status: "success",
      projects: projectlist
    });    
  });

  // API resource to retrieve single project details
  projectRouter.get('/:projectid', function(req, res) {  
    
    // initial stage, mock responses
    res.status(200);

    var project = {'projectname':'Example Project 1','projectid':'5703f9eb5306583d5a000018','something':'something'};
    
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
    projectlist.push({'projectname':'Example Project 2','projectid':'5703f9eb5306583d5a000019','something':'something'});
    projectlist.push({'projectname':'Example Project 3','projectid':'5703f9eb5306583d5a000020','something':'something'});

    res.json({
      status: "success",
      projects: projectlist
    });    
  });

  // API resource to create a new project
  projectRouter.post('/', function(req, res) {  
    
    // initial stage, mock responses
    res.status(200);

    var project = {'projectname':'Example Project 1','projectid':'5703f9eb5306583d5a000018','something':'something'};
    
    res.json({
      status: "success",
      project: project
    });
  });

  // API resource to update an existing project
  projectRouter.put('/:projectid', function(req, res) {  
    
    // initial stage, mock responses
    res.status(200);

    var project = {'projectname':'Example Project 1','projectid':'5703f9eb5306583d5a000018','something':'something'};
    
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
      massage: "deleted"
    });
  });


  return projectRouter;
};

module.exports = projectRoutes;
// the end
