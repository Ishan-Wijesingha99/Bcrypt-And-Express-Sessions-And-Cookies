
// a cookie is a small piece of data that is STORED on the client (the user's device)

// this cookie is sent along with EVERY request until the cookie expires or gets cleared
// http requests are stateless, so node and express have no way of knowing if a http request came from a client that has already made a request, cookies can be used to identify a specific user

// a cookie is a key-value pair

// a cookie being secure means it can only be sent through https

// cookies store a session id, abbreviated as just 'sid' (session id)
// each user will have a different session id so that we can identify which user it is

// cookie parser is a middleware that parses cookies attached to the request object
const express = require('express')
const app = express()

// cookie module
const cookieParser = require('cookie-parser')

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// setting up the cookie middleware
app.use(cookieParser())


app.get('/addcookie/:username', (req, res) => {
    // let's get the route parameter out of req.params
    const {username} = req.params

    // this is how you add a cookie to the res.cookies object, then it can be accessed in any http request
    // if user already exists, it will replace it in res.cookies object
    res.cookie('user', username)

    res.status(200).send(`added ${username}`)
})

// just to show that the cookie can be accessed in all requests, we will log it to the console for this get request
app.get('/', (req, res) => {
    // req.cookies is just an object that contains all the cookies we set
    console.log(req.cookies)

    res.status(200).send('Home Page')
})


app.listen(3000, () => {
    console.log('Server is listening on port 3000...')
})