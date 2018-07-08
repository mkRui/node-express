const nodeMailer = require('nodemailer')
const emailConfig = require('./../config').EMAIL

console.log(emailConfig.emailUser)

const transPorter = nodeMailer.createTransport({
  host: 'smtp.qq.com',
  secureConnection: true,
  port: 465,
  sercure: true,
  auth: {
    user: emailConfig.emailUser,
    pass: emailConfig.emailPass
  }
})

exports.sendEmail = (options) => {
  options.from = `'hey firends' <1102163949@qq.com>`
  console.log(options)
  transPorter.sendMail(options, (error, info) => {
    if (error) {
      return console.warn(error)
    }
    console.log('发送成功')
  })
}
