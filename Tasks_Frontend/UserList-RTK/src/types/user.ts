export type User = {
    id: number,
    fullName: string,
    username: string,
    email: string,
    address: string,
    age: number
}

export interface UserState {
    users: User[],
    loading: boolean,
    error: string | null
}
