import { Injectable } from '@angular/core';
import { Activity } from '../models/activity.model';
import { CalorieCalculationRequest } from '../models/calorie-calculation-request.model';
import { CalorieCalculationResult } from '../models/calorie-calculation-result.model';

@Injectable({
  providedIn: 'root'
})
export class CalorieCalculationService {
  private activities: Activity[] = [
    { name: 'Correr', met: 9.8 },
    { name: 'Caminar', met: 3.8 },
    { name: 'Nadar', met: 8.0 }
  ];

  calculateCalories(request: CalorieCalculationRequest): CalorieCalculationResult {
    const activity = this.activities.find(act => act.name === request.activity);

    const caloriesBurned = Math.round((activity!.met * request.weight * request.duration) / 60);

    return {
      weight: request.weight,
      duration: request.duration,
      activity: activity!.name,
      activityMet: activity!.met,
      caloriesBurned: caloriesBurned
    };
  }

  getActivities(): Activity[] {
    return this.activities;
  }
}
