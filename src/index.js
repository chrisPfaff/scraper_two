import { createRoot } from "react-dom/client";
import App from "./App";
import { inspect } from "@xstate/inspect";

const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
