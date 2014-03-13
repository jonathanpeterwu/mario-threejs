var http = require('http')

http.createServer( function( request, response ){
  response.writeHead( 200, { 'Content-type': 'text/plain'} )
  response.end(" suck it jonny ")
}).listen(3001)

console.log ("server is running on 3001")