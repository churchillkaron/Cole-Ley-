"use client";
export const dynamic = "force-dynamic";



import { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("LOGIN DATA:", data);
      console.log("LOGIN ERROR:", error);

      if (error) {
        alert(error.message);
        return;
      }

      if (!data?.user) {
        alert("No user returned");
        return;
      }

      // 🔥 GET ROLE FROM PROFILES
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      console.log("PROFILE:", profile);
      console.log("PROFILE ERROR:", profileError);

      if (profileError || !profile) {
        alert("No profile found for this user");
        return;
      }

      // 🔥 ROLE ROUTING
      if (profile.role === "owner") {
        router.push("/dashboard");
      } else if (profile.role === "client") {
        router.push("/media");
      } else {
        alert("Invalid role");
      }

    } catch (err) {
      console.error(err);
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-xl">

        <h1 className="text-2xl mb-6 font-light">
          Client Access
        </h1>

        <div className="space-y-4">

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border border-white/20 p-3 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border border-white/20 p-3 rounded"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full border border-white py-3 mt-4 hover:bg-white hover:text-black transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

      </div>

    </div>
  );
}