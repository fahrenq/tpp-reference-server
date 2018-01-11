const fs = require('fs');
const path = require('path');
const debug = require('debug')('debug');
const log = require('debug')('log');
const error = require('debug')('error');

const encodeCert = async (certFile) => {
  if (!certFile) {
    throw new Error('Please include a path to a CERT file,\n<<e.g. npm run base64-cert full/path/to/cert>>');
  }

  log('Running encodeCert');
  const cert = fs.readFileSync(certFile);
  const result = new Buffer(cert).toString('base64');
  debug(`Encoded CERT: ${result}`);
  return result;
};

encodeCert(process.argv.slice(2)[0]).then((encodedCert) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('\nBASE64 ENCODED CERT (Please copy the text below to the required ENV):\n'); // eslint-disable-line
    console.log(encodedCert); // eslint-disable-line
    process.exit();
  }
})
.catch((err) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(err.message); // eslint-disable-line
    error(err);
    process.exit();
  }
});

exports.encodeCert = encodeCert;