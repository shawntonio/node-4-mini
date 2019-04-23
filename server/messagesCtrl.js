const allMessages = []

module.exports = {
	getAllMessages(req, res){
		res.send(allMessages)
	},

	createMessage(req, res){
		allMessages.push(req.body)
		if (req.session.history) {
			req.session.history.push(req.body)
		} else {
			req.session.history = [req.body]
		}
		res.send(allMessages)
	}
}