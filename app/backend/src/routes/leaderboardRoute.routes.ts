import { Request, Response, Router } from 'express';
import MatcheController from '../controllers/MatcheController';
import MatcheService from '../services/MatcheService';

const matcheService = new MatcheService();
const matcheController = new MatcheController(matcheService);

const router = Router();

router.get('/home', (req: Request, res: Response) =>
  matcheController.homeTeamRankings(req, res));

export default router;
