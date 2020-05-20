import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { PostService } from "../services/post.service";
import { Post } from "../shared/interfaces/post.interface";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"],
})
export class PostsComponent implements OnInit {
  @Output() onEdit: EventEmitter<Post> = new EventEmitter<Post>();
  posts: Post[] = [];
  postImg: string =
    "https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/21_Angular-512.png";

  postTitle: string;
  postBody: string;
  editStatus: boolean;
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getPosts();
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

  public deletePost(item: Post): void {
    const id = item.id;
    this.postService.delPost(id).subscribe(() => {
      this.getPosts();
    });
  }

  public editPost(post: Post): void {
    this.onEdit.emit(post); //send data
  }
}
