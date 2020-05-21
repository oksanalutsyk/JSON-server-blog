import { Component, OnInit, Input } from "@angular/core";
import { PostService } from "../services/post.service";
import { Post } from "../shared/interfaces/post.interface";
import { MatRadioChange } from '@angular/material';
import { NewPost } from '../shared/classes/new-post.class';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-right-aside",
  templateUrl: "./right-aside.component.html",
  styleUrls: ["./right-aside.component.scss"],
})
export class RightAsideComponent implements OnInit {
  id: number;
  postId:number
  view: Post;
  posts: Post[] = [];
  postImg: string =
    "https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/21_Angular-512.png";
  postChecked: boolean;
  subscription: Subscription
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.postsState$.subscribe(value=>{
      this.posts = value
    })
    this.getPosts();
  }


  public radioChange(event: MatRadioChange, id) {
    this.postId = id;
    this.postService.getPostDetails(this.postId).subscribe((data) => {
      this.view = data;
      console.log(this.view)
      const newPost: Post = new NewPost(
        this.view.id,
        this.view.title,
        this.view.body,
        this.view.body,
        this.view.checked = true,
      );
      this.postService.editPost(newPost).subscribe(() => {
        this.getPosts();
      });
    });
    
  }

  // public resetRadio(){
  //   this.subscription = this.postService.getPosts().subscribe(
  //     (posts) => {
  //       this.posts = posts;
  //       this.posts.array.forEach(element => {
  //         element.checked
  //       });
  //   );
  //   console.log(this.posts)
  // }
  
  public getPosts(): void {
    this.subscription = this.postService.getPosts().subscribe(
      (posts) => {
        this.posts = posts;
        this.postService.setNewSubjectValue(this.posts)
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
