### Project Service

Project service is responsible for providing resources for creating and managing SEMAT projects. Consumed by mobile and web client apps.

Resources available:

	GET /projects
	GET /projects/{projectid}
	GET /projects/user/{userid}
	
	POST /projects
	PUT /projects/{projectid}
	DELETE /projects/{projectid}
	
Below are the example requests / responses.

Where applicable, JSON schemas are provided for request payloads. JSON Schemas are based on the [JSON data format](http://json-schema.org/).

### Project Service Resources

#### GET /projects

This resource retrieves all the created projects.

*Request*

	GET /projects
	
*Response*
	
```json
{
  "status": "success",
  "projects": [
    {
      "projectname": "AB Industries",
      "projectid": "5703f9eb5306583d5a000018",
      "current_practice": "Discovery",
      "semat_alphas": {
        "opportunity": "identified",
        "requirements": "conceived",
        "stakeholders": "recognised",
        "team": "not established",
        "way_of_working": "not established",
        "work": "not established",
        "software_system": "not established"
      },
      "history": [
        {
          "time": "2016-05-31 15:04:34",
          "message": "project created"
        }
      ]
    },
    {
      "projectname": "Lufthansa",
      "projectid": "5703f9eb5306583d5a000019",
      "current_practice": "Discovery",
      "semat_alphas": {
        "opportunity": "identified",
        "requirements": "conceived",
        "stakeholders": "recognised",
        "team": "not established",
        "way_of_working": "not established",
        "work": "not established",
        "software_system": "not established"
      },
      "history": [
          {
            "time": "2016-05-29 15:00:34",
            "message": "project created"
          }
      ]
    },
    {
      "projectname": "Deloitte Digital",
      "projectid": "5703f9eb5306583d5a000020",
      "current_practice": "",
      "semat_alphas": {
        "opportunity": "identified",
        "requirements": "conceived",
        "stakeholders": "recognised",
        "team": "not established",
        "way_of_working": "not established",
        "work": "not established",
        "software_system": "not established"
      },
      "history": [
          {
            "time": "2016-04-20 14:00:34",
            "message": "project created"
          }
      ]
    }
  ]
}	
```

*Internal Error*

	
```json
{
  "status": "error",
  "message": "internal error",
  "code": "500"
}
```

*No projects*

```json
{
  "status": "error",
  "message": "no projects found",
  "code": "404"
}
```
	
#### GET /projects/{projectid}

This resource retrieves the details about the specific project.

*Request*

	GET /projects/{projectid}
	
*Response*

```json
{
  "status": "success",
  "project": {
    "projectname": "Lufthansa",
    "projectid": "5703f9eb5306583d5a000019",
    "current_practice": "Discovery",
    "semat_alphas": {
      "opportunity": "identified",
      "requirements": "conceived",
      "stakeholders": "recognised",
      "team": "not established",
      "way_of_working": "not_defined",
      "work": "not_defined",
      "software_system": "not_defined"
    },
    "history": [
        {
            "time": "2016-05-29 15:00:34",
            "message": "project created"
        }
    ]
  }
}
```
	
*Internal Error*
	
```json
{
  "status": "error",
  "message": "internal error",
  "code": "500"
}
```

*No projects*

```json
{
  "status": "error",
  "message": "project not found",
  "code": "404"
}
```

#### GET /projects/user/{userid}

This resource retrieves all the projects assigned to specific user.

*Request*

	GET /projects/user/{userid}
	
*Response*
	
```json
{
  "status": "success",
  "projects": [
    {
      "projectname": "AB Industries",
      "projectid": "5703f9eb5306583d5a000018",
      "current_practice": "Discovery",
      "semat_alphas": {
        "opportunity": "identified",
        "requirements": "conceived",
        "stakeholders": "recognised",
        "team": "not_established",
        "way_of_working": "not_established",
        "work": "not_established",
        "software_system": "not_established"
      },
      "users": [
        {
          "userid": "5703f9eb5306583d5a000118"
        },
        {
          "userid": "5703f9eb5306583d5a000119"
        }
      ]
    },
    {
      "projectname": "Lufthansa",
      "projectid": "5703f9eb5306583d5a000019",
      "current_practice": "Discovery",
      "semat_alphas": {
        "opportunity": "identified",
        "requirements": "conceived",
        "stakeholders": "recognised",
        "team": "not established",
        "way_of_working": "not established",
        "work": "not established",
        "software_system": "not established"
      },
      "users": [
        {
          "userid": "5703f9eb5306583d5a000118"
        }
      ]
    },
    {
      "projectname": "Deloitte Digital",
      "projectid": "5703f9eb5306583d5a000020",
      "current_practice": "",
      "semat_alphas": {
        "opportunity": "identified",
        "requirements": "conceived",
        "stakeholders": "recognised",
        "team": "not established",
        "way_of_working": "not established",
        "work": "not established",
        "software_system": "not established"
      },
      "users": [
        {
          "userid": "5703f9eb5306583d5a000118"
        }
      ]
    }
  ]
}
```

*Internal Error*

	
```json
{
  "status": "error",
  "message": "internal error",
  "code": "500"
}
```

*No projects*

```json
{
  "status": "error",
  "message": "not found",
  "code": "404"
}
```

#### POST /projects

This resource creates new project.

*Request*

	POST /projects
	Content-Type: application/json
	
	{
  		"project_name": "ProjectName"
	}

*Request JSON Schema*

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/",
  "type": "object",
  "properties": {
    "project_name": {
      "id": "project_name",
      "type": "string"
    }
  },
  "required": [
    "project_name"
  ]
}
```
	
*Response*
	
```json
{
  "status": "success",
  "project": {
    "project_name": "NewName2",
    "projectid": "574dcca569b2b461a1000001",
    "current_practice": "",
    "semat_alphas": {
      "opportunity": "not_defined",
      "requirements": "not_defined",
      "stakeholders": "not_defined",
      "team": "not_defined",
      "way_of_working": "not_defined",
      "work": "not_defined",
      "software_system": "not_defined"
    },
    "history": [
      {
        "time": "2016-05-31 18:40:53",
        "message": "project created"
      }
    ]
  }
}
```

*Internal Error*

	
```json
{
  "status": "error",
  "message": "internal error",
  "code": "500"
}
```

*Bad request*

```json
{
  "status": "error",
  "message": "malformed request, check JSON schema",
  "code": "400"
}
```

#### PUT /projects/{projectid}

This resource creates new project.

*Request*

	PUT /projects/{projectid}
	Content-Type: application/json
	
	{
		"current_practice": "Discovery",
    	"semat_alphas": {
      		"opportunity": "identified",
      		"requirements": "not_defined",
      		"stakeholders": "not_defined",
      		"team": "not_defined",
      		"way_of_working": "not_defined",
      		"work": "not_defined",
      		"software_system": "not_defined"
    	},
        "history": [
            {
             "time": "2016-05-31 13:19:33",
             "message": "project created"
            }
        ]
  	}
    	

*Request JSON Schema*

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "current_practice": {
      "type": "string"
    },
    "semat_alphas": {
      "type": "object",
      "properties": {
        "opportunity": {
          "type": "string"
        },
        "requirements": {
          "type": "string"
        },
        "stakeholders": {
          "type": "string"
        },
        "team": {
          "type": "string"
        },
        "way_of_working": {
          "type": "string"
        },
        "work": {
          "type": "string"
        },
        "software_system": {
          "type": "string"
        }
      },
      "required": [
        "opportunity",
        "requirements",
        "stakeholders",
        "team",
        "way_of_working",
        "work",
        "software_system"
      ]
    },
    "history": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "time": {
            "type": "string"
          },
          "message": {
            "type": "string"
          }
        },
        "required": [
          "time",
          "message"
        ]
      }
    }
  },
  "required": [
    "semat_alphas",
    "history"
  ]
}
```
	
*Response*
	
```json
{
  "status": "success",
  "project": {
    "type": "sematProjects",
    "guid": "5721deeea36a8b556c000003",
    "fields": {
      "project_name": "NetworkReail",
      "current_practice": "",
      "semat_alphas": {
        "opportunity": "identified",
        "requirements": "identified",
        "stakeholders": "not_defined",
        "team": "not_defined",
        "way_of_working": "not_defined",
        "work": "not_defined",
        "software_system": "not_defined"
      },
      "history": [
        {
          "time": "2016-05-31 17:29:33",
          "message": "opportunity updated"
        }
      ]
    }
  }
}
```

*Internal Error*
	
```json
{
  "status": "error",
  "message": "internal error",
  "code": "500"
}
```

*Bad request*

```json
{
  "status": "error",
  "message": "malformed request, check JSON schema",
  "code": "400"
}
```

#### DELETE /projects/{projectid}

This resource deletes the specific project.

*Request*

	DELETE /projects/{projectid}
	    	
	
*Response*
	
```json
{
  "status": "success",
  "message": "project deleted"
}
```

*Internal Error*
	
```json
{
  "status": "error",
  "message": "internal error",
  "code": "500"
}
```

*No project*

```json
{
  "status": "error",
  "message": "project not found",
  "code": "404"
}
```
