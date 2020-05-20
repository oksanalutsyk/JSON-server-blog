import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../shared/interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3001/posts'
  }

  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }
  public addPost(post: Post): Observable<Post[]> {
    return this.http.post<Post[]>(this.url, post);
  }
  public delPost(id: number): Observable<Post[]> {
    return this.http.delete<Post[]>(`${this.url}/${id}`);
  }
  public editPost(post:Post):Observable<Post[]> {
    return this.http.put<Post[]>(`${this.url}/${post.id}`, post);
  }
  public getPostDetails(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.url}/${id}`);
  }
}
