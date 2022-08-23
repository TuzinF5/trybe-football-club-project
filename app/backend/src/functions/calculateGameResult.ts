import { IGoals } from '../interfaces/IHomeTeams';

function calculateTotalWins(homeTeamMatches: IGoals[]) {
  return homeTeamMatches
    ?.map((data) => {
      let wins = 0;
      if (data.homeTeamGoals > data.awayTeamGoals) {
        wins += 1;
      }

      return wins;
    })
    .reduce((initial, current) => initial + current, 0);
}

function calculateTotalDraws(homeTeamMatches: IGoals[]) {
  return homeTeamMatches
    ?.map((data) => {
      let draws = 0;
      if (data.homeTeamGoals === data.awayTeamGoals) {
        draws += 1;
      }

      return draws;
    })
    .reduce((initial, current) => initial + current, 0);
}

function calculateTotalLosses(homeTeamMatches: IGoals[]) {
  return homeTeamMatches
    ?.map((data) => {
      let defeats = 0;
      if (data.awayTeamGoals > data.homeTeamGoals) {
        defeats += 1;
      }

      return defeats;
    })
    .reduce((initial, current) => initial + current, 0);
}

function calculateTotalPoints(victories = 0, defeats = 0, draws = 0) {
  const victoryPoints = victories * 3;
  const defeatPoints = defeats * 0;
  const tiePoints = draws;

  return victoryPoints + defeatPoints + tiePoints;
}

function percentageOfGamesWon(totalPoints: number, totalGames = 0) {
  const result = (totalPoints / (totalGames * 3)) * 100;
  return result.toFixed(2);
}

export {
  calculateTotalWins,
  calculateTotalDraws,
  calculateTotalLosses,
  calculateTotalPoints,
  percentageOfGamesWon,
};
