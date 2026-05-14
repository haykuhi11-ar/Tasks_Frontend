import React from "react";
import type { TypeContext } from "./types";

export const UserContext = React.createContext<TypeContext | null>(null);