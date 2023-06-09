import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column()
  public name: string;

  @Column()
  public age: number;

  @CreateDateColumn()
  public created_at?: Date;

  @UpdateDateColumn()
  public updated_at?: Date;
}

export default User;
