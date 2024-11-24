// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Router } from 'express';
import AuthController from '../controller/auth.controller';
import { verifyToken } from '../middleware/verifyToken';
import { Role } from '../enum/user.enum';
import { guard } from '../middleware/guard';
const router = Router();

router.post('/login',  AuthController.login);
router.post('/sign-up', AuthController.signUp);
router.post('/update',verifyToken, guard([Role.USER]), AuthController.updateUser);
router.post('/refresh-token',verifyToken, AuthController.refreshToken);
router.post('/logout', AuthController.logout);

export default router;
