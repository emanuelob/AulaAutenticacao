export class UserEntity {
    id: string;
    email: string;
    senha: string;
    name?: string;
    createdAt: Date;
    updatedAt: Date;
}