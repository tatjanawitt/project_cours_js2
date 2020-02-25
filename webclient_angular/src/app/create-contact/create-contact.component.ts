import { Component } from '@angular/core';
import { ContactStoreService } from '../shared/contact-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../shared/contact';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent {

  constructor(
    private contactService: ContactStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  createContact(contact: Contact) {
    this.contactService.create(contact
    ).subscribe(() => {
      this.router.navigate(
        ['../..', 'contacts'],
        { relativeTo: this.route })
    });
  }
}
