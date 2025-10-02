export class UpdateUserProfileCommand {
    constructor(
        public readonly id: number,
        public readonly first_name?: string,
        public readonly last_name?: string,
        public readonly age?: number,
    ){}
}