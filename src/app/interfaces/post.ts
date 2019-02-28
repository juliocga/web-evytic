

export interface Post{
    title:string;
    photoURL: string;
    content:string;
    lastModifiedDate:number;
    key$?:string;
}
export class Post {
    title:    string;
    photoURL: string;
    content:  string;
    lastModifiedDate:number;
    key$? :string;

    constructor(postData) {
        this.title    = postData.title
        this.photoURL = postData.photoURL
        this.content = postData.content
    }
}