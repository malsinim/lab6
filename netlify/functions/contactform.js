// import the sendgrid mail module
const sgMail = require('@sendgrid/mail'); 
 // set the API key for sendgrid from the environment variables 
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event, context) => {
  // if the HTTP method is not POST, respond with method not allowed
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    // parse the request body into JSON
    const data = JSON.parse(event.body);

    // fields from the data object
    const { name, phone, email, subject, message } = data;

    // create the email content dynamically based on the form data
    const emailContent = `
      New message from ${name}
      Phone: ${phone}
      Email: ${email}

      Subject: ${subject}
      Message:
      ${message}
    `;

    // set up the email details
    const msg = {
      to: ['malsinimasachchige@gmail.com', 'adam.kunz+inft@durhamcollege.ca'], 
      from: 'malsinimasachchige@gmail.com', 
      // subject line with a prefix
      subject: `[This is an automated message] ${subject}`, 
      // email body
      text: emailContent, 
    };

    // send the email using sendgrid
    await sgMail.send(msg);

    // return a success message if the email was sent successfully
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully!' }),
    };
  } catch (err) {
    // log any error that occurs while sending the email
    console.error('Email sending error:', err.message);

    // return a server error message if something goes wrong
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error', error: err.message }),
    };
  }
};
