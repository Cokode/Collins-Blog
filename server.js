const express = require('express');
const handlebars = require('express3-handlebars').create({defaultLayout: 'main'});

const app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
//app.set("views", "./app/views");

/* tells express that client asserts are 
located in the public subfolders*/
app.use(express.static('public'));

var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.", 
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
   ];


// Home Page
app.get('/', function(req, res) {
    //res.sendFile(`${__dirname}/app/views/home.handlebars`);
    res.render('home');
});

// About Page
app.get('/about', function(req, res) {
    var randomFortune =
    fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomFortune});
});





// */

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
}); 


const listener = app.listen(process.env.PORT || 3002, () => {
console.log(`Your app is listening on port ${listener.address().port}`);
});
