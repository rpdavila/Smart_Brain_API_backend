const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const { port, host, user, password } = require('./config')


const app = express();

const db = knex({
    client: 'pg',
    connection: {
      host : `${host}`,
      user : `${user}`,
      password : `${password}`,
      database : 'smart-brain'
    }
  });

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT

app.get('/', (req, res) => {
 res.send(database.users);
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen(port, ()=> {
    console.log(`app is running on port ${port}`)
})



// // Load hash from your password DB.

// plan out your server
//  / --> res = this is working
// /signin --> POST = success/fail
// /register --> POST = user
// /profile/:userId --> GET = user
// /image --> PUT --> user 