import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/posts.model";

interface UserCreationAttrs {
    fullName: string;
    email: string;
    password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: "1", description: "Уникальный идентификатор"})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({example: "User", description: "Имя пользователя"})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    fullName: string;

    @ApiProperty({example: "user@gmail.com", description: "Почтовый адрес"})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({example: "123456789", description: "Пароль"})
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @HasMany(() => Post)
    posts: Post[];
}
