import { ValidationErrors, FormControl } from '@angular/forms';

export class AddressValidators {

  static zipFormat(control: FormControl): ValidationErrors | null {
    if (!control.value) { return null; }
    const zipPattern = /^[0-9]{5}/g;
    return zipPattern.test(control.value) ? null : {
      zipPattern: { valid: false }
    };
  }

  static emailFormat(control: FormControl): ValidationErrors | null {
    if (!control.value) { return null; }
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    return emailPattern.test(control.value) ? null : {
      emailPattern: { valid: false }
    };
  }
}
