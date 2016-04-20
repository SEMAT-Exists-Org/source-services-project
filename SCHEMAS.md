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

This resource retrieves all the projects for specific user.

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
        "team": "not established",
        "way_of_working": "not established",
        "work": "not established",
        "software_system": "not established"
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
  		"project_name": "Project Name 1",
  		"current_practice": "Discovery",
  		"users": [
    		{
      			"userid": "5703f9eb5306583d5a000118"
    		}
  		]
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
    },
    "current_practice": {
      "id": "current_practice",
      "type": "string"
    },
    "users": {
      "id": "users",
      "type": "array",
      "items": {
        "id": "0",
        "type": "object",
        "properties": {
          "userid": {
            "id": "userid",
            "type": "string"
          }
        }
      }
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
    "projectname": "Project Name 1",
    "projectid": "5703f9eb5306583d5a000018",
    "current_practice": "Discovery",
    "semat_alphas": {
      "opportunity": "not established",
      "requirements": "not established",
      "stakeholders": "not established",
      "team": "not established",
      "way_of_working": "not established",
      "work": "not established",
      "software_system": "not established"
    },
    "users":[
    	{
    		"userid": "5703f9eb5306583d5a000118"
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
      		"requirements": "not established",
      		"stakeholders": "not established",
      		"team": "not established",
      		"way_of_working": "not established",
      		"work": "not established",
      		"software_system": "not established"
    	},
    	"users":[
    		{
    			"userid": "5703f9eb5306583d5a000118"
    		}
  		]
  	}
    	

*Request JSON Schema*

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/",
  "type": "object",
  "properties": {
    "current_practice": {
      "id": "current_practice",
      "type": "string"
    },
    "semat_alphas": {
      "id": "semat_alphas",
      "type": "object",
      "properties": {
        "opportunity": {
          "id": "opportunity",
          "type": "string"
        },
        "requirements": {
          "id": "requirements",
          "type": "string"
        },
        "stakeholders": {
          "id": "stakeholders",
          "type": "string"
        },
        "team": {
          "id": "team",
          "type": "string"
        },
        "way_of_working": {
          "id": "way_of_working",
          "type": "string"
        },
        "work": {
          "id": "work",
          "type": "string"
        },
        "software_system": {
          "id": "software_system",
          "type": "string"
        }
      }
    },
    "users": {
      "id": "users",
      "type": "array",
      "items": {
        "id": "0",
        "type": "object",
        "properties": {
          "userid": {
            "id": "userid",
            "type": "string"
          }
        }
      }
    }
  },
  "required": []
}
```
	
*Response*
	
```json
{
  "status": "success",
  "project": {
    "projectname": "Project Name 1",
    "projectid": "5703f9eb5306583d5a000018",
    "current_practice": "Discovery",
    "semat_alphas": {
      "opportunity": "identified",
      "requirements": "not established",
      "stakeholders": "not established",
      "team": "not established",
      "way_of_working": "not established",
      "work": "not established",
      "software_system": "not established"
    },
    "users":[
    	{
    		"userid": "5703f9eb5306583d5a000118"
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
