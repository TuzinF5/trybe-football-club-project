import Team from '../database/models/Team';

export default class TeamService {
  static async findAll() {
    return Team.findAll();
  }

  static async findByPk(id: number) {
    return Team.findByPk(id);
  }
}
