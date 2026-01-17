
export interface UserData {
  name: string;
  jobTitle: string;
  experience: string;
  skills: string;
  company: string;
}

export interface GenerationResult {
  resumeSummary: string;
  coverLetter: string;
}

export interface AppState {
  loading: boolean;
  error: string | null;
  result: GenerationResult | null;
}
