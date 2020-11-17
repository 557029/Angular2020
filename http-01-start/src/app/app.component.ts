import { Component, OnInit } from '@angular/core';

import {Post} from './post.model';
import {PostService} from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postService.fetchPost().subscribe(postData => {
      this.isFetching = false;
      this.loadedPosts = postData;
      console.log(this.loadedPosts.length);
    });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    // console.log(postData);
    this.postService.createAndStorePost(postData.title, postData.content).subscribe(() => {
      this.onFetchPosts();
    });
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPost().subscribe(postData => {
      this.isFetching = false;
      this.loadedPosts = postData;
      console.log(this.loadedPosts.length);
    });
  }

  onClearPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.deletePost().subscribe(() => {
      this.onFetchPosts();
    });
  }
}
