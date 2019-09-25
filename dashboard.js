var ParseDashboard = require('parse-dashboard');  
var express = require('express');  

// Set up parse dashboard
var dashboard = new ParseDashboard({
    "allowInsecureHTTP": true,
    "apps": [{
        "serverURL": process.env.SERVER_URL || 'https://pacecouriers.com/mufeezBhaiApp',
        "appId": process.env.APP_ID || 'mufeezBhaiApp',
        "masterKey": process.env.MASTER_KEY || 'mufeezBhaiApp',
        "appName": "Mufeez Bhai App",
        "production": false,
        "iconName": "app-icon.png",
    }],
    "users": [
      {
        "user":"username",
        "pass":"password"
      }
    ],
    "iconsFolder": "icons"
  });
  
  var dashApp = express();
  
  // make the Parse Dashboard available at /dashboard
  dashApp.use('/dashboard', dashboard);
  
  var httpServerDash = require('http').createServer(dashApp);  
  httpServerDash.listen(4040, function() {  
      console.log('dashboard-server running on port 4040.');
  });