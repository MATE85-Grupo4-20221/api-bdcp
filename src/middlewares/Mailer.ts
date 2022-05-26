import nodemailer from 'nodemailer';

class MailerService{
    async execute(to: string, subject: string, text: string){
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            }
        });

        const mailSent = await transporter.sendMail({
            to,
            subject,
            text,
            from: 'BDCP-IC-UFBA <bdcpicufba@gmail.com>'
        });

        console.log('Password Reset was requested. Message ID: ', mailSent.messageId);
    }

}

export default new MailerService();