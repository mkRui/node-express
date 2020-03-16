// 用户列表

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_role_id: number;

    @Column()
    name: string;

    @Column()
    nikename: string;

    @Column()
    create_time: Date;

    @Column()
    email: string;

    @Column()
    last_login: Date;

    @Column()
    password: string;

    @Column()
    face: string;

    @Column()
    user_state: number;

    @Column()
    web_url: number;
}