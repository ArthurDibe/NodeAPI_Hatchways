# Dibe's Node API
This repository is about an API that fetches data from another API (Hatchways)    
<br>

## How to locally Run this project: 
1) Clone this repository to your local machine
2) Make sure <a href="https://nodejs.org/en/">**`NodeJS`**</a> is installed in your machine
3) Install the packages: **`npm install`**    
4) Run the project: **`npm start`**    

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**IMPORTANT:**   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Once you run the server, it will generate a file called `"output.txt"`    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where you can check some outputs examples when callling the routes.   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you do not want the file to be generated, please comment out the     
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;function call `generateOutputs()` in `server.js`  


## How to Run local tests:    
1) Open two terminals
2) In one terminal start the server: **`npm start`** 
3) In the other terminal run the test: **`npm test`**    
<img src="https://user-images.githubusercontent.com/5942022/142583210-678036ab-b009-4372-8b93-780e1349290e.jpg" width="800"> 
<br>  
<br> 
<hr>

## About the routes
## \- Route 1
- Route:&nbsp;&nbsp;&nbsp; **/api/ping**   
- Method: **GET**   
<img src="https://user-images.githubusercontent.com/5942022/142510908-3ca4c317-b9b6-4d86-9547-727f01c034e0.jpg" width="250">  
<br>

## \- Route 2
- Route:&nbsp;&nbsp;&nbsp; **/api/posts**   
- Method: **GET**  
- Query Parameters:   

| Field     | Type              | Description                                                                                  | Default | Example      |
|-----------|-------------------|----------------------------------------------------------------------------------------------|---------|--------------|
| tags      | String (required) | A comma separated list of tags.                                                              | N/A     | science,tech |
| sortBy    | String (optional) | The field to sort the posts by. <br>Acceptable fields are:<br>● id <br>● reads <br>● likes <br>● popularity | id      | popularity   |
| direction | String (optional) | The direction for sorting. The acceptable fields are: <br>● desc <br>● asc                           | asc     | asc          |

<br>

## The API Responses:   
\- The API response will be a list of all the blog posts that have at least one **tag**
specified in the tags parameter.   
\- The **sortBy** parameter specifies which field should be used to sort the returned
results.    
\- The **direction** parameter specifies if the results should be returned in ascending
order (if the value is "asc") or descending order (if the value is "desc")   
<br>

**SUCCESS Response Example:**   
<img src="https://user-images.githubusercontent.com/5942022/142511839-78d2cc16-4654-4007-b8a3-dfcf11ce3476.jpg" width="350">  
<br>   

**ERROR Responses Example:**   

\- If **`tags`** parameter is not present:   
<img src="https://user-images.githubusercontent.com/5942022/142512102-096b2476-7322-45ff-9b8f-595e3f4eac67.jpg" width="330">  

\- If a **`sortBy`** or **`direction`** are invalid values, specify an error like below:    
<img src="https://user-images.githubusercontent.com/5942022/142512361-e583c1e8-931c-4052-8c1e-19654c14600e.jpg" width="330">   

<img src="https://user-images.githubusercontent.com/5942022/142512544-6deba55c-e5df-4c89-8477-1b81a0e0e5b8.jpg" width="330">
<br>
<br>
<hr>

## About the Hatchways's API:     
The Hatchway API is the one used in this repository to fetch data from. The data fetched is filtered and sorted according to the query parameters specified before. This API only accepts one query parameter, diferently from the API developed in this repository, that accepts 3 query parameters.    
<br>
- Route: https://api.hatchways.io/assessment/blog/posts   
- Method: **GET**   
- Query Parameters:    
<br>
     
| Field | Type              | Description                            |
|-------|-------------------|----------------------------------------|
| tag   | String (required) | The tag associated with the blog post. |
|       |                   |                                        |

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**\- Example:**    
&nbsp;&nbsp;&nbsp;&nbsp; https://api.hatchways.io/assessment/blog/posts?tag=tech   

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The url above would result the following:    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src="https://user-images.githubusercontent.com/5942022/142510121-6055a874-efea-4e91-bec2-cdcce100055e.jpg" width="250">    
<hr>    
<br>

