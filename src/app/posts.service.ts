import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {Post} from './post.model';
import {map, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService{
  constructor(private http: HttpClient) {
  }

  createAndStorePost(title: string, content: string){
    const postData: Post = {title, content};
    return this.http.post<{name:string}>(
      'https://angular-http-389af-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      postData,
      {
        observe: 'response'
      }
    )
  }
  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>(
      'https://angular-http-389af-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
    )
      .pipe(
        map(responseData => {
          const postsArray: Post[] =[];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)){
              postsArray.push({...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      );
  }

  clearPosts() {
    return this.http.delete(
      'https://angular-http-389af-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      {
        observe: 'events'
      }
    ).pipe(
      tap(event => {
        console.log(event);
      })
    );
  }
}
