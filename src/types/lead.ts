export type LeadType = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  from: string;
  to: string;
  passengers: string;
  class: string;
  departure: Date;
  createdAt: Date;
  updatedAt?: Date;
  claimed_by?: object | null;
};
