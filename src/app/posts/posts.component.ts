import { Component, OnInit, Output, EventEmitter, OnDestroy } from "@angular/core";
import { PostService } from "../services/post.service";
import { Post } from "../shared/interfaces/post.interface";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"],
})
export class PostsComponent implements OnInit, OnDestroy {
  @Output() onEdit: EventEmitter<Post> = new EventEmitter<Post>();
  posts: Post[] = [];
  postImg: string =
    "https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/21_Angular-512.png";

  postTitle: string;
  postBody: string;
  editStatus: boolean;

  private subscription: Subscription;
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getPosts();
    this.postService.postsState$.subscribe(value=>{
      this.posts = value
    })
  }
 
  public getPosts(): void {
    this.subscription = this.postService.getPosts().subscribe(
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
    this.subscription = this.postService.delPost(id).subscribe(() => {
      this.getPosts();
    });
  }

  public editPost(post: Post): void {
    this.onEdit.emit(post); //send data
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
