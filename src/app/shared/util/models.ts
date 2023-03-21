import { StudyWithDonors } from "nswag/song";

export interface ConfirmationText {
  message: string;
}

export interface MessageInfo {
  errorMessage: boolean;
  message: string;
}

export interface PassProjectToModal {
  studyId: string;
}


export interface StudyWithDonorsData {
  data: StudyWithDonors;
}
