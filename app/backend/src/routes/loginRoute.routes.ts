import { Request, Response, Router } from 'express';
import LoginService from '../services/LoginService';
import LoginController from '../controllers/LoginController';
import ValidateRequestBody from '../middlewares/ValidateRequestBody';

const loginService = new LoginService();
const loginController = new LoginController(loginService);

const router = Router();

router.get('/validate', (req: Request, res: Response) =>
  loginController.getRole(req, res));

router.post(
  '/',
  ValidateRequestBody.validateLogin,
  (req: Request, res: Response) => loginController.login(req, res),
);

export default router;
