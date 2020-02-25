import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactStoreService } from '../shared/contact-store.service';
import { Contact } from '../shared/contact';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactStoreService,
    public ts: TranslateService
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap;
    this.contactService.getSingle(params.get('id'))
      .subscribe(res => this.contact = res);
  }

  async removeContact() {
    const text = await this.ts.get('bookDeleteQuestion').toPromise();
    if (confirm(text)) {
      this.contactService.remove(this.contact.id + ''
      ).subscribe(res => this.router.navigate(
          ['../'],
          { relativeTo: this.route }
        )
      );
    }
  }
}
