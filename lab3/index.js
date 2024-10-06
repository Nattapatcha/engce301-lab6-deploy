const hapi = require('@hapi/hapi');
var users = require('./users');
const env = require('./env.js');
const Movies = require('./respository/movie');

const express = require('express');
const app = express();

//------------------
const api_port = 3003;
const web_port = 3011;


//------------- express ----------
app.get('/', (req, res) => {
  res.send('<h1> Hello World main_server </h1>');

})

app.get('/users', function (req, res) {
  res.json(users.findAll());
});

app.get('/user/:id', function (req, res) {
  var id = req.params.id;
  res.json(users.findById(id));
});

app.listen(web_port, () => {
  console.log('Start web server at port ' + web_port);

})

//------------ hapi --------------

console.log('Running Environment: ' + env);


const init = async () => {

  const server = hapi.Server({
    port: api_port,
    host: '0.0.0.0',
    routes: {
      cors: true
    }
  });

  //---------
  await server.register(require('@hapi/inert'));

  server.route({
    method: "GET",
    path: "/",
    handler: () => {
      return '<h3> Welcome to API Back-end Ver. 1.0.0</h3>';
    }
  });


    //API: http://localhost:3003/api/movie/all
    server.route({
      method: 'GET',
      path: '/api/movie/all',
      config: {
          cors: {
              origin: ['*'],
              additionalHeaders: ['cache-control', 'x-requested-width']
          }
      },
      handler: async function (request, reply) {
          //var param = request.query;
          //const category_code = param.category_code;

          try {

              const responsedata = await Movies.MovieRepo.getMovieList();
              if (responsedata.error) {
                  return responsedata.errMessage;
              } else {
                  return responsedata;
              }
          } catch (err) {
              server.log(["error", "home"], err);
              return err;
          }
          
      }
  });

    server.route({
      method: 'GET',
      path: '/api/movie/search',
      config: {
          cors: {
              origin: ['*'],
              additionalHeaders: ['cache-control', 'x-requested-width']
          }
      },
      handler: async function (request, reply) {
          var param = request.query;
          const search_text = param.search_text;
          //const title = param.title;

          try {

            const responsedata = await Movies.MovieRepo.getMovieSearch(search_text);
            if (responsedata.error) {
                return responsedata.errMessage;
            } else {
                return responsedata;
            }
        } catch (err) {
            server.log(["error", "home"], err);
            return err;
        }

      }
  });
  server.route({
    method: "DELETE",
    path: "/api/movie/delete",
    config: {
      cors: {
        origin: [""], additionalHeaders: ["cache-control", "x-requested-width"],
      },
     
    },
    handler: async function (request, reply) {
      var param = request.query;
      const delete_text = param.delete_text;
  
      //const title = param.title;
  
      try {
        const responsedata = await Movies.MovieRepo.deleteMovie(delete_text);
        if (responsedata.error) {
          // Handle deletion error (e.g., return appropriate error message)
        } else {
          return { message: 'Movie deleted successfully', statusCode: 200 }; // Assuming success data structure
        }
  
        return responsedata;
      } catch (err) {
        server.log(["error", "home"], err);
        return reply.internalServerError('An error occurred'); // Improved error response
      }
    },
  });

  server.route({
    method: 'POST',
    path: '/api/movie/insert',
    config: {
        payload: {
            multipart: true,
        },
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-width']
        }
    },
    handler: async function (request, reply) {

        const {
          title,
          genre,
          director,
          release_year
        } = request.payload;

        //const title = request.payload.title;
        //const genre = request.payload.genre;

        try {

          const responsedata = await Movies.MovieRepo.postMovie(title, genre, director,release_year);
          if (responsedata.error) {
              return responsedata.errMessage;
          } else {
              return responsedata;
          }
      } catch (err) {
          server.log(["error", "home"], err);
          return err;
      }

    }
});




  await server.start();
  console.log('API Server running on %s', server.info.uri);

  //---------
};


process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();
