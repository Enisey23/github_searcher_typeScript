import { Routes, Route } from "react-router-dom";
import SearchUser from "./pages/SearchUser";
import UserCommits from "./pages/UserCommits";
import UserProjects from './pages/UserProjects'

import './scss/app.scss'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchUser />} />
      <Route path="/user" element={<UserProjects />} />
      <Route path="/user/commit" element={<UserCommits />} />
    </Routes>
  );
}

export default App;