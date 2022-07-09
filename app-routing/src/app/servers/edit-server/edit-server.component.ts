import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, CanDeactivate, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = +queryParams['allowEdit'] === 1 ? true : false;
    });
    this.route.fragment.subscribe();
    this.server = this.serversService.getServer(
      +this.route.snapshot.params['id']
    );

    //Adicionar o subscribe route paramss para atualizar o ID se os parametros mudarem
    this.route.params.subscribe(
      (params: Params) => this.server = this.serversService.getServer(+params['id'])
    );
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    console.log('Srv Status: ' + this.serverStatus);
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.allowEdit) {
      return true;
    }
    //console.log('nome: ' + (this.serverName !== this.server.name));
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) &&
      !this.changesSaved) {
      return confirm('Doy you want to discard the changes?');
    } else {
      return true;
    }
  };
}