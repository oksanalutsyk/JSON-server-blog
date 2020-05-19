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
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.scss"],
})
export class PostFormComponent implements OnInit, OnChanges {
  form: FormGroup;
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
  ngOnInit() {
    this.form = new FormGroup({
      postTitle: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      postBody: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }
  public submit(buttonType) {
    const formData = { ...this.form.value };
    this.postTitle = formData.postTitle;
    this.postBody = formData.postBody;

    if (buttonType === "Add") {
      this.isAddPost()
    }
    if (buttonType === "Edit") {
      this.saveEditChanges()
    }
  }

  public saveEditChanges() {
    const newPost: Post = new NewPost(
      this.editId,
      this.postTitle,
      this.postBody,
      this.postImg
    );
    this.postService.editPost(newPost).subscribe(() => {
      this.getPosts();
    });
    this.editStatus = false;
    this.form.reset()
  }

  public editPost() {
    this.editStatus = true;
    this.postTitle = this.editObj.title;
    this.postBody = this.editObj.body;
    this.editId = this.editObj.id;
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
      this.postService.addPost(newPost).subscribe(() => {
        this.getPosts();
      });
      this.form.reset()
    }
  }
}
