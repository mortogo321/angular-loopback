import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import alertify from 'alertifyjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public subscribeForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.subscribeForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  hasError(item) {
    const input = this.subscribeForm.get(item);

    return (input.invalid && (input.dirty || input.touched)) || false;
  }

  onSubscribe() {
    alertify.alert(';) Subscription', 'Thank you for your subscriptions!.<br />Email: ' + this.subscribeForm.value['email'], () => {
      this.subscribeForm.reset();
    });
  }
}
