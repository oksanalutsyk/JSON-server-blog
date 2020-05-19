import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import { Post } from "../shared/interfaces/post.interface";
import { PostService } from "../services/post.service";
import { NewPost } from "../shared/classes/new-post.class";

@Component({
  selector: "app-post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.scss"],
})
export class PostFormComponent implements OnInit, OnChanges {
  @Input() obj: Post;
  posts: Array<Post> = [];
  newPost: Post;
  postTitle: string;
  postBody: string;
  postImg: string =
    "https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/21_Angular-512.png";
  editStatus: boolean = false;
  editObj: Post;
  editId: number;

  constructor(private postService: PostService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.obj && changes.obj) {
      this.editObj = changes.obj.currentValue;
      console.log(this.editObj);
      this.editPost();
    }
  }
  ngOnInit() {}

  public saveEditChanges(){
    const newPost: Post = new NewPost(
      this.editId,
      this.postTitle,
      this.postBody,
      this.postImg
    );
    this.postTitle = null;
    this.postBody = null;
    this.postService.editPost(newPost).subscribe(() => {
      this.getPosts();
    })
    this.editStatus = false;
  }

  public editPost() {
    this.editStatus = true;
    this.postTitle = this.editObj.title;
    this.postBody =  this.editObj.body;
    this.editId = this.editObj.id
  }

  public getPosts(): void {
    this.postService.getPosts().subscribe(
      (posts) => {
        this.posts = posts;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  public isAddPost(): void {
    const newPost: Post = new NewPost(
      0,
      this.postTitle,
      this.postBody,
      this.postImg
    );
    if (this.posts.length >= 1) {
      newPost.id = this.posts.slice(-1)[0].id + 1;
      this.postTitle = "";
      this.postBody = "";
      this.postService.addPost(newPost).subscribe(() => {
        this.getPosts();
      });
    } else {
      this.newPost = {
        id: 0,
        title: this.postTitle,
        body: this.postBody,
        img: this.postImg,
      };
      this.posts.push(newPost);
      this.postTitle = "";
      this.postBody = "";
      this.postService.addPost(newPost).subscribe(() => {
        this.getPosts();
      });
      console.log(newPost);
    }
  }
}
