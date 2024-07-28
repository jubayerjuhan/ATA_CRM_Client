import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export type AppDispatch = ThunkDispatch<RootState, unknown, any>;
