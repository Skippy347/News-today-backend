import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostsService } from "./posts.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdatePostDto } from "./dto/update-post.dto";

@Controller("posts")
export class PostsController {
    constructor(private postService: PostsService) {}

    @Post()
    @UseInterceptors(FileInterceptor("image"))
    createPost(@Body() dto: CreatePostDto, @UploadedFile() image?: string) {
        return this.postService.create(dto, image);
    }

    @Get("popular")
    getPopularPosts() {
        return this.postService.popularPosts();
    }

    @Get()
    getAll() {
        return this.postService.getAllPosts();
    }

    @Get("/search")
    searchPosts(@Query("title") title: any) {
        return this.postService.search(title);
    }

    @Get(":id")
    getOne(@Param("id") id: string) {
        console.log(id);
        return this.postService.getOnePost(id);
    }

    @Delete(":id")
    removePost(@Param("id") id: string) {
        return this.postService.deletePost(id);
    }
}
