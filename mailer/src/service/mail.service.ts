import nodemailer from 'nodemailer';

class MailService {

  private createTransport() {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      auth: {},
    });
    return transporter;
  }

  async sendMail({ to }: {to: string}) {
    const transporter = this.createTransport();
    await transporter.sendMail({
      from: 'Guvanch', // sender address
      to,
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    });
  }


}

export default new MailService();
