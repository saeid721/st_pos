import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SystemSettingsProvider } from "./lib/SystemSettingsProvider";

function App() {
  return (
    <main className="App relative">
      <SystemSettingsProvider>
        <ToastContainer stacked />
        <RouterProvider router={router} />
      </SystemSettingsProvider>
    </main>
  );
}

export default App;
