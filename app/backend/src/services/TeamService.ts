import Team from '../database/models/Team';

export default class TeamService {
  static async findAll() {
    return Team.findAll();
  }
}
