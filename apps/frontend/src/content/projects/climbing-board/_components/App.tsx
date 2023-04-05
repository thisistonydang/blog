import { StrictMode } from "react";

import ContextProvider from "./ContextProvider";
import Experience from "./Experience";
import Interface from "./Interface";

export default function App() {
  return (
    <main>
      <StrictMode>
        <ContextProvider>
          <Experience />
          <Interface />
        </ContextProvider>
      </StrictMode>
    </main>
  );
}
