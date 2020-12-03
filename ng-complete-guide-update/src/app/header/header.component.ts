import {Component, OnDestroy, OnInit} from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import {map} from 'rxjs/operators';
import * as AuthAction from '../auth/store/auth.actions';
import * as RecipeAction from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.userSub = this.store.select('auth').pipe(map(appState => {
      return appState.user;
    })).subscribe( user => {
      this.isAuthenticated = !!user;
    });

    // this.userSub = this.authService.user.subscribe(user => {
    //   this.isAuthenticated = !!user;
    // });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }


  onSaveData() {
    this.store.dispatch(new RecipeAction.StoreRecipes());
    // this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipeAction.FetchRecipes());
  }

  onLogout() {
    // this.authService.logout();
    this.store.dispatch(new AuthAction.Logout());
  }
}
