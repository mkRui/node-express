//  邮箱验证码

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('email_code')
export class EmailCode {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    code: number;

    @Column()
    create_time: Date;

}
