import { Model, STRING, INTEGER } from 'sequelize';
import { IGoals } from '../../interfaces/IHomeTeams';
import db from '.';

class Team extends Model {
  id!: number;
  teamName!: string;
  homeTeamMatches?: IGoals[];
}

Team.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    teamName: {
      allowNull: false,
      type: STRING,
    },
  },
  {
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
    underscored: true,
  },
);

export default Team;
