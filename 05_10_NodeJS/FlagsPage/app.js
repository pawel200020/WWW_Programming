const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
app.use(express.static(__dirname + '/Pages'));
// sendFile will go here
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'Pages/index.html'));

});
app.get('/FirstQuestion', function(req, res) {
    res.sendFile(path.join(__dirname, 'Pages/FirstQuestion.html'));
});
app.get('/SecondQuestion', function(req, res) {
    res.sendFile(path.join(__dirname, 'Pages/SecondQuestion.html'));
});
app.get('/ThirdQuestion', function(req, res) {
    res.sendFile(path.join(__dirname, 'Pages/ThirdQuestion.html'));
});
app.get('/FourthQuestion', function(req, res) {
    res.sendFile(path.join(__dirname, 'Pages/FourthQuestion.html'));
});
app.get('/IndonesiaFlag', function(req, res) {
    res.sendFile(path.join(__dirname, 'Pages/IndonesiaFlag.html'));
});
app.get('/PolandFlag', function(req, res) {
    res.sendFile(path.join(__dirname, 'Pages/PolandFlag.html'));
});
app.get('/NorwayFlag', function(req, res) {
    res.sendFile(path.join(__dirname, 'Pages/NorwayFlag.html'));
});
app.get('/CzechFlag', function(req, res) {
    res.sendFile(path.join(__dirname, 'Pages/CzechFlag.html'));
});
app.get('/PhilipinesFlag', function(req, res) {
    res.sendFile(path.join(__dirname, 'Pages/PhilipinesFlag.html'));
});



app.listen(port);
console.log('Server started at http://localhost:' + port);