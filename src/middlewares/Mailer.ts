import nodemailer, { Transporter } from 'nodemailer';

class MailerService{

    private client: Transporter;

    constructor(){
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });

            this.client = transporter;
        });
    }

    async execute(to: string, subject: string, text: string){
        const message = await this.client.sendMail({
            to,
            subject,
            text,
            from: 'BDCP <noreply@bdcp.com>'
        });

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }

}

export default new MailerService();