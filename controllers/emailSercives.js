const nodemailer = require("nodemailer");
transport = nodemailer.createTransport({
  service: "Gmail",
  auth: { user: "marwenf947@gmail.com", pass: "22462814aaa " },
});

module.exports = supermarketController = {
  sendEmailConfirmation: async (email, emailToken) => {
    const url = `http://localhost:5000/confirmation/${emailToken}`;
    transport
      .sendMail({
        from: "norely@gromarket.com",
        to: email,
        subject: "email verification",
        html: `confirmation email <a href=${url}> ${url}</a>`,
      })
      .then(() => {
        console.log("email sent");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  surveyConfirmation: async (email) => {
    transport
      .sendMail({
        from: "norely@gromarket.com",
        to: email,
        subject: "confirmation for complete the survey",
        html: `you complete the survey with success we will inform you ASAP`,
      })
      .then(() => {
        console.log("email sent");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
