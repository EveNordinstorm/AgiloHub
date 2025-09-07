import React from "react";
import { Provider } from "react-redux";
import { store } from "common/src/redux/store";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}
