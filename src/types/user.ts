export type User = {
    userName: string,
    password: string
};

export type CreateRes = {
    userID: string,
    username: string,
    books: [
        {
            isbn: string,
            title: string,
            subTitle:string,
            author: string,
            publish_date: Date,
            publisher: string,
            pages: number,
            description: string,
            website: string
        }
    ]
};

export type GetUserRes = {
    userId: string,
    username: string,
    books: [
        {
            isbn: string,
            title: string,
            subTitle:string,
            author: string,
            publish_date: Date,
            publisher: string,
            pages: number,
            description: string,
            website: string
        }
    ]
}

export type GetTokenResponse = {
    token: string,
    expires: Date,
    status: string,
    result: string
}