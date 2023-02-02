import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './componntss/pages/Home';
import Edit from './componntss/pages/students/Edit';
import View from './componntss/pages/students/View';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/view/:id" element={<View/>} />
          <Route path="/edit/:id" element={<Edit/>} />
          <Route path="*" element={<h1>404 error page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
