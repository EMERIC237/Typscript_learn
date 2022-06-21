namespace App {
  export enum ProjectStatus {
    Active,
    Finished,
  }
  
  export interface validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }
}
