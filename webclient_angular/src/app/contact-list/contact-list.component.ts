import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../shared/contact';
import { ContactStoreService } from '../shared/contact-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts$: Observable<Contact[]>;

  constructor(private contactService: ContactStoreService) { }

  ngOnInit(): void {
    this.contacts$ = this.contactService.getAll();
  }
}
