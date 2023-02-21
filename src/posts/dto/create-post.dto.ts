export class CreatePostDto {
    readonly userId: number; //надо доставать из токена
    readonly title: string;
    readonly content: any[];
    readonly views?: number;
    readonly tags?: string;
    readonly image?: string;
}
