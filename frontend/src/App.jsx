import { Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import "./App.css";
import { LandingPage } from "./pages/LandingPage";
import { Signup } from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { PrivateRoute } from "./components/PrivateRoute";


const Home = lazy(()=> import("./pages/Home"))
const Folders = lazy(() => import("./pages/Folders"));
const FolderView = lazy(() => import("./pages/FolderView"));
const AllBookmarks = lazy(() => import("./pages/Allbookmark"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="bookmarks" element={<AllBookmarks />} />
          <Route
            path="folders"
            element={
                  <Folders />
            }
          />
          <Route path="folder/:folderId" element={<FolderView/>}/>
        </Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
