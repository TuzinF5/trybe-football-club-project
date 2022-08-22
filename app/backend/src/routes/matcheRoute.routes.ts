import { Response, Request, Router } from 'express';
import MatcheService from '../services/MatcheService';
import MatcheController from '../controllers/MatcheController';

const matcheService = new MatcheService();
const matcheController = new MatcheController(matcheService);

const router = Router();

router.get('/', (req: Request, res: Response) =>
  matcheController.findAll(req, res));

router.post('/', (req: Request, res: Response) =>
  matcheController.create(req, res));

export default router;
