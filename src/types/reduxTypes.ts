import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { LeadType } from "./lead";

export type AppDispatch = ThunkDispatch<RootState, unknown, any>;

export interface AuthState {
  loading: boolean;
  token: string | null;
  message: string | null;
  profile: {
    _id: string;
    email: string;
    name: string;
  } | null;
  error: {
    message: string;
  } | null;
}

export interface UserState {
  loading: boolean;
  users: any[];
  message: string | null;
  error: {
    message: string;
  } | null;
}

export interface LeadState {
  loading: boolean;
  message: string | null;
  success: boolean | null;
  leads: LeadType[];
  lead: LeadType | null;
  error: {
    message: string;
  } | null;
}
export interface AppState {
  auth: AuthState;
  user: UserState;
  lead: LeadState;
}
