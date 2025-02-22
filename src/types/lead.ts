/* eslint-disable no-unused-vars */
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

export interface Airline {
  _id: string;
  id: string;
  name: string;
  alias: string;
  iata: string;
  icao: string;
  callsign: string;
  country: string;
  active: string;
}

export interface LeadType {
  _id?: string;
  booking_id: string;
  converted?: boolean;
  cancelled?: boolean;
  payment: {
    date: string;
    method: string;
    amount: number;
    status: string;
  };
  status:
    | "In Progress"
    | "PNR Sent"
    | "Payment Link Sent"
    | "Payment Complete"
    | "Itenary Email Sent"
    | "Cancelled"
    | "Ticket Sent"
    | "Sale Lost";
  departure?: Airport;
  arrival?: Airport;
  passengerType: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  postCode: string;
  dateTime?: string;
  callFor?: string;
  mobileNumber?: string;
  airline?: Airline;
  pnr?: string;
  travelDate?: string;
  returnDate?: string;
  adult?: number;
  child?: number;
  infant?: number;
  caseDate?: string;
  quotedAmount?: string;
  leadType?: LeadTypeEnum;
  follow_up_date?: string;
  comments?: string;
  leadOrigin?: string;
  claimed_by: User | null;
  selectedPaymentMethod?: string;
  stripe_payment_link?: string;
  createdAt: string;
  updatedAt?: string;
  // email
  itenary_email_sent: boolean;
  ticket_sent: boolean;
  saleLostReason?: string;
  // call logs
  call_logs?: {
    added_by: User;
    dateTime: string | Date;
    notes?: string;
  }[];

  // quoted amount splitted
  quoted_amount: {
    [key: string]: number;
  };

  __v: number;
}

// Please make a form like this in react component. You can you scss for the styling. please make it like this or if you can do better you can do it better. Do it like a professional designer
