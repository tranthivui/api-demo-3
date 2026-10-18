export type User = {
    userName: string,
    password: string
};

export type CreateRes = {
    "userID": "string",
    "username": "string",
    "books": [
        {
            "isbn": "string",
            "title": "string",
            "subTitle": "string",
            "author": "string",
            "publish_date": "2026-10-18T14:31:13.312Z",
            "publisher": "string",
            "pages": 0,
            "description": "string",
            "website": "string"
        }
    ]
}

export type GetTokenResponse = {
    "token": "string",
    "expires": "2026-10-18T15:02:23.581Z",
    "status": "string",
    "result": "string"
}