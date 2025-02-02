// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Router } from 'express';
import MailController from '../controller/mail.controller';

const router = Router();

router.post('/mail', MailController.sendEmail);


export default router;
