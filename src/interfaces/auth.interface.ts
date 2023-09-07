
export interface IAuthCredentialsPromise {
    name: string;
    email: string;
    id: string;
}

export interface IAuthSession {
    user: IAuthCredentialsPromise
}