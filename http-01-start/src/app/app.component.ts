import {Component, OnDestroy, OnInit} from '@angular/core';

import {Post} from './post.model';
import {PostService} from './post.service';
import {Subject, Subscriber, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  errors = null;

  error = new Subject<string>();
  private errorSubscr: Subscription;


  constructor(private postService: PostService) {}

  ngOnInit() {
    this.errorSubscr = this.error.subscribe(errorMessage => {
      this.errors = errorMessage;
    });

    this.isFetching = true;
    this.postService.fetchPost().subscribe(postData => {
      this.isFetching = false;
      this.loadedPosts = postData;
      console.log(this.loadedPosts.length);
    }, error => {
      this.errors = error.message;
    });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    // console.log(postData);
    this.postService.createAndStorePost(postData.title, postData.content).subscribe(() => {
      this.onFetchPosts();
    }, error => {
      this.error = error;
    });
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPost().subscribe(postData => {
      this.isFetching = false;
      this.loadedPosts = postData;
      console.log(this.loadedPosts.length);
    }, error => {
      this.errors = error.message;
    });
  }

  onClearPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.deletePost().subscribe(() => {
      this.onFetchPosts();
    });
  }

  ngOnDestroy(): void {
    this.errorSubscr.unsubscribe();
  }


}
