export interface IReviewState {
    id: number,
    star: string,
    comment: string,
    createdAt: string,
    users: {
        id: number,
        signinId: string,
    }
}
