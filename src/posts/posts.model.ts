import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";

interface PostCreationAttrs {
    userId: number;
    title: string;
    content: any[];
    image?: string;
}

@Table({ tableName: "posts" })
export class Post extends Model<Post, PostCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @Column({ type: DataType.JSONB, allowNull: false })
    content: any[];

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    views: number;

    @Column({ type: DataType.STRING, allowNull: true })
    tags: string;

    @Column({ type: DataType.STRING, allowNull: true })
    image: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @BelongsTo(() => User)
    author: User;
}
