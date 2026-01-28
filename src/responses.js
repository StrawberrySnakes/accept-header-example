const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const respond = (request, response, content, type) => {
  response.writeHead(200, { 
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
  const cat = {
    name: 'Rhyleigh',
    age: 20,
  };

  if(request.acceptedTypes[0] === 'text/xml') {
    let responseXML = `<response>`;
    responseXML += `<name>${cat.name}</name>`;
    responseXML += `<age>${cat.age}</age>`;
    responseXML += `</response>`;

    return respond(request, response, responseXML, 'text/xml');
  }

  const catString = JSON.stringify(cat);
  return respond(request, response, catString, 'application/json');
};

module.exports = {
  getCats,
  getIndex,
};
