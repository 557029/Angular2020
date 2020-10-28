import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {Server} from '../../shared/Server';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: Server;

  constructor(private serversService: ServersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.server = this.route.data['server'];
      });
    // const id = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);
    // this.route.params.subscribe((params: Params) => {
    //   this.server = this.serversService.getServer(+params['id']);
    // });
  }

  onEdit() {
    this.router.navigate([ 'edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }
}
