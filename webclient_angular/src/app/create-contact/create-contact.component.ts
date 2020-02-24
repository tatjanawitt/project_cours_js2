import { Component, OnInit } from '@angular/core';
import { ContactStoreService } from '../shared/contact-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../shared/contact';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {

  constructor(
    private contactService: ContactStoreService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  createContact(contact: Contact) {
    this.contactService.create(contact)
    .subscribe(() => {
      this.router.navigate(['../..', 'contacts'],
      { relativeTo: this.route})
    });
  }

}
