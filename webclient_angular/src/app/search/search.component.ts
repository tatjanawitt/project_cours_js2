import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from '../shared/contact';
import { ContactStoreService } from '../shared/contact-store.service';
import { filter, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  keyUp$ = new Subject<string>();
  isLoading = false;
  foundContacts: Contact[] = [];

  constructor(private contactService: ContactStoreService) { }

  ngOnInit(): void {
    this.keyUp$.pipe(
      filter(term => term.length >= 3),
      debounceTime(500),
      tap(() => this.isLoading = true),
      distinctUntilChanged(),
      switchMap(searchTerm => this.contactService.getAllSearch(searchTerm)),
      tap(() => this.isLoading = false)
    )
      .subscribe(contacts => this.foundContacts = contacts);
  }
}
