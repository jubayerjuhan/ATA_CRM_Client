export enum LeadTypeEnum {
  Cold = "Cold",
  Warm = "Warm",
  Hot = "Hot",
}

export interface Airport {
  _id: string;
  code: string;
  lat: string;
  lon: string;
  name: string;
  city: string;
  state: string;
  country: string;
  woeid: string;
  tz: string;
  phone: string;
  type: string;
  email: string;
  url: string;
  runway_length: number;
  elev: number;
  icao: string;
  direct_flights: string;
  carriers: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface LeadType {
  _id?: string;
  status: "In Progress" | "PNR Sent" | "Payment Link Sent" | "Payment Complete";
  departure?: Airport;
  arrival?: Airport;
  passengerType: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  callType?: string;
  dateTime?: string;
  callFor?: string;
  mobileNumber?: string;
  airlinesCode?: string;
  pnr?: string;
  travelDate?: string;
  returnDate?: string;
  adult?: number;
  child?: number;
  infant?: number;
  caseDate?: string;
  quotedAmount?: string;
  leadType?: LeadTypeEnum;
  followUpDate?: string;
  comments?: string;
  leadOrigin?: string;
  claimed_by: User | string | null;
  createdAt: string;
  updatedAt?: string;
  call_logs?: {
    dateTime: string;
    callType: string;
    notes?: string;
  }[];

  __v: number;
}
