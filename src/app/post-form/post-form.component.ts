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
import { Subscription } from "rxjs";

@Component({
  selector: "app-post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.scss"],
})
export class PostFormComponent implements OnInit, OnChanges {
  @Input() obj: Post;
  form: FormGroup;
  posts: Array<Post> = [];
  newPost: Post;
  postTitle: string;
  postBody: string;
  postImg: string =
    "https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/21_Angular-512.png";
  postChecked: boolean = false;
  editStatus: boolean = false;
  editObj: Post;
  editId: number;

  subscription: Subscription;
  constructor(private postService: PostService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.obj && changes.obj) {
      this.editObj = changes.obj.currentValue;
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

    this.postService.postsState$.subscribe(value=>{
      this.posts = value
    })
  }

  public getPosts(): void {
    this.subscription = this.postService.getPosts().subscribe(
      (posts) => {
        this.postService.setNewSubjectValue(posts)

        console.log(posts);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  public submit(buttonType) {
    const formData = { ...this.form.value };
    this.postTitle = formData.postTitle;
    this.postBody = formData.postBody;

    if (buttonType === "Add") {
      this.isAddPost();
      this.getPosts()
    }
    if (buttonType === "Edit") {
      this.saveEditChanges();
      this.getPosts()
    }
  }

  public saveEditChanges() {
    const newPost: Post = new NewPost(
      this.editId,
      this.postTitle,
      this.postBody,
      this.postImg
    );
    this.postService.editPost(newPost).subscribe();
    this.editStatus = false;
    this.form.reset();
  }

  public editPost() {
    this.editStatus = true;
    this.postTitle = this.editObj.title;
    this.postBody = this.editObj.body;
    this.editId = this.editObj.id;
  }

  public isAddPost(): void {
    const newPost: Post = new NewPost(
      0,
      this.postTitle,
      this.postBody,
      this.postImg,
      this.postChecked
    );
    if (this.posts.length >= 1) {
      newPost.id = this.posts.slice(-1)[0].id + 1;
      this.subscription = this.postService.addPost(newPost).subscribe();
    } else {
      this.newPost = {
        id: 0,
        title: this.postTitle,
        body: this.postBody,
        img: this.postImg,
        checked: this.postChecked,
      };
      this.getPosts();
      console.log(this.posts);
      this.subscription = this.postService.addPost(newPost).subscribe();
      this.form.reset();
    }
  }
}
