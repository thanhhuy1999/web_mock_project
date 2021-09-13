const express = require('express')
const url = require('url')
const querystring = require('querystring')
var bodyParser = require('body-parser')
// const morgan = require('morgan')
const cors = require('cors')
let expressValidator = require('express-validator')
let session = require('express-session');
let MySQLStore = require('express-mysql-session')(session);


const app = express()
const port = 1304

let options = {
    host: "localhost",
    port: "1304",
    user: "root",
    password: "",
    database: "questionare"
};
let sessionStore = new MySQLStore(options);

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: true,
    saveUninitialized: false
}));
app.use(expressValidator())
app.use(cors({
    origin: '*'
}));

// app.use(morgan("dev")
app.use(bodyParser.json())
app.use('/question', require('./controller/question_controller'))
app.use('/answer', require('./controller/answer_controller'))
app.use('/user', require('./controller/user_controller'))

app.listen(port, () => {
    console.log(`ThanhHuy'Server run at http://localhost:${port}`)
})


// app.use(express.json()) // <==== parse request body as JSON

// app.get('/thanh-huy', (req, res) => {
//     res.send('Hello World!')
// })

// app.post('/thanh-huy', (req, res) => {
//     // console.log(req.params.username)
//     let parseurl = url.parse(req.url)
//     let parsequery = querystring.parse(parseurl.query)
//     console.log(parsequery)
//     res.send("cut me may di")
// }
// )

// //lay du lieu tu params
// app.post('/thanh-huy/:id/:cuong', (req, res) => {
//     let id = req.params.id;
//     let cuong = req.params.cuong;
//     console.log(cuong)
//     console.log(id);
//     res.send('success')
// })

// //lay du lieu tu body
// app.post('/thanh-huy', (req, res) => {  
//     let context = req.body;
//     console.log(req.body);
//     checkUser(context.username, context.password)
//     res.send("success")
// })

//  let checkUser = (username, password) => true