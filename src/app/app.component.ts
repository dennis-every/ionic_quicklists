import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Splashscreen, Statusbar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor() {

    Splashscreen.hide().catch(err => {
      console.warn(err);
    });

    Statusbar.hide().catch(err => {
      console.warn(err);
    });

  }
}
