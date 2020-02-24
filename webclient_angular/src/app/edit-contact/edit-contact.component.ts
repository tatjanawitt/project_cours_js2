import { Component, OnInit } from '@angular/core';
import { Contact } from '../shared/contact';
import { ContactStoreService } from '../shared/contact-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  contact: Contact;

  constructor(
    private contactService: ContactStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap((id: string) => this.contactService.getSingle(id))
    )
    .subscribe(contact => this.contact = contact);
  }

  updeteContact(contact: Contact) {
    this.contactService.update(contact).subscribe(() => {
      this.router.navigate(['../../..', 'contacts', contact.id],
      {relativeTo: this.route }
      );
    });
  }

}
