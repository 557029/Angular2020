import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Post} from './post.model';
import {map, catchError} from 'rxjs/operators';
import {Subject, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  createAndStorePost(tlt: string, contenst: string) {
    const postData: Post = ({title: tlt, content: contenst});
    return this.http.post<{name: string}>('https://ng-complete-class.firebaseio.com/posts.json',
      postData);
  }

  fetchPost() {
    return this.http.get<{[key: string]: Post}>('https://ng-complete-class.firebaseio.com/posts.json')
      .pipe(map((responseData: {[key: string]: Post}) => {
        const postArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({...responseData[key], id: key});
          }
        }
        return postArray;
      }), catchError( errorRes => {
        // Send errors for analytics
        return throwError(errorRes);
      })
      );
  }

  deletePost() {
    return this.http.delete<{[key: string]: Post}>('https://ng-complete-class.firebaseio.com/posts.json');
  }

}
