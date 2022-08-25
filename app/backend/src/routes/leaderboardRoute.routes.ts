import { Request, Response, Router } from 'express';
import MatcheController from '../controllers/MatcheController';
import MatcheService from '../services/MatcheService';

const matcheService = new MatcheService();
const matcheController = new MatcheController(matcheService);

const router = Router();

router.get('/', (req: Request, res: Response) =>
  matcheController.teamRanking(req, res));

router.get('/home', (req: Request, res: Response) =>
  matcheController.homeTeamRankings(req, res));

router.get('/away', (req: Request, res: Response) =>
  matcheController.awayTeamRankings(req, res));

export default router;
