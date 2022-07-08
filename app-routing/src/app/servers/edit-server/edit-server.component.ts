import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { queueScheduler } from 'rxjs';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {

  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = (+queryParams['allowEdit'] === 1 ? true : false);
        console.log('Propriedade: ' + this.allowEdit);
        console.log('Parametro === 1: '+ (queryParams['allowEdit'] === '1') );
      }
    );
    this.route.fragment.subscribe();
    this.server = this.serversService.getServer(+this.route.snapshot.params['id']);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    console.log('Srv Status: ' + this.serverStatus);

  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, { name: this.server.name, status: this.serverStatus });
    this.changesSaved = true;
    this.router.navigate(['./'], { relativeTo: this.route });
  }

}
