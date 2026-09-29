"use client";

import { useState, useSyncExternalStore } from "react";
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

function subscribeAlreadySeen() {
  return () => {};
}
function getAlreadySeenSnapshot() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}
function getAlreadySeenServerSnapshot() {
  return false;
}

export default function Home() {
  const alreadySeen = useSyncExternalStore(
    subscribeAlreadySeen,
    getAlreadySeenSnapshot,
    getAlreadySeenServerSnapshot
  );
  const [dismissed, setDismissed] = useState(false);
  const loading = !alreadySeen && !dismissed;

  const finishLoading = () => {
    setDismissed(true);
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
