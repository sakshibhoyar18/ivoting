import { Navbar, Sidebar } from './components';
import { useStateContext } from './context/'
import { Route, Routes } from 'react-router-dom';
import {Home, Profile} from './pages';

export default function App() {
  const { address, connect, getVoters } = useStateContext()

  return (
    <div className="w-full">
      <div className="relative sm:p-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>

        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
