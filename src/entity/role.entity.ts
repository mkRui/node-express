import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('user_jurisdiction')
export class UserJurisdiction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_type: string;

    @Column()
    user_role: number;

    @Column()
    role_content: number;

}
