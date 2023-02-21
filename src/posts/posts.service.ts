import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Post } from "./posts.model";
import { FilesService } from "../files/files.service";
import { UpdatePostDto } from "./dto/update-post.dto";
import { SearchPostDto } from "./dto/search-post.dto";

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post) private postRepository: typeof Post,
        private fileService: FilesService
    ) {}

    async create(dto: CreatePostDto, image: string) {
        if (image) {
            const fileName = await this.fileService.createFile(image);
            const post = await this.postRepository.create({ ...dto, image: fileName });
            return post;
        } else {
            const post = await this.postRepository.create({
                title: dto.title,
                content: dto.content,
            });
            return post;
        }
    }

    async getAllPosts() {
        const posts = await this.postRepository.findAll({
            order: [["createdAt", "DESC"]],
        });
        return posts;
    }

    async search(title: any) {
        const { rows, count } = await this.postRepository.findAndCountAll({
            where: { title },
            limit: 10,
        });
        return { rows, count };
    }

    async getOnePost(id: string) {
        const posts = await this.postRepository.findOne({ where: { id } });

        if (!posts) {
            throw new NotFoundException("Статья не найдена");
        }
        return posts;
    }

    async popularPosts() {
        const { rows, count } = await this.postRepository.findAndCountAll({
            order: [["views", "DESC"]],
            limit: 10,
        });
        return { rows, count };
    }

    async deletePost(id: string) {
        const post = await this.postRepository.destroy({ where: { id } });

        if (!post) {
            throw new NotFoundException("Статья не найдена");
        } else {
            console.log("Статья удалена");
        }

        return post;
    }

    // Add updatePost
    // Add Search
}
