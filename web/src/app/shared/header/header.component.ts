import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openModal(modal) {
    let el = $('#' + modal);

    $('.modal').modal('hide');

    if (el.length) {
      setTimeout(() => {
        el.modal({
          keyboard: false,
          backdrop: 'static'
        });
      }, 400);
    }
  }
}
