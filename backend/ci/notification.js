const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

(async () => {
    await transporter.verify();
    console.log("Servidor pronto para receber mensagens!");
})();


(async () => {
    try{
        const info = await transporter.sendMail({
            from: `"CI/CD - GitHub Actions" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: "Resultado Pipeline",
            text: "testando",
            html: `<div style="font-family: Calibri; padding: 20px;">
                   <h2>Notificação da pipeline</h2>
                   <p>Enviado em: <strong>${new Date().toLocaleString()}</strong></p>
                   <p>Repositório: <strong><a href= "https://github.com/JohnSugahara/PokeTeam">PokeTeam</a></strong></p>
                   <p><em>Se está recebendo este email, significa que todas as etapas do pipeline funcionaram!</em></p>
                   </div>`,
        });

        console.log("Mensagem enviada: %s", info.messageId);
        console.log("Url: %s", nodemailer.getTestMessageUrl(info));
    } catch(error){
        console.error("Erro ao enviar email: ", error)
    }
})();