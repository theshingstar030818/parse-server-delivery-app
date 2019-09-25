
var express = require('express');  
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');  
var path = require('path');  

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {  
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var port = process.env.PORT || 1341;

// Set up parse server
var api = new ParseServer({
  appName: process.env.APP_NAME || 'Mufeez Bhai App',
  port: port,
  databaseURI: databaseUri || 'mongodb://localhost:27017/mufeezBhaiAppDB',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'mufeezBhaiApp',
  masterKey: process.env.MASTER_KEY || 'mufeezBhaiApp',
  serverURL: process.env.SERVER_URL || 'https://pacecouriers.com/mufeezBhaiApp',
  publicServerURL: 'https://pacecouriers.com/mufeezBhaiApp',
  verbose: true,
  verifyUserEmails: true,
  preventLoginWithUnverifiedEmail: true,
  emailVerifyTokenValidityDuration: 2 * 60 * 60, // in seconds (2 hours = 7200 seconds)
  emailAdapter: {
    module: 'parse-server-simple-mailgun-adapter',
    options: {
      fromAddress: 'noreply@pacecouriers.com',
      domain: 'pacecouriers.com',
      apiKey: 'key-b1b3815d029d5f841c319e7fa5594e67',
      appName: 'Mufeez Bhai App',
    }
  }
});

var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';  
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {  
  res.status(200).send('Parse Server App');
});

var httpServer = require('http').createServer(app);  
httpServer.listen(port, function() {  
    console.log('server running on port ' + port + '.');
});
