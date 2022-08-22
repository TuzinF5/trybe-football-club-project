import { Model, INTEGER } from 'sequelize';
import db from '.';
import Team from './Team';

class Matche extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: number;
}

Matche.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    homeTeam: {
      allowNull: false,
      type: INTEGER,
      references: {
        model: Team,
        key: 'id',
      },
    },
    homeTeamGoals: {
      allowNull: false,
      type: INTEGER,
    },
    awayTeam: {
      allowNull: false,
      type: INTEGER,
      references: {
        model: Team,
        key: 'id',
      },
    },
    awayTeamGoals: {
      allowNull: false,
      type: INTEGER,
    },
    inProgress: {
      allowNull: false,
      type: INTEGER,
    },
  },
  {
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
    underscored: true,
  },
);

Matche.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Matche.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

Team.hasMany(Matche, { foreignKey: 'homeTeam', as: 'homeTeamMatches' });
Team.hasMany(Matche, { foreignKey: 'awayTeam', as: 'awayTeamMatches' });

export default Matche;
