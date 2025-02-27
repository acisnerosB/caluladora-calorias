import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CalorieCalculationResult} from "./models/calorie-calculation-result.model";
import {Activity} from "./models/activity.model";
import {CalorieCalculationService} from "./services/calorie-calculation.service";
import {CalorieCalculationRequest} from "./models/calorie-calculation-request.model";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButton, MatCard, MatCardContent, MatCardTitle, MatError, MatFormField, MatInput, MatLabel, NgForOf, NgIf, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'calculadora-calorias';
  calorieForm: FormGroup;
  result!: CalorieCalculationResult;
  activities: Activity[] = [];
  selectedActivity: string | null = null;

  constructor(
    private fb: FormBuilder,
    private calculationService: CalorieCalculationService
  ) {
    this.calorieForm = this.fb.group({
      weight: [0, [Validators.required, Validators.min(1)]],
      duration: [0, [Validators.required, Validators.min(1)]],
      activity: ['', [Validators.required]]
    });
  }

  controlHasError(control: string, error: string) {
    return this.calorieForm.controls[control].hasError(error);
  }

  ngOnInit(): void {
    this.activities = this.calculationService.getActivities();
  }

  selectActivity(activity: string): void {
    this.selectedActivity = activity;
    this.calorieForm.patchValue({ activity });
  }

  onSubmit() {
    if (this.calorieForm.valid) {
      const formValues: CalorieCalculationRequest = this.calorieForm.value;
      this.result = this.calculationService.calculateCalories(formValues);

    }
  }
}

