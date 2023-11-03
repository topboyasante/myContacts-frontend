import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <section>
      <div><Toaster/></div>
      <AppRoutes />
    </section>
  );
}

export default App;
