export class UpdatePostCommand {
    constructor(
        public readonly username: string,
        public readonly id: number,
        public readonly title: string,
        public readonly description: string,
        public readonly tags: string[],
    ){}
}