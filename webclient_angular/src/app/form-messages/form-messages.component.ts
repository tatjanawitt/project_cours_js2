import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form-messages',
  templateUrl: './form-messages.component.html',
  styleUrls: ['./form-messages.component.css']
})
export class FormMessagesComponent implements OnInit {

  @Input() control: AbstractControl;
  @Input() controlName: string;

  private allMessages = {
    firstname: {
      required: this.ts.instant('validMsg.fname')
    },
    lastname: {
      required: this.ts.instant('validMsg.lname')
    },
    email: {
      required: this.ts.instant('validMsg.email'),
      emailPattern: this.ts.instant('validMsg.email')
    },
    postcode: {
      zipPattern: this.ts.instant('validMsg.postcode'),
      maxlength: this.ts.instant('validMsg.postcode'),
    }
  };

  constructor(private ts: TranslateService) { }

  ngOnInit(): void { }

  errorsForControl(): string[] {
    const messages = this.allMessages[this.controlName];
    if (
      !this.control ||
      !this.control.errors ||
      !messages ||
      !this.control.dirty
    ) { return null; }

    return Object.keys(this.control.errors)
      .map(err => messages[err]);
  }
}
