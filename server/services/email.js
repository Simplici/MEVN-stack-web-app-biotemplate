const Mailgun = require('mailgun-js');
const config = require('../configs/' + (process.env.ENV || 'dev'));

const api_key = config.mailgunApiKey;
const domain = 'mail.ezyoutube.net';
const from_who = 'hello@ezyoutube.net';

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

function sendWelcomeMail(dest) {
	const subject = '【ezYouTube】欢迎注册使用';
	const content = `
		<p>欢迎注册使用ezYouTube。</p>
		<p>如果您需要VPN来绑定YouTube账号，请联系xuhaogmai50@gmail.com申请一个临时VPN。</p>
		<p>如果您使用过程中遇到了任何问题或是有任何建议，欢迎联系xuhaogmai50@gmail.com。</p>
		<p>希望ezYouTube能给您带来便利。</p>
		<p>hello from ezYouTube</>
	`
	sendMail(dest, subject, content);
}


module.exports = {
	sendWelcomeMail: sendWelcomeMail
}