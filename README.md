The login/signUp project follows a clean architecture. It has seperate files for "controllers", "mongoDB schema", "routes", "styles", "ejs templates" and finally "app.js" to manage the running of the app efficiently.
The app follows JavaScript ES6, that allows to "import" and "export" modules from one file to another.
Actual data is stored securely on MongoDb Atlas' cluster. It allows seemless connectivity without actually using the space on the system.
The app uses REST APIs and standard HTTP protocols like "get", "post", etc to handle requests being sent.
Password is saved in the database only after it has gone throught hashing, using "bcrypt".
