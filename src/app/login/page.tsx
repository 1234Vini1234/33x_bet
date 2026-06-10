"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Falha no login");
      setLoading(false);
      return;
    }
    router.push("/ranking");
    router.refresh();
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-5">
      {/* ---- Painel da imagem (esquerda) ---- */}
      <aside className="relative hidden lg:block lg:col-span-3 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/login-bg.jpg')" }}
        />
        {/* overlay sutil só na base, pra leitura do texto — sem escurecer a foto toda */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="relative h-full flex flex-col justify-between p-10 xl:p-14">
          {/* topo: marca */}
          <div className="flex items-center gap-2 drop-shadow">
            <span className="font-display text-2xl tracking-wider text-white">BOLÃO</span>
            <span className="font-display text-sm tracking-[0.3em] text-[color:var(--c-yellow)]">
              33x
            </span>
          </div>

          {/* meio/baixo: claim */}
          <div className="max-w-lg">
            <div className="hero-stripe w-20 mb-5" />
            <h1 className="font-display text-5xl xl:text-6xl leading-[0.95] tracking-wider text-white drop-shadow-lg">
              O JOGO COMEÇA NO SEU PALPITE
            </h1>
            <p className="mt-4 text-white/90 text-sm leading-relaxed drop-shadow">
              Aposte nos placares da Copa do Mundo 2026, suba no ranking e dispute
              o palpite de ouro. Tudo no clima de USA · Canadá · México.
            </p>

            {/* faixa de patrocínio */}
            <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/80">
              <span>Patrocínio oficial</span>
              <span className="h-px flex-1 bg-white/40" />
              <span className="font-display text-lg tracking-[0.3em] text-white">
                LEVEL<span className="text-[color:var(--c-yellow)]">33</span>
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* ---- Card de login (direita) ---- */}
      <section className="relative flex items-center justify-center px-4 py-10 sm:px-8 lg:col-span-2 bg-[color:var(--c-bg)]">
        <div className="relative w-full max-w-sm">
          {/* marca compacta */}
          <div className="mb-7">
            <div className="flex items-center gap-2">
              <span className="font-display text-3xl tracking-wider">BOLÃO</span>
              <span className="font-display text-base tracking-[0.3em] text-[color:var(--c-green)]">
                33x
              </span>
            </div>
            <p className="text-xs text-[color:var(--c-text-dim)] uppercase tracking-[0.25em] mt-1">
              Copa do Mundo 2026
            </p>
          </div>

          <div className="card p-6">
            <h2 className="font-display text-2xl tracking-wider mb-1">ENTRAR</h2>
            <p className="text-[color:var(--c-text-soft)] text-sm mb-5">
              Faça login pra dar seus palpites
            </p>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
                {error}
              </p>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[color:var(--c-text-soft)] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-input"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[color:var(--c-text-soft)] mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-input"
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? "ENTRANDO..." : "ENTRAR"}
              </button>
            </form>

            <p className="text-sm text-[color:var(--c-text-soft)] mt-5 text-center">
              Ainda sem conta?{" "}
              <Link
                href="/register"
                className="text-[color:var(--c-green)] hover:text-[color:var(--c-green-deep)] font-semibold"
              >
                Cadastre-se
              </Link>
            </p>
          </div>

          {/* selo de patrocínio (aparece no mobile, onde não há painel) */}
          <div className="lg:hidden mt-6 flex items-center justify-center gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-[color:var(--c-text-dim)]">
            <span>Patrocínio oficial</span>
            <span className="font-display text-sm tracking-[0.3em] text-[color:var(--c-text)]">
              LEVEL<span className="text-[color:var(--c-gold)]">33</span>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
