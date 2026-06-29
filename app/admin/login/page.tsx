'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BatteryCharging } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        const data = await res.json();
        setError(data.error || 'Error al iniciar sesión');
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0d14] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-[#1E40AF] rounded-2xl flex items-center justify-center mb-4">
            <BatteryCharging size={28} className="text-white" />
          </div>
          <h1 className="font-display text-3xl text-white tracking-wide">ADMIN</h1>
          <p className="font-body text-sm text-white/40 mt-1">Baterías Santa Fe</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#111827] border border-white/5 rounded-2xl p-8 space-y-5">
          <div className="space-y-2">
            <label className="font-body text-xs text-white/50 uppercase tracking-wider">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-[#0a0d14] border border-white/10 rounded-xl text-white font-body text-sm placeholder:text-white/20 focus:outline-none focus:border-[#1E40AF]/60 focus:ring-1 focus:ring-[#1E40AF]/30 transition-all"
              placeholder="admin"
              required
              autoComplete="username"
            />
          </div>

          <div className="space-y-2">
            <label className="font-body text-xs text-white/50 uppercase tracking-wider">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#0a0d14] border border-white/10 rounded-xl text-white font-body text-sm placeholder:text-white/20 focus:outline-none focus:border-[#1E40AF]/60 focus:ring-1 focus:ring-[#1E40AF]/30 transition-all"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="font-body text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1E40AF] hover:bg-[#1d3a9e] text-white py-3.5 rounded-xl font-label tracking-widest text-sm transition-colors disabled:opacity-50"
          >
            {loading ? 'INGRESANDO...' : 'INGRESAR'}
          </button>
        </form>
      </div>
    </div>
  );
}
