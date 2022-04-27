import logo from './logo.svg';
import './App.css';
import { Button } from 'semantic-ui-react';
import { ReactDOM } from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MenuBar from './components/MenuBar';
import { Builder } from './routes/routes';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <div className="App">
      <MenuBar />
      <Router>
        <Routes>
          <Route 
            path="/builder"
            element={
              <DndProvider backend={HTML5Backend}>
                <Builder/>
              </DndProvider>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
