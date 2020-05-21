import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { Post } from "../shared/interfaces/post.interface";
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private url: string;

  public postsState$: Observable<any>;
  private postsStateSubject: BehaviorSubject<any>;
  private postsState: any = null;

  constructor(private http: HttpClient) {
    this.url = "http://localhost:3001/posts";
    this.postsStateSubject = new BehaviorSubject(
      this.postsState
    ) as BehaviorSubject<any>;
    this.postsState$ = this.postsStateSubject.asObservable();
  }

  public setNewSubjectValue(value: any) {
    this.postsState = value;
    this.postsStateSubject.next(value);
  }

  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url).pipe(delay(1000));
  }
  public addPost(post: Post): Observable<Post[]> {
    return this.http.post<Post[]>(this.url, post);
  }
  public delPost(id: number): Observable<Post[]> {
    return this.http.delete<Post[]>(`${this.url}/${id}`);
  }
  public editPost(post: Post): Observable<Post[]> {
    return this.http.put<Post[]>(`${this.url}/${post.id}`, post);
  }
  public getPostDetails(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.url}/${id}`);
  }

  public editPosts(posts:Array<Post>): Observable<Post[]> {
    return this.http.put<Post[]>(`${this.url}`, posts);
  }
}
