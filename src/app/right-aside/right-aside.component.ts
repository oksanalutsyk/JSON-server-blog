import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../shared/interfaces/post.interface';
import { MatRadioButton } from '@angular/material/radio';

@Component({
  selector: 'app-right-aside',
  templateUrl: './right-aside.component.html',
  styleUrls: ['./right-aside.component.scss']
})
export class RightAsideComponent implements OnInit {

  id:number

  posts: Post[] = [];


  constructor(private postService:PostService) { }

  ngOnInit() {
    this.getPosts()
  }

  public checkRadioButton (event): void {
    this.id = event.path[3].id;
    console.log(this.id)
    // this.onShowButtons.emit(this.id);
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

}
