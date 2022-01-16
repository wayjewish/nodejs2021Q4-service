import { createConnection } from "typeorm";
import CONFIG from './config';
import User from '../resources/users/user.model';
import Board from '../resources/boards/board.model';
import Task from '../resources/tasks/task.model';

export const connection = createConnection({
    type: "postgres", 
    host: "host.docker.internal",
    port: Number(CONFIG.POSTGRES_PORT),
    username: CONFIG.POSTGRES_USER,
    password: CONFIG.POSTGRES_PASSWORD,
    database: CONFIG.POSTGRES_DB,
    entities: [
        User,
        Board,
        Task,
    ],
    synchronize: true,
    logging: false
});
