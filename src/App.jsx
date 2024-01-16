import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ChatPage from './pages/ChatPage/ChatPage';
import HomePage from './pages/HomePage/HomePage';
import SantaPage from './pages/SantaPage/SantaPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/chatgpt' element={<ChatPage/>}/>
          <Route path='/santapage' element={<SantaPage/>}/> 
        </Routes>
      </Router>

    </div>
  );
}

export default App;
