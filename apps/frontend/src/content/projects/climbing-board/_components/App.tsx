import { StrictMode } from "react";

import ContextProvider from "./ContextProvider";
import Interface from "./Interface";
import World from "./World";

export default function App() {
  return (
    <main>
      <StrictMode>
        <ContextProvider>
          <World />
          <Interface />
        </ContextProvider>
      </StrictMode>
    </main>
  );
}
