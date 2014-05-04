//on the topic of callbacks, cause there are a shitload of them over here
// you know how eventListeners always have event automatically passed in? and you can use them in the handler even though you never defined what "event" is?
// a lot of node works in the same fashion. createServer is gonna give you request and response by default. similarly, fs.readFile is gonna give you error and content by default. (error doesnt have to exist. remember that in JS, arguments are optional)

// requires http module and calls createServer to create the server.
var server = require( 'http' ).createServer(handler)
// requires fs module.  fs stands for file system.
var fs = require ( 'fs' )
// let us look at the path (url and file paths).
var path = require ( 'path' )

server.listen(3001)
function handler ( request, response ){
  //request object is freaking huge. also knows the url you requested
  var filePath = "." + request.url;
  if (filePath == './') {
    filePath = './index.html'
  }

  //ext name stands for extension of the file
  var extname = path.extname( filePath )
  var contentType = 'text/html'

  // takes extension of each file, sets contentType to be written to head later
  switch ( extname ){
    case '.json':
      contentType = 'application/json'
      break;
    case '.js':
      contentType = 'text/javascript'
      break;
  }


  // if the file exists, write to the head with the given contentType
  path.exists( filePath, function( exists ){
    if( exists ){
      //file system has a readFile function. call back will return either error or the contents of the file
      fs.readFile( filePath, function( error, content ){
        //raw data is stored in the buffer class. similar to an array of integers, but corresponds to raw memory allocation outside the v8 heap. <<-- ask shadi about memory alloc && v8 heap

        //here we're converting the buffers into strings that we can actually read
        console.log( content.toString() )
        if ( error ){
          //server fucked up
          response.writeHead( 500 );
          response.end()
        } else {
          //response 200 means life is good
          //&& spit out all the content

          response.writeHead( 200, { 'Content-Type': contentType })
          response.end( content, 'utf-8' )
        }
      })
      //you fucked up
    } else {
      response.writeHead( 404 );
      response.end()
    }
  })
}

console.log ("server is running on 3001")