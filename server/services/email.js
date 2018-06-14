const Mailgun = require('mailgun-js');
const config = require('../configs/' + (process.env.ENV || 'dev'));

const api_key = config.mailgunApiKey;
const domain = config.mailgunDomain;
const from_who = config.mailFrom;

const mailgun = new Mailgun({apiKey: api_key, domain: domain});

function sendMail(dest, subject, content) {
	const data = {
		from: from_who,
		to: dest,
		'subject': subject,
		html: content
	}
	mailgun.messages().send(data, function (err, body) {
	    if (err) {
	        console.log('got an error sending mail: ', err)
	    }
	    else {
	        console.log('mail successfully sended')
	    }
	})
}

function sendConfirmationMail(dest, confirmationCode) {
	const subject = 'confirm your email with confirmation code';
	const content = `
		<p>below is your confirmation code:</p>
		<h2>${confirmationCode}</h2>
	`
	sendMail(dest, subject, content);
}


module.exports = {
	sendConfirmationMail: sendConfirmationMail
}