# Live-Scoreboard
A simple web application to show live score of sport events.

### Introduction
This is a prototype version of web application and does not have database connections and proper backend. 
This system is for demonstration purpose only and not properly developed for real world usage.
##### Technologies
* Node JS
* Angular JS 1.6
* Web Sockets (Socket.io)

#### Getting Started
* Make sure that you have installed nodeJS, bower and git correctly.
* Also make sure that you have working internet connection with 
access to googleapis.com, cdnjs.cloudflare.com and code.getmdl.io
* Download or clone ``https://github.com/n256Coding/Live-Scoreboard.git`` repo into your local storage.
* Navigate into folder which contains package.json in the downloaded/cloned project with command prompt (terminal)


#### Configuring Instructions
1. Run these commands.

``````
npm install
bower install
``````
2. Start server.
````
node server.js
````
Server will start using port 3000. In case of port conflicts, please change default port number in server.js file

3. Enter ``localhost:3000`` URL in a web browser. 
(Modern browsers are recommended Ex. > Firefox 8, > Chrome 52, Edge)
##### Note: 
* In case of port conflicts, if you have changed the port number, please enter that port number instead 3000 in the URL in step 3
### Default login credentials
````
Username: admin
Password: admin
````

Voila!
