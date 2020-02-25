import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webclient-angular';
  constructor(
    public translate: TranslateService
  ) {
    translate.addLangs(['de', 'en']);
    translate.setDefaultLang('de');
  }
}
