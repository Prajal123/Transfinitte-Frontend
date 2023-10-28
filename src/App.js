import { Route, Routes } from 'react-router-dom';
import SignupComponent from './Components /SignupComponent';
import HomePage from './Components /HomePage';
import LoginComponent from './Components /LoginComponent';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<LoginComponent />} />
          <Route path="signup" element={<SignupComponent />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
