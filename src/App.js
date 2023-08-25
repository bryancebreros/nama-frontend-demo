import { useState, useRef, useEffect } from 'react';
import './App.css';
import Chat from './components/Chat';
import FilesManager from './components/FilesManager';

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef(null);

  const handleCloseModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
    
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleCloseModal);
    return () => {
      document.removeEventListener('mousedown', handleCloseModal);
    };
  }, []);
  return (
    <div className="mx-auto h-screen">
      <div className="h-full p-6">
        <h2 className="xl:fixed text-3xl text-slate-50 font-bold mb-4">NAMA</h2>
        <h3 className="xl:fixed text-xl text-slate-50 font-bold mb-4 right-6 hover:cursor-pointer" onClick={() => {setIsOpen(true)}}>Files</h3>
        <div ref={modalRef}>
          {isOpen && <FilesManager handleCloseModal={handleCloseModal}/>}
        </div>
        <Chat  />

      </div>
  </div>
  )
}

export default App;
