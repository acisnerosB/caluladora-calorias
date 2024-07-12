import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {CalorieCalculatorComponent} from "./components/calorie-calculator/calorie-calculator.component";

export const routes: Routes = [
  { path: 'component', component: AppComponent },
  { path: '', component: CalorieCalculatorComponent },
];
