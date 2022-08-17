// Antes, esse arquivo era gerado automaticamente e já fazia o reconhecimento dos models gerados pelo sequelize-cli.
// No nosso caso, esse arquivo servirá única e exclusivamente para gerar e exportar uma nova instância do Sequelize, baseada na configuração anterior (já assegurada pela tipagem):
import { Sequelize } from 'sequelize';
import * as config from '../config/database';

export default new Sequelize(config);
