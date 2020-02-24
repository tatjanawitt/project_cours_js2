import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../shared/contact';
import { ContactStoreService } from '../shared/contact-store.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  public contacts: Contact[];

  constructor(private contactService: ContactStoreService) { }

  ngOnInit(): void {
    this.contactService.getAll()
    .subscribe(res => this.contacts = res);
  }
}
