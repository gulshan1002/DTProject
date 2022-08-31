## Major libraries used 

express backend framework  
mongoDB driver npm  
  

Base URl: /api/v3/app  
  

## API Endpoints
<pre>
GET     /events?id=:event_id                 : Gets an event by its unique id  
GET     /events?type=latest&limit=5&page=1   : Gets an event by its recency & paginate results by page number and limit of events per page  
POST    /events                              : Creates an event and returns the Id of the event i.e. created 
PUT     /events/:id                          : Updates an event  
DELETE  /events/:id                          : Deletes an event based on its Unique Id 
</pre>

## API DOcumentation https://docs.google.com/document/d/1V1Jyrg0eGCBnIdhmUyuLkLmeOSTCW6_LXYoN7tCPZ6U/edit?usp=sharing
## How to run

Tu run the API

- install the all dependencies using npm install
- have a mongodb deployement run locally using mongod command then use the server at http://localhost:3000 or can check on POSTMAN