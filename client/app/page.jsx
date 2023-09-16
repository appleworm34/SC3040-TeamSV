"use client";
import Image from 'next/image'
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Landing from "@/pages/landing/Landing";
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
              <Route path="/" element={<Landing />}></Route>
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
