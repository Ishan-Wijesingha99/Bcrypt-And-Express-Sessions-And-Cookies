
// sessions are needed because websites use http requests, and http requests are stateless, meaning once the request is done, the server and the client forget everything about eachother, the server has no way of distinguishing between a user that's already visited the site and a user that's visiting for the first time

// this is where sessions come in, each session has a session cookie that is stored on the BROWSER, if a user decides to go back on a website after they close a tab, that session cookie is still available because the browser hasn't been closed
// that session cookie is sent along with the http request from the client to the server
// the server looks up that session cookie in the database
// the database returns the session cookie information to the server
// the server sends the relevant information back to the client

// cookies are stored on the client, sessions are stored on the server
// therefore, sensitive information should never be stored in cookies, only in sessions

// a unique id is stored on a session cookie, which the server inteprets to find the relevant session based off that id



// in previous versions of express-session package, we needed the cookie parser package to parse cookies, but in this new version, we can bypass it altogether

const express = require('express')
const app = express()

// express session module
const sessions = require('express-session')

app.use(express.json())

// express session middleware
app.use(session({
    // this secret is used to create a hash, this hash is used to verify a session cookie by the server
    // the session cookie will have the format sid.signature
    // sid is the session id
    // the signature is what is generated from the hash created from the secret
    // the secret should be a random string of characters that is changed periodically, but for this example, we'll keep it static
    secret: 'this-is-my-secret',
    cookie: {
        // to set expiration date of cookie in seconds
        maxAge: 3600
    }
}))




// req.session is an object that is available in all http requests, this object is SPECIFIC to the particular browser that made the http request. So one device will have a different object to another device
// you can add as many properties to this object as you want, like req.session.countVisit and req.session.loggedIn

// you can utilise this to distinguish if a user has already visited your website or not
// for instance, let's say when a user enters the login page for your website, in that GET request, you check the req.session object to see if req.session.loggedIn is true, if it is, then you redirect them to their profile, if it req.session.loggedIn doesn't exist, then take them to the login page
// can set all this up with if-else statements



// deleting a session cookie
// by default, cookies only get destroyed when the browser is closed, or we can set this expiration to whenever we want using maxAge, but we can delete them programatically as well using req.session.destroy()

// create a get request, that deletes a session cookie using req.session.destroy



