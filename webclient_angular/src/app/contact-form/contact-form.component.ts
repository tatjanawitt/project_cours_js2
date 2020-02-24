import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { Contact } from '../shared/contact';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit, OnChanges {

  contactForm: FormGroup;
  @Input() contact: Contact;
  @Input() editing = false;
  @Output() submitContact = new EventEmitter<Contact>();

  constructor(private fb: FormBuilder) { }

  submitForm() {
    const id = this.editing ? this.contact.id : -1;
    const formValue = this.contactForm.value;
    const newContact: Contact = {
      id,
      ...formValue
    };
    this.submitContact.emit(newContact);
    this.contactForm.reset();
  }

  ngOnChanges() {
    this.initForm();
    this.setFormValues(this.contact);

  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    if (this.contactForm) { return; }

    // id: [{value: '', disabled: this.editing}]
    this.contactForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      street: [''],
      postcode: [''],
      place: [''],
      fon: [''],
      mobil: [''],
      born: [''],
      img: ['']
    });
  }

  private setFormValues(contact: Contact){
    this.contactForm.patchValue(contact);
  }
}
