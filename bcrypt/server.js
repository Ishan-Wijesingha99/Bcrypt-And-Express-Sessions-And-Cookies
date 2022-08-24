
// we are going to mirror the sign up and log in feature of a webpage to show the use of bcrypt

// first, remember to run schema.sql in the commmand prompt



// express
const express = require('express')
const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// bcrypt package
const bcrypt = require('bcrypt')

// mysql
const mysql = require('mysql2')




// set up sequelize database connection and environmental variables
const {Sequelize, DataTypes} = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 4000,
  }
);

// create table using sequelize
const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    passwordHashed: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    timestamps: false
})





// here we will have POST requests, one for the user signing up and one for the user logging in
app.post('/signup', async (req, res) => {

    try {
        
    // to mirror signing up, the user will send a JSON object that contains the username and password as properties, this will be sent in req.body
    const {username, password} = req.body

    // we then hash the password, this is an asynchronous task
    // the first argument hash() takes is the password, the second is how many characters is added to the end of the password (salted). The longer this is, the more secure, but it will also take longer to hash
    const hashedPassword = await bcrypt.hash(password, 10)

    // store username and password in users_db table in mysql database
    await User.create(
        {
            username: username,
            passwordHashed: hashedPassword
        }
    )

    res.status(200).json('User created!')

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }

    
})

app.post('/login', async (req, res) => {
    // the username and password will be sent in req.body
    try {
        const {username, password} = req.body

        const currentUserObject = await User.findOne({where: {username: username}}).then(data => data.toJSON())

        if(!currentUserObject) {
            return res.status(400).json('Username does not exist')
        }

        // bcrypt.compareSync() returns true or false, it compares the two arguments specified and if they are the same, it returns true
        // compareSync() is synchronous, the asychronous version is just .compare
        const correctPasswordOrNot = bcrypt.compareSync(password, currentUserObject.passwordHashed)

        if(correctPasswordOrNot) {
            return res.status(200).json('User logged in!')
        } else {
            return res.status(400).json('Password incorrect')
        }

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }


   
})


sequelize.sync({force: true})
.then(() => {
    app.listen(4000, () => {
        console.log('Server listening on port 4000...')
    })
})

