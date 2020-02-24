import { Contact } from './contact';

export class ContactFactory {
  static empty(): Contact {
    return {
      id: -1,
      firstname: '',
      lastname: '',
      email: '',
      street: '',
      postcode: '',
      place: '',
      fon: '',
      mobil: '',
      born: '',
      img: ''
    };
  }
}
