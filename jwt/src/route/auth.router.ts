// @ts-nocheck
import { Router } from 'express';
import AuthController from '../controller/auth.controller';
const router = Router();

router.post('/login',  AuthController.login);
router.post('/sign-up', AuthController.signUp);
router.post('/update', AuthController.updateUser);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/logout', AuthController.logout);

export default router;
