
import { join } from 'path';

const EntityRecursivePath = join(__dirname + '/../**/*.entity{.ts,.js}',);

let proces = require('dotenv').config();

export const MysqlConfig: any = {
    type: 'mysql',
    host: proces.parsed.BD_IP,
    port: 3306,
    username: 'root',
    password: proces.parsed.BD_PASSWORD,
    entities: [EntityRecursivePath],
    synchronize: true,
    database: 'blog_database'
}