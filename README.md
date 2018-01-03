# NanoWeb  
A web framework of nodejs npm and koa  
  
With a user management, using MySQL.  
  
#NOTE  
The node_modules is depending on nodejs version v7.6.0 and npm v4.1.2  
Extjs is version 4.2.1.883  or 6.2.0
  
node_modules is in directory /node_modules  
Extjs version 4.2.1.883 is in directory /public/javascript/ext-4.2.1.883  
Extjs version 6.2.0 is in directory /views/app/ext, which you should change name from /ext-6.2.0 to /ext  
  
They're so big that you need to download or install(by npm) them manually.  
  
You could change among  extjs4 and extjs6 by changing ctx.render() redirection in /app.js and /routes/index.js.  
