
export interface User {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface Account extends User {
    id: number,
    isAccountPrivate: boolean,
    followings: FollowRelation[],
    followers: FollowRelation[],
    avatar: string,
    bio: string,
    posts: Post[]
}

export type FollowRelation = {
    receiver: Account,
    sender: Account
}

export interface Context {
    user: Account,
    setUser: (user: Account) => void
}

export type ResponseAccount = {
    followsMe: boolean,
    requestSent: boolean,
    followStatus: boolean,
    user: Account
}

export type FollowRequest = {
    id: number,
    sender: Account
}

export type RequestAccount = {
    requests: FollowRequest[]
}

export interface Author extends Account{
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    avatar: string;
}

export type Comment = {
    id: number,
    postId: number;
    userId: number;
    text: string;
    user: Author;
    reactions: CommentReaction[];
}

export type CommentReaction = {
    id: number;
    commentId: number;
    userId: number;
}


export type PostReaction = {
    id: number,
    postId: number,
    userId:number,
    reactedBy: Author
}

export type Post = {
    id: number,
    author: Author,
    authorId: number,
    title: string,
    description: string,
    postImage: string,
    tags: string[],
    location: string,
    postComments: Comment[],
    postReactions: PostReaction[]
}

export type ResponsePost = {
    postInfo: Post
}

export type ResponseComment = {
    comment: Comment
}

