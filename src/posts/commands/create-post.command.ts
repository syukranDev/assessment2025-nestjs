export class CreatePostCommand {
    constructor(
        public readonly username: string,
        public readonly title: string,
        public readonly description: string,
        public readonly tags?: string[],
    ){}
}