const express = require('express');
const session = require('express-session');
require('dotenv').config();

const Ctrl = require(`./messagesCtrl`)

let {SERVER_PORT, SESSION_SECRET} = process.env;

const app = express();

app.use(express.json());
app.use(session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}));
app.use((req, res, next) => {
	let badwords = ['knucklehead', 'jerk'];
	if(req.body.message) {
		for(let i = 0; i < badwords.length; i++) {
			let regex = new RegExp(badwords[i], 'g');
			req.body.message = req.body.message.replace(regex, '****')
		}
		next();
	} else next()
})

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))

app.get(`/api/messages`, Ctrl.getAllMessages)
app.post(`/api/message`, Ctrl.createMessage)
app.get(`/api/messages/history`, (req, res) => res.send(req.session.history))