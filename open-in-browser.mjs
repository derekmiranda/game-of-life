import open from "open";
import http from "http";
import nodeStatic from "node-static";

// Create a node-static server instance to serve the './public' folder
var file = new nodeStatic.Server(".");

http
  .createServer(function (request, response) {
    request
      .addListener("end", function () {
        //
        // Serve files!
        //
        file.serve(request, response);
      })
      .resume();
  })
  .listen(8080);

open("http://localhost:8080");
