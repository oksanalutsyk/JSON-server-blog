import { Post } from "../interfaces/post.interface";

export class NewPost implements Post {
  constructor(
    public id: number,
    public title: string,
    public body: string,
    public image?: string
  ) {}
}
