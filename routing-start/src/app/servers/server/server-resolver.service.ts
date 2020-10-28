import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ServersService} from '../servers.service';
import {Injectable} from '@angular/core';
import {Server} from '../../shared/Server';

@Injectable()
export class ServerResolver implements Resolve<Server> {
  constructor(private serversService: ServersService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
    this.serversService.getServer(route.params['id']);
    return ;
  }


}
