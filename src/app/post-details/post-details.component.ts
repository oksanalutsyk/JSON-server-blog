import { Component, OnInit } from "@angular/core";
import { PostService } from "../services/post.service";
import { ActivatedRoute } from "@angular/router";
import { Post } from "../shared/interfaces/post.interface";

@Component({
  selector: "app-post-details",
  templateUrl: "./post-details.component.html",
  styleUrls: ["./post-details.component.scss"],
})
export class PostDetailsComponent implements OnInit {
  postId: number;
  view: Post;
  postImg: string =
  "https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/21_Angular-512.png";
  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getPost();
  }

  public getPost(): void {
    this.postId = Number(this.route.snapshot.paramMap.get("id"));
    this.postService.getPostDetails(this.postId).subscribe((data) => {
      this.view = data;
    });
  }
}
