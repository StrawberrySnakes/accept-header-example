const http = require('http');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = { 
  '/': responseHandler.getIndex,
  '/cats' : responseHandler.getCats,
  index: responseHandler.getIndex
};

const onRequest = (request, response) => {
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
  request.acceptedTypes = request.headers.accept.split(',');

  //hold the getIndex function -- functions pointer
  // const handler = urlStruct['/'];
  const handler = urlStruct[parsedUrl.pathname];
  if(handler) {
    handler(request, response);
  } else {
    urlStruct.index(request, response);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
