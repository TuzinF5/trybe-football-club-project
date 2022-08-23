import { IHomeTeams } from '../interfaces/IHomeTeams';
import {
  calculateTotalDraws,
  calculateTotalLosses,
  calculateTotalPoints,
  calculateTotalWins,
  percentageOfGamesWon,
} from './calculateGameResult';
import resultOfAllGoals from './calculateGoals';

function calculateTeamResults(team: IHomeTeams) {
  const resultOfGoals = resultOfAllGoals(team);
  const totalVictories = calculateTotalWins(team.homeTeamMatches);
  const totalDraws = calculateTotalDraws(team.homeTeamMatches);
  const totalLosses = calculateTotalLosses(team.homeTeamMatches);
  const totalPoints = calculateTotalPoints(totalVictories, totalLosses, totalDraws);
  const efficiency = percentageOfGamesWon(totalPoints, team.homeTeamMatches?.length);

  return {
    name: team.teamName,
    totalPoints,
    totalGames: team.homeTeamMatches?.length,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor: resultOfGoals.goalsFavor,
    goalsOwn: resultOfGoals.goalsOwn,
    goalsBalance: resultOfGoals.goalsBalance,
    efficiency,
  };
}

export default calculateTeamResults;
