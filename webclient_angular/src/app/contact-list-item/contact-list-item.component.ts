import { Component, Input } from '@angular/core';
import { Contact } from '../shared/contact';

@Component({
  selector: 'app-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.css']
})
export class ContactListItemComponent {
  @Input() contact: Contact;
}
