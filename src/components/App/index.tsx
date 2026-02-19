import React from 'react';
import './App.css';
import Main from '../Main';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../../store/usersSlice';
import type { AppDispatch } from '../../store';

function App() {
    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

  return (
    <div className="App main">
      <header className="App-header">
        TODO list with users
      </header>
        <Main />

        <footer className='App-footer'>
              <a
                href="https://example.org"
                target="_blank"
                rel="noopener noreferrer"
                className={"App-footer-link"}
              >
                All right reserved
              </a>
        </footer>
    </div>
  );
}

export default App;
