"use client";
import Image from 'next/image'
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from '@/pages/login/Login';
import Landing from "@/pages/landing/Landing";
import Forum from "@/pages/forum/Forum"
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Router>
        <div>
          <header>
            <Navbar />
          </header>

          <section>
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/" element={<Landing />}></Route>
              <Route path="/forum" element={<Forum />}></Route>
            </Routes>
          </section>

          <footer>
            <Footer />
          </footer>
        </div>
      </Router>
    </>
  )
}
