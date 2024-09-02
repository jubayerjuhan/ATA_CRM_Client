export enum LeadTypeEnum {
  Cold = "Cold",
  Warm = "Warm",
  Hot = "Hot",
}

export interface LeadType {
  _id: string;
  passengerName: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  postCode: string;
  callType?: string;
  dateTime?: string;
  callFor?: string;
  mobileNumber?: string;
  departure?: string;
  arrival?: string;
  airlinesCode?: string;
  pnr?: string;
  travelDate?: string;
  returnDate?: string;
  adult?: number;
  child?: number;
  infant?: number;
  caseDate?: string;
  quoted?: string;
  leadType?: LeadTypeEnum;
  followUpDate?: string;
  comments?: string;
  leadOrigin?: string;
  claimed_by?: string;
}
