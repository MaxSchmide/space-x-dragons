import { Navigate, Route, Routes } from "react-router-dom";
import Authpage from "./pages/Authpage";
import Homepage from "./pages/Homepage";
import Personalpage from "./pages/Personalpage";
import Signpage from "./pages/Signpage";
import PrivateRoute from "./routes/PrivateRoute";
import "./_global.scss";

function App() {
  return (
    <>
      <div className='container'>
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route path='/auth' element={<Authpage />} />
          <Route path='/signup' element={<Signpage />} />
          <Route
            path='personal'
            element={
              <PrivateRoute>
                <Personalpage />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
