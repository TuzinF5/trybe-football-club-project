export interface IGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IHomeTeams {
  teamName: string;
  homeTeamMatches: IGoals[];
}

export interface IAwayTeams {
  teamName: string;
  awayTeamMatches: IGoals[];
}
