import { Component } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  ngAfterViewInit() {
    this.init();
  }

  init() {
    let c, currentScrollTop = 0;

    $(window).on('scroll load', () => {

      if ($(window).scrollTop() >= 100) {
        $('.navbar').addClass('active');
      } else {
        $('.navbar').removeClass('active');
      }

      let a = $(window).scrollTop(), b = $('.navbar').height();

      currentScrollTop = a;

      if (c < currentScrollTop && a > b + b) {
        $('.navbar').addClass("scrollUp");
      } else if (c > currentScrollTop && !(a <= b)) {
        $('.navbar').removeClass("scrollUp");
      }

      c = currentScrollTop;
    });

    $('.link-scroll').on('click', function (e) {
      let anchor = $(this);

      $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top - 100
      }, 1000);

      e.preventDefault();
    });

    $('body').scrollspy({
      target: '#navbarSupportedContent',
      offset: 80
    });
  }
}
