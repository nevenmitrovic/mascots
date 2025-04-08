import { Context, useContext } from "react";

export function useContextHook<T>(context: Context<T>) {
  const ctx = useContext(context);

  if (ctx === null) {
    throw new Error("Error occured, context is null");
  }

  return ctx;
}
