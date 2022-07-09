import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  errorMessage: string;
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    //se souber que não vai mudar, o uso do snapshot é suficiente.
    this.errorMessage = this.route.snapshot.data['message'];

    //se acreditar que possa mudar a mensagem, melhor usar o Subscribe.
    this.route.data.subscribe(
      (data: Data) => { this.errorMessage = data['message'] });
  }

}
