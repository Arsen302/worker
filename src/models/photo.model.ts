import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  UpdateDateColumn,
  ManyToOne,
  Generated,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import User from './user.model';

@Entity('photos')
class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Generated('uuid')
  name!: string;

  @Column({ name: 'converted_name' })
  convertedName!: string;

  @Column({ name: 'client_name' })
  clientName!: string;

  // @Column({ name: 'user_id' })
  // userId!: number;

  @Column()
  file_path!: string;

  @Column()
  converted_file_path!: string;

  @Column({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({
    onUpdate: 'now()',
    name: 'updated_at',
  })
  updatedAt!: Date;

  @Column({
    name: 'deleted_at',
  })
  deletedAt!: Date;

  @ManyToOne(() => User, (user) => user.photos)
  @JoinColumn({ name: 'user_id' })
  user?: any;
  // user?: User;
}

export default Photo;
