import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Post} from './post.model';
import {PostsService} from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.postsService.fetchPosts().subscribe(posts => {this.loadedPosts = posts});
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.postsService.createAndStorePost(postData.title, postData.content).subscribe(()=>{
      console.log(postData);
      this.onFetchPosts();
    });
  }

  onFetchPosts() {
    this.postsService.fetchPosts().subscribe(posts => {
      this.loadedPosts = posts;
    }, error => {
      console.log('error');
    });
  }

  onClearPosts() {
    this.postsService.clearPosts().subscribe(()=>{
      this.onFetchPosts();
    })
  }
}
