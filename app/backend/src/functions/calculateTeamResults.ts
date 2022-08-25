import { IAwayTeams, IHomeTeams } from '../interfaces/IHomeTeams';
import {
  calculateTotalDraws,
  calculateTotalLosses,
  calculateTotalPoints,
  calculateTotalWins,
  percentageOfGamesWon,
} from './calculateGameResult';
import { resultOfAllGoalsHomeTeam, resultOfAllGoalsAwayTeam } from './calculateGoals';

function calculateHomeTeamResults(team: IHomeTeams) {
  const resultOfGoals = resultOfAllGoalsHomeTeam(team);
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

function calculateAwayTeamResults(team: IAwayTeams) {
  const resultOfGoals = resultOfAllGoalsAwayTeam(team);
  const totalVictories = calculateTotalLosses(team.awayTeamMatches);
  const totalDraws = calculateTotalDraws(team.awayTeamMatches);
  const totalLosses = calculateTotalWins(team.awayTeamMatches);
  const totalPoints = calculateTotalPoints(totalVictories, totalLosses, totalDraws);
  const efficiency = percentageOfGamesWon(totalPoints, team.awayTeamMatches?.length);

  return {
    name: team.teamName,
    totalPoints,
    totalGames: team.awayTeamMatches?.length,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor: resultOfGoals.goalsFavor,
    goalsOwn: resultOfGoals.goalsOwn,
    goalsBalance: resultOfGoals.goalsBalance,
    efficiency,
  };
}

export { calculateHomeTeamResults, calculateAwayTeamResults };
