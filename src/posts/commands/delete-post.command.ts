export class DeletePostCommand {
    constructor(
        public readonly username: string,
        public readonly id: number,
    ){}
}