import { Component } from '@angular/core';
import { pagesettings } from './constants/page.constants';
import { PageRoutes } from './models/pageModels.interface';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  pageSettings: PageRoutes[] = pagesettings.pageRoute;
  constructor() { }
}
