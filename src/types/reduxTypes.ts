import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { Lead } from "@/pages";

export type AppDispatch = ThunkDispatch<RootState, unknown, any>;

export interface AuthState {
  loading: boolean;
  token: string | null;
  message: string | null;
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
  leads: Lead[];
  error: {
    message: string;
  } | null;
}
export interface AppState {
  auth: AuthState;
  user: UserState;
  lead: LeadState;
}
