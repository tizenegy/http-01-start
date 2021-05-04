import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPost();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post('https://angular-http-389af-default-rtdb.europe-west1.firebasedatabase.app/posts.json', postData)
      .subscribe(responseData => {
      console.log(responseData);
    });
  }

  private fetchPost() {
    this.http.get('https://angular-http-389af-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
      .pipe(
        map(responseData => {
          const postsArray =[];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)){
              postsArray.push({...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      )
      .subscribe(posts => {
      console.log(posts);
    });
  }

  onFetchPosts() {
    this.fetchPost();
  }

  onClearPosts() {
    // Send Http request
  }
}
