const transporter = require('../helpers/nodemailer')

const registroUsuario = async (emailUsuario)=>{
     await transporter.sendMail({
        from: `"Mercado libre"<${process.env.GMAIL_USER}`, // sender address
        to: emailUsuario, // list of receivers
        subject: "Registro exitoso ✔", // Subject line

        html: "<b>gracias por registrarte</b>", // html body
      });
}


module.exports={
    registroUsuario
}