import { Post } from 'src/post/entities/post.entity';

export class User {
    id: string;
    email: string;
    senha: string;
    name?: string;
    posts: Post[];
    createdAt: Date;
    updatedAt: Date;
}