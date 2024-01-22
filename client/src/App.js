import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Navbar, Sidebar, Footer, Loading } from "./components";
import {
  Home,
  Artworks,
  Error,
  SingleArtwork,
  SingleArtistPage,
  Commision,
  Register,
  Login,
  Profile,
  PrivateRoute,
} from "./pages";
import { useUserContext } from "../src/context/user_context";

function App() {
  const { user } = useUserContext();

  // Set up router with HashRouter
  return (
    <>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artworks" element={<Artworks />} />
          <Route path="/artworks/:id" element={<SingleArtwork />} />
          <Route path="/artist/:userId" element={<SingleArtistPage />} />
          <Route path="/commision" element={<Commision />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>{user ? <Profile /> : <Loading />}</PrivateRoute>
            }
          />
          <Route path="/*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
