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


function userRoutes() {
  
  var userRouter = new express.Router();
  userRouter.use(cors());
  userRouter.use(bodyParser());

  
  // API resource to get all users.
  // should only acceesible for administrative users (via admin user tokens).
  userRouter.get('/', function(req, res) {

    // approach
    // 1. validate that the token submited in the request is still in the cache (if not ask for relogin)
    // 2. validate if the user attached to the token has admin priviledges (400 bad request if they dont)
    // 3. return the list of users if requesting user is admin.

    var token = req.headers.token || '';

    // validate if valid uuid value
    if (validator.isUUID(token,4)){
      
      // find if uuid token is in the cache
      var cacheOptions = {
        "act": "load",
        "key": ""+token,
      };

      fh.cache(cacheOptions, function (err, cachedObject) {
        
        var userData = cachedObject;

        // redis comms error
        if (err) {

          console.error("dbcomms error: " + err);

          // error response
          res.status(500);
          res.json({
            status: 'error',
            message: 'internal error',
            "code":"500"
          });
        }

        else if (userData == null){

          // no token in the cache found, relogin
          res.status(302);
          res.json({
            status: 'error',
            message: 'user must relogin',
            "code":"302"
          });          
        }

        else {

          // JSON.parse fails if object is not JSON
          try {
            var userDataJSON = JSON.parse(userData);
          } 
          catch (e){

            console.error("cached object not JSON: "+e);

            // error response
            res.status(500);
            res.json({
              status: 'error',
              message: 'internal error',
              "code":"500"
            });
          }

          // only allow all user lookup if user is admin user
          if (userDataJSON.fields.role == "admin") {

            // all user lookup
            var options = {
              "act": "list",
              "type": "sematUsers" // Entity/Collection name    
            };

            // db query
            fh.db(options, function (err, data) {
              
              if (err) {
                console.error("dbcomms error: " + err);

                // error response
                res.status(500);
                res.json({
                  status: 'error',
                  message: 'internal error',
                  "code":"500"
                });
              } 
              
              else {              
               
                // we have got the response
                // removing password field before sending back
                data.list.forEach(function(user){
                  delete user.fields.password;
                });

                // user list response
                res.status(200);
                res.json(data);                
              }
            
            });
          }

          else { // not admin user

            // generic error response
            res.status(400);
            res.json({
              status: 'error',
              message: 'bad request',
              "code":"400"
            });

          }
        }
      });
    } else { // no token suplie in the request

      // generic error response
      res.status(400);
      res.json({
        status: 'error',
        message: 'bad request',
        "code":"400"
      });
    }
  });

  // API resource to retrieve single user details (admin resource)
  userRouter.get('/:guid', function(req, res) {
      
    // approach
    // 1. request header has token in it
    // 2. compare if the token is admin level
    // 3. retrieve user details by email if exists

    var token = req.headers.token || '';
    var guid = req.params.guid || '';

    // validate if valid uuid value
    if (validator.isUUID(token,4)){
      
      // find if uuid token is in the cache
      var cacheOptions = {
        "act": "load",
        "key": ""+token,
      };

      fh.cache(cacheOptions, function (err, cachedObject) {
        
        var userData = cachedObject;

        // redis comms error
        if (err) {

          console.error("dbcomms error: " + err);

          // error response
          res.status(500);
          res.json({
            status: 'error',
            message: 'internal error',
            "code":"500"
          });
        }

        else if (userData == null){

          // no token in the cache found, relogin
          res.status(302);
          res.json({
            status: 'error',
            message: 'user must relogin',
            "code":"302"
          });          
        }

        else {

          // JSON.parse fails if object is not JSON
          try {
            var userDataJSON = JSON.parse(userData);
          } 
          catch (e){

            console.error("cached object is not JSON: "+e);

            // error response
            res.status(500);
            res.json({
              status: 'error',
              message: 'internal error',
              "code":"500"
            });
          }

          // only allow all user lookup if user is admin user
          if (userDataJSON.fields.role == "admin") {

            // all user lookup
            var options = {
              "act": "read",
              "type": "sematUsers",
              "guid": ""+guid    
            };

            // db query
            fh.db(options, function (err, data) {
              
              if (err) {
                console.error("dbcomms error: " + err);

                // error response
                res.status(500);
                res.json({
                  status: 'error',
                  message: 'internal error',
                  "code":"500"
                });
              } 
              
              else {              
               
                // we have got the response
                // removing password field before sending back
                delete data.fields.password;

                // user details response
                res.status(200);
                res.json(data);                
              }
            
            });
          }

          else { // not admin user

            // generic error response
            res.status(400);
            res.json({
              status: 'error',
              message: 'bad request',
              "code":"400"
            });

          }
        }
      });
    } else { // no token suplie in the request

      // generic error response
      res.status(400);
      res.json({
        status: 'error',
        message: 'bad request',
        "code":"400"
      });
    }
  });

  // Update single user details (admin resource)
  userRouter.put('/:guid', function(req, res) {
    
    var token = req.headers.token || '';
    var guid = req.params.guid || '';

    // preparing for validation
    var firstname = req.body.firstname || '';
    var lastname = req.body.lastname || '';
    var email = req.body.email || '';
    var role = req.body.role || '';
       

    // validate if valid uuid value
    if (validator.isUUID(token,4) && 
        validator.isAlphanumeric(firstname) && 
        validator.isAlphanumeric(lastname) && 
        validator.isEmail(email) && validator.isAlphanumeric(role)){
      
      // find if uuid token is in the cache
      var cacheOptions = {
        "act": "load",
        "key": ""+token,
      };

      fh.cache(cacheOptions, function (err, cachedObject) {
        
        var userData = cachedObject;

        // redis comms error
        if (err) {

          console.error("dbcomms error: " + err);

          // error response
          res.status(500);
          res.json({
            status: 'error',
            message: 'internal error',
            "code":"500"
          });
        }

        else if (userData == null){

          // no token in the cache found, relogin
          res.status(302);
          res.json({
            status: 'error',
            message: 'user must relogin',
            "code":"302"
          });          
        }

        else {

          // JSON.parse fails if object is not JSON
          try {
            var userDataJSON = JSON.parse(userData);
          } 
          catch (e){

            console.error("cached object is not JSON: "+e);

            // error response
            res.status(500);
            res.json({
              status: 'error',
              message: 'internal error',
              "code":"500"
            });
          }

          // only allow all user lookup if user is admin user
          if (userDataJSON.fields.role == "admin") {

            // first we get the user by id
            var options = {
              "act": "read",
              "type": "sematUsers",
              "guid": ""+guid 
            };

            fh.db(options, function (err, entity) {

              

              // this will be updated
              var entityToUpdate = entity.fields;

              console.log(entityToUpdate);

              entityToUpdate.firstname = firstname;
              entityToUpdate.lastname = lastname;
              entityToUpdate.email = email;
              entityToUpdate.role = role;
              
              var options = {
                "act": "update",
                "type": "sematUsers",
                "guid": ""+guid,
                "fields": entityToUpdate
              };

              // db query
              fh.db(options, function (err, data) {
                
                if (err) {
                  console.error("dbcomms error: " + err);

                  // error response
                  res.status(500);
                  res.json({
                    status: 'error',
                    message: 'internal error',
                    "code":"500"
                  });
                } 
                
                else {              
                 

                  // removing password field before sending back
                  delete data.fields.password;

                  // user details response
                  res.status(200);
                  res.json({status: 'success', user:data});                
                }
              
              });
            });            
          }

          else { // not admin user

            // generic error response
            res.status(400);
            res.json({
              status: 'error',
              message: 'bad request',
              "code":"400"
            });

          }
        }
      });
    } 
    else { // no token suplie in the request

      // generic error response
      res.status(400);
      res.json({
        status: 'error',
        message: 'malformed request, check JSON schema',
        "code":"400"
      });
    } 

  });

  // API resource to update single user details (admin resource)
  userRouter.delete('/:guid', function(req, res) {

    
    var token = req.headers.token || '';
    var guid = req.params.guid || '';

    // validate if valid uuid value
    if (validator.isUUID(token,4)){
      
      // find if uuid token is in the cache
      var cacheOptions = {
        "act": "load",
        "key": ""+token,
      };

      fh.cache(cacheOptions, function (err, cachedObject) {
        
        var userData = cachedObject;

        // redis comms error
        if (err) {

          console.error("dbcomms error: " + err);

          // error response
          res.status(500);
          res.json({
            status: 'error',
            message: 'internal error',
            "code":"500"
          });
        }

        else if (userData == null){

          // no token in the cache found, relogin
          res.status(302);
          res.json({
            status: 'error',
            message: 'user must relogin',
            "code":"302"
          });          
        }

        else {

          // JSON.parse fails if object is not JSON
          try {
            var userDataJSON = JSON.parse(userData);
          } 
          catch (e){

            console.error("cached object is not JSON: "+e);

            // error response
            res.status(500);
            res.json({
              status: 'error',
              message: 'internal error',
              "code":"500"
            });
          }

          // only allow all user lookup if user is admin user
          if (userDataJSON.fields.role == "admin") {

            // user delete
            var options = {
              "act": "delete",
              "type": "sematUsers", // Entity/Collection name
              "guid": ""+guid
            };

            // db query
            fh.db(options, function (err, data) {
              
              if (err) {
                console.error("dbcomms error: " + err);

                // error response
                res.status(500);
                res.json({
                  status: 'error',
                  message: 'internal error',
                  "code":"500"
                });
              } 
              
              else {              
               
                // user details response
                res.status(200);
                res.json({status: 'success'});                
              }
            
            });
          }

          else { // not admin user

            // generic error response
            res.status(400);
            res.json({
              status: 'error',
              message: 'bad request',
              "code":"400"
            });

          }
        }
      });
    } else { // no token suplie in the request

      // generic error response
      res.status(400);
      res.json({
        status: 'error',
        message: 'bad request',
        "code":"400"
      });
    }  

  });

  // API resource for user login.
  userRouter.post('/login', function(req, res) {
      
    // approach
    // 1. get the username and password from the JSON payload
    // 2. validate the payloads with regex (username should be email, password - no weird stuff)
    // 3. request to user database (403 if not found)
    // 4. for found users, generate the token, store in the cashe. send back the username, token and TTL

    // retrieve request payload details
    var username = req.body.username || '';
    var password = req.body.password || '';

    // only progress if all required fields are present
    if (validator.isEmail(username) && validator.isAlphanumeric(password)) {

      // validation passed
      // find user in db
      var options = {
        "act": "list",
        "type": "sematUsers", // Entity/Collection name
        "eq": {
          "email":""+username
        }     
      };

      // mongodb request
      fh.db(options, function (err, data) {
        
        // db comms error
        if (err) {
          console.error("dbcomms error: " + err);

          // error response
          res.status(500);
          res.json({
            status: 'error',
            message: 'internal error',
            "code":"500"
          });
        }

        else {
          
          // found the user
          if (data.count == 1) {
                       
            var md5Password = crypto.createHash('md5').update(password).digest("hex");

            // user data match
            if (md5Password == data.list[0].fields.password && username == data.list[0].fields.email) {
              
              // generate uuid
              var userUuid = uuid.v4();

              // cache the token
              var cacheOptions = {
                "act": "save",
                "key": ""+userUuid,
                "value":""+JSON.stringify(data.list[0]),
                "expire": 900 // Expiry time in seconds.
              };

              fh.cache(cacheOptions, function (err, cachedObject) {
                // redis comms error
                if (err) {

                  console.error("dbcomms error: " + err);

                  // error response
                  res.status(500);
                  res.json({
                    status: 'error',
                    message: 'internal error',
                    "code":"500"
                  });
                }
                
                // good to send response
                res.status(200);
                res.json({
                  status: "success",
                  firstname: ""+data.list[0].fields.firstname,
                  lastname: ""+data.list[0].fields.lastname,
                  email:""+data.list[0].fields.email,
                  role:""+data.list[0].fields.role,
                  guid:""+data.list[0].guid,
                  token:""+userUuid
                });

              });           
            
            }
            else { // user data mismatch
              
              // generic error response
              res.status(400);
              res.json({
                status: 'error',
                message: 'unsuccessful login',
                "code":"400"
              });
            }

          }
          
          else { // user with this email is not found

            // generic error response
            res.status(400);
            res.json({
              status: 'error',
              message: 'unsuccessful login',
              "code":"400"
            });
          }

        }
      });

    } 
    else { // payload validation failed 

      // error response
      res.status(400);
      res.json({
        status: 'error',
        message: 'malformed request, check JSON schema',
        "code":"400"
      });

    }

  }); // end of /login resource


  // API resource for user login.
  userRouter.post('/logout', function(req, res) {
    
    // response
    res.status(200);
    res.json({status: 'success'});     

  });

  // API resource to create new user registration.
  userRouter.post('/register', function(req, res) {
    
    // approach
    // 1. get the username and password from the JSON payload
    // 2. validate the payloads with regex ()
    // 3. add user to the database, make them low level user by default (admin users cannot be created by mobile client)
    // 4. if create is success, generate the token, store in the cashe. send back the username, token and TTL

    // retrieve request payload details
    var firstname = req.body.firstname || '';
    var lastname = req.body.lastname || '';
    var email = req.body.email || '';
    var password = req.body.password || '';

    // only progress if all required fields are present
    if (validator.isAlphanumeric(firstname) && validator.isAlphanumeric(lastname) && validator.isEmail(email) && validator.isAlphanumeric(password)) {

      // validation passed
      // before creating new user record, verify if email address doesnt exist
      var options = {
        "act": "list",
        "type": "sematUsers", // Entity/Collection name
        "eq": {
          "email":""+email
        }     
      };

      // mongodb request
      fh.db(options, function (err, data) {
        
        // db comms error
        if (err) {
          console.error("dbcomms error: " + err);

          // error response
          res.status(500);
          res.json({
            status: 'error',
            message: 'internal error',
            "code":"500"
          }); 


        } 
        else {
          
          // if result count is more then 0 email is already in the db
          if (data.count != 0) {

            // error response
            res.status(409);
            res.json({
              status: 'error',
              message: 'email is not unique',
              "code":"409"
            });          
          } 

          else { // email is unique

            // new user data
            var options = {
              "act": "create",
              "type": "sematUsers", // Entity/Collection name
              "fields": { 
                "firstname": ""+firstname,
                "lastname": ""+lastname,
                "email":""+email,
                "password":""+crypto.createHash('md5').update(password).digest("hex"),
                "role":"user"
              }
            };


            // another mongodb request
            fh.db(options, function (err, data) {
          
              // db comms error
              if (err) {
                console.error("dbcomms error: " + err);

                // error response
                res.status(500);
                res.json({
                  status: 'error',
                  message: 'internal error',
                  "code":"500"
                });

              
              } 
              else { // new user created

                // generate uuid token
                var userUuid = uuid.v4();

                // cache the token
                var cacheOptions = {
                  "act": "save",
                  "key": ""+userUuid,
                  "value":""+JSON.stringify(data),
                  "expire": 900 // Expiry time in seconds.
                };

                fh.cache(cacheOptions, function (err, cachedObject) {
                  
                  // redis comms error
                  if (err) {

                    console.error("dbcomms error: " + err);

                    // error response
                    res.status(500);
                    res.json({
                      status: 'error',
                      message: 'internal error',
                      "code":"500"
                    });
                  }
                  
                  // good to send the response
                  res.status(200);
                  res.json({
                    status: "success",
                    firstname: ""+data.fields.firstname,
                    lastname: ""+data.fields.lastname,
                    email:""+data.fields.email,
                    role:""+data.fields.role,
                    guid:""+data.guid,
                    token:""+userUuid
                  });
                });   
              }
            });     
          }
        }
      }); // end of original db query

     
    } 
    else { // payload validation failed 

      // error response
      res.status(400);
      res.json({
        status: 'error',
        message: 'malformed request, check JSON schema',
        "code":"400"
      });

    }

  });  // end of /register resource

  
  // end of users resources
  // any new resources shuld go here

  return userRouter;
};

module.exports = userRoutes;
// the end
