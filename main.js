const express = require('express')
const url = require('url')
const querystring = require('querystring')
const app = express()
const port = 1304


// app.use(express.json()) // <==== parse request body as JSON

app.get('/thanh-huy', (req, res) => {
    res.send('Hello World!')
})

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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

//  let checkUser = (username, password) => true