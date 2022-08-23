import { Response, Request, Router } from 'express';
import MatcheService from '../services/MatcheService';
import MatcheController from '../controllers/MatcheController';
import ValidateRequestBody from '../middlewares/ValidateRequestBody';

const matcheService = new MatcheService();
const matcheController = new MatcheController(matcheService);

const router = Router();

router.get('/', (req: Request, res: Response) =>
  matcheController.findAll(req, res));

router.post('/', ValidateRequestBody.validateToken, (req: Request, res: Response) =>
  matcheController.create(req, res));

router.patch('/:id/finish', (req: Request, res: Response) =>
  matcheController.update(req, res));

export default router;
