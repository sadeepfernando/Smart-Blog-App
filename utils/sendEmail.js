const nodeMailer = require('nodemailer');


const sendEmail = async({emailTo, subject, code, content}) =>{
    const transporter = nodeMailer.createTransport({
        host : "smtp.gmail.com",
        port : 587,
        secure : false,
        auth : {
            user : "shiwanthafernando33879@gmail.com",
            pass : "tmnw jmuc tldb qrbe",
        },
    });

    const message = {
        to : emailTo,
        subject,
        html : `
        <div>
            <h3>Use this below code to ${content}</h3>
            <p><strong> Code : </strong> ${code}</p>
        </div>
        `,
    };

    await transporter.sendMail(message);
}

module.exports = sendEmail;