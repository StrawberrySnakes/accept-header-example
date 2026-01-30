const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const cats = {
    'Ryleigh' : {
      name: 'Rhyleigh',
      age: 20, 
    },
    'Mika' : {
      name: 'Mika',
      age: 1, 
    },
    'Paloma' : {
      name: 'Paloma',
      age: 1, 
    },
};

const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'utf8'), 
  });
  response.write(content);
  response.end();
};

const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};

const getCats = (request, response) => {
  if(!request.query || !request.query.name) {
    const responseJSON = JSON.stringify({ error: 'name is required'});
    return response(request, response, 400, responseJSON, 'application/json');
  }

  const cat = cats[request.query.name];

  if(!cat) {
    const responseJSON = JSON.stringify({ error: 'cat not found'});
    return respond(request, response, 404, responseJSON, 'application/json');
  }
 
  if(request.acceptedTypes[0] === 'text/xml') {
    let responseXML = `<response>`;
    responseXML += `<name>${cat.name}</name>`;
    responseXML += `<age>${cat.age}</age>`;
    responseXML += `</response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const catString = JSON.stringify(cat);
  return respond(request, response, 200, catString, 'application/json');
};

module.exports = {
  getCats,
  getIndex,
};