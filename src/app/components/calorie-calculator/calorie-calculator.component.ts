import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CalorieCalculationResult } from '../../models/calorie-calculation-result.model';
import { CalorieCalculationService } from '../../services/calorie-calculation.service';
import { CalorieCalculationRequest } from '../../models/calorie-calculation-request.model';
import { Activity } from '../../models/activity.model';

@Component({
  selector: 'app-calorie-calculator',
  templateUrl: './calorie-calculator.component.html',
  styleUrls: ['./calorie-calculator.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class CalorieCalculatorComponent {
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
