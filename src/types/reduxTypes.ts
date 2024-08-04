import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export type AppDispatch = ThunkDispatch<RootState, unknown, any>;

export interface AuthState {
  loading: boolean;
  token: string | null;
  message: string | null;
  error: any | null;
}

export interface AppState {
  auth: AuthState;
}
