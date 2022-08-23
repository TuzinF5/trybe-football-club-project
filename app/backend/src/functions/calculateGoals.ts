import { IGoals, IHomeTeams } from '../interfaces/IHomeTeams';

function calculateGoalsInFavor(homeTeamGoals: IGoals[]) {
  return homeTeamGoals?.reduce(
    (initial, current) => initial + current.homeTeamGoals,
    0,
  );
}

function calculateGoalsConceded(awayTeamGoals: IGoals[]) {
  return awayTeamGoals?.reduce(
    (initial, current) => initial + current.awayTeamGoals,
    0,
  );
}

function calculateGoalDifference(homeTeamGoals = 0, awayTeamGoals = 0) {
  return homeTeamGoals - awayTeamGoals;
}

function resultOfAllGoals(team: IHomeTeams) {
  const goalsFavor = calculateGoalsInFavor(team.homeTeamMatches);
  const goalsOwn = calculateGoalsConceded(team.homeTeamMatches);
  const goalsBalance = calculateGoalDifference(goalsFavor, goalsOwn);

  return { goalsFavor, goalsOwn, goalsBalance };
}

export default resultOfAllGoals;
