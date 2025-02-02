import { Request, Response } from 'express';
import MailService from '../service/mail.service';
class MailController {

  async sendEmail(req: Request, res: Response) {
    const info = req.body as {
      to: string
    };

    await MailService.sendMail({ to: info.to });

    res.status(200).json({ message: 'Email sent' });

  }
}

export default new MailController();
