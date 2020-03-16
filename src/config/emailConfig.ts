const nodeMailer = require('nodemailer');

let proces = require('dotenv').config();

export const emailConfig: any = {
    host: 'smtp.qq.com',
    secureConnection: true,
    port: 465,
    sercure: true,
    auth: {
      user: proces.EMAIL_USER,
      pass: proces.EMAIL_PASS
    }
}
