enum PostViewsEnum {
    DESC = "DESC",
    ASC = "ASC",
}

export class SearchPostDto {
    title: string;
    content: string;
    views: PostViewsEnum;
    tags: string; 
    limit: number;
    take: number;

}
