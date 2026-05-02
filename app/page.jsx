"use client";
export const dynamic = "force-dynamic";

import { getSupabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogin = async () => {
    console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      const supabase = getSupabase();
      if (!supabase) return;

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("LOGGED IN USER:", data?.user?.email);
      console.log("USER ID:", data?.user?.id);
      console.log("LOGIN ERROR:", error);

      if (error) {
        alert(error.message);
        return;
      }

      const user = data.user;

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      console.log("PROFILE:", profile);

      if (!profile) {
        alert("NO PROFILE FOUND");
        return;
      }

      alert("ROLE: " + profile.role);

      const role = profile.role?.trim().toLowerCase();

      console.log("FINAL ROLE CHECK:", role);

      if (role === "owner") {
        console.log("GOING TO DASHBOARD");
        router.push("/dashboard");
        return;
      }

      if (role === "client") {
        console.log("GOING TO MEDIA");
        router.push("/media");
        return;
      }

      console.log("UNKNOWN ROLE:", role);
    } catch (err) {
      console.error(err);
      alert("Error");
    }
  };

  return (
    <main style={main}>
      {/* NAV */}
      <div
        style={{
          ...nav,
          top: isMobile ? 20 : 30,
          left: isMobile ? 0 : 60,
          width: isMobile ? "100%" : "calc(100% - 120px)",
          justifyContent: isMobile ? "center" : "space-between",
        }}
      >
        <div style={brand}></div>

        <div
          style={{
            ...navMenu,
            gap: isMobile ? 14 : 28,
            fontSize: isMobile ? 10 : 12,
          }}
        >
          <span style={{ ...navItem, color: "#caa85a" }}>HOME</span>
          <span style={navItem}>MUSIC</span>
          <span style={navItem}>SHOWS</span>
          <span style={navItem}>ABOUT</span>
          <span style={navItem}>CONTACT</span>
        </div>
      </div>

      {/* LOGO */}
      <img
        src="/logo-cole.png"
        alt="Cole Ley Logo"
        style={{
          ...move,
          top: isMobile ? 55 : -80,
          left: isMobile ? "50%" : 20,
          transform: isMobile ? "translateX(-50%)" : "none",
          width: isMobile ? "78%" : 620,
          maxWidth: 620,
          zIndex: 2,
          pointerEvents: "none",
          filter: "drop-shadow(0 0 40px rgba(202,168,90,0.5))",
        }}
      />

      {/* HERO */}
      <div
        style={{
          ...move,
          top: isMobile ? 240 : 250,
          left: isMobile ? "50%" : 100,
          transform: isMobile ? "translateX(-50%)" : "none",
          width: isMobile ? "90%" : "auto",
          maxWidth: 620,
          textAlign: isMobile ? "center" : "left",
          zIndex: 2,
        }}
      >
        <p
          style={{
            ...tagline,
            letterSpacing: isMobile ? 3 : 6,
            fontSize: isMobile ? 10 : 12,
          }}
        >
          ARTIST · PERFORMER · EXPERIENCE
        </p>

        <h1
          style={{
            ...title,
            fontSize: isMobile ? "clamp(42px, 14vw, 70px)" : 90,
          }}
        >
          COLE LEY
        </h1>

        <div
          style={{
            ...line,
            margin: isMobile ? "20px auto" : "25px 0",
          }}
        />
      </div>

      {/* LOGIN */}
      <div
        style={{
          ...move,
          top: isMobile ? 500 : 480,
          left: isMobile ? "50%" : 100,
          transform: isMobile ? "translateX(-50%)" : "none",
          width: isMobile ? "88%" : 360,
          maxWidth: 360,
          zIndex: 3,
        }}
      >
        <div style={loginBox}>
          <input
            placeholder="Email"
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Password"
            type="password"
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={loginBtn} onClick={handleLogin}>
            LOGIN
          </button>
        </div>
      </div>
    </main>
  );
}

/* ================= BASE ================= */

const main = {
  position: "relative",
  minHeight: "100vh",
  overflowX: "hidden",
  backgroundImage:
    "linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.2) 100%), url('/bg.png')",
  backgroundSize: "cover",
  backgroundPosition: "center right",
  color: "white",
  fontFamily: "Arial, sans-serif",
};

const move = {
  position: "absolute",
};

/* ================= NAV ================= */

const nav = {
  ...move,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 5,
};

const navMenu = {
  display: "flex",
  gap: 28,
  fontSize: 12,
};

const brand = {
  color: "#caa85a",
  letterSpacing: 6,
  fontFamily: "serif",
  fontSize: 14,
};

const navItem = {
  color: "rgba(255,255,255,0.7)",
  cursor: "pointer",
};

/* ================= HERO ================= */

const tagline = {
  color: "#caa85a",
  letterSpacing: 6,
  fontSize: 12,
  marginBottom: 20,
};

const title = {
  fontFamily: "serif",
  fontSize: 90,
  margin: 0,
  lineHeight: 0.95,
};

const line = {
  width: 60,
  height: 2,
  background: "#caa85a",
  margin: "25px 0",
};

/* ================= LOGIN ================= */

const loginBox = {
  background: "rgba(0,0,0,0.35)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(202,168,90,0.3)",
  borderRadius: 14,
  padding: 20,
  boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: 12,
  marginBottom: 10,
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(202,168,90,0.3)",
  borderRadius: 6,
  color: "white",
  outline: "none",
};

const loginBtn = {
  width: "100%",
  padding: 12,
  background: "linear-gradient(135deg, #e5c06b, #a87b2c)",
  color: "#111",
  letterSpacing: 2,
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
};

const miniBtn = {
  flex: 1,
  padding: 8,
  border: "1px solid rgba(202,168,90,0.3)",
  background: "transparent",
  color: "#caa85a",
  cursor: "pointer",
};