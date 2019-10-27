# Movie quiz

This is my attempt to create a RESTful API. Once ready I will use this to feed an online movie quiz.

#### Features:

The application is written is Javascript and uses NodeJS for the backend. It is connected to the Postgres database via Knex. 

#### Use:

The homepage can be found on **index.html**


![Alt text](homepage-scr.jpg?raw=true "Title")

The database has the following row names:

*rank, title, genre, description, director, actors, year, runtime, rating, votes, revenue, metascore*

When sending a request with **POST** or **PUT**, please use a json with some (or all) of the above properties. For example, if you want to update a movie you can you the following json:



```
{

"title": "The terminator",

"year": 1984

}
```

​       

For now you can access, create, update and delete movies using the following endpoints:

##### `GET: /api/movies`

This will get you the entire movie database in json format.

##### `POST: /api/movie/:id`

This will let you create new entries in the database.

##### `PUT: /api/movie/:id`

Use this endpoint to alter the information of a movie.

##### `DELETE: /api/movie/:id`

As the name implies, you can delete any movie through this endpoint.



#### Future features:

The script will be adapted to excludes edge cases and to accept a wider range of queries.

Also the application will feature an online quiz in the near future.
