import React from "react";
import type { ContextType } from "./types";

export const TodoContext = React.createContext<ContextType | undefined>(undefined)