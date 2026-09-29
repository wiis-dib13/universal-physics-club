"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import ClubIntro from "@/components/sections/ClubIntro";
import PhysicsInteractive from "@/components/sections/PhysicsInteractive";
import WhyJoin from "@/components/sections/WhyJoin";
import Community from "@/components/sections/Community";
import JoinCTA from "@/components/sections/JoinCTA";
import RegisterForm from "@/components/RegisterForm";

const SESSION_KEY = "up-loaded";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        setLoading(false);
      }
    } catch {
      /* sessionStorage unavailable */
    }
  }, []);

  const finishLoading = () => {
    setLoading(false);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      {loading && <LoadingScreen onFinish={finishLoading} />}
      <Navbar />
      <main>
        <Hero />
        <ClubIntro />
        <PhysicsInteractive />
        <WhyJoin />
        <Community />
        <JoinCTA />
        <RegisterForm />
      </main>
      <Footer />
    </>
  );
}
