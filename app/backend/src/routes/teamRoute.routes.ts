import { Request, Response, Router } from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();

router.get('/', (req: Request, res: Response) =>
  TeamController.findAll(req, res));

router.get('/:id', (req: Request, res: Response) =>
  TeamController.findByPk(req, res));

export default router;
