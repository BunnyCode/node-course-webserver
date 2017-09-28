const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 80;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
   var now = new Date().toString();
   console.log(`${now}: ${req.method} => ${req.url}`);
   next();
});

//Maint mode
// app.use((req, res, next) => {
//    res.render('maint.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => {
   return text.toUpperCase();
});

app.get('/', (req, res) => {
   // res.send('Hello Express');
   res.render('home.hbs', {
      pageTitle: 'Home Page',
      welcomeMessage: 'Hello, you are welcome to the root dir'
   });
});

app.get('/bad', (req, res) => {
   // res.send('Hello Express');
   res.send({
      errorMessage: 'Unable to handle request'
   });
});

app.get('/about', (req, res) => {
   res.render('about.hbs', {
      pageTitle: 'About Page'
   });
});

app.get('/projects', (req, res) => {
   res.render('projects.hbs', {
      pageTitle: 'Projects'
   });
});

app.listen(port, () => {
   console.log(`Server is up on port ${port}`);
});
