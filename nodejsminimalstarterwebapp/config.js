
var config = {};

config.databasehost = 'put database host here';
config.databaseport = 3306;
config.databaseusername = 'root';
config.databasepassword = '';
config.database = 'put database here';
config.cert = __dirname + '/certs/ca-cert.pem';
config.connectionpoolconnectioncount = 100;

module.exports = config;