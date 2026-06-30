'use client';
import { useState, useRef, useCallback } from 'react';
import { UploadCloud, X, Link2, Loader2, AlertCircle } from 'lucide-react';

type Props = {
  value: string;
  onChange: (url: string) => void;
};

const MAX_MB = 5;
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

export function ImageUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const [imgError, setImgError] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const [urlDraft, setUrlDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(
    async (file: File) => {
      setError('');
      if (!ALLOWED.includes(file.type)) {
        setError('Formato no permitido. Usá JPG, PNG, WEBP o AVIF.');
        return;
      }
      if (file.size > MAX_MB * 1024 * 1024) {
        setError(`La imagen supera el límite de ${MAX_MB} MB.`);
        return;
      }

      setUploading(true);
      const fd = new FormData();
      fd.append('file', file);
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (res.ok) {
          setImgError(false);
          onChange(data.url);
        } else {
          setError(data.error || 'Error al subir imagen');
        }
      } catch {
        setError('Error de conexión');
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) upload(file);
    },
    [upload]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
    e.target.value = '';
  };

  function clear() {
    onChange('');
    setImgError(false);
    setError('');
  }

  function applyUrl() {
    const u = urlDraft.trim();
    if (!u) return;
    setImgError(false);
    onChange(u);
    setUrlDraft('');
    setShowUrl(false);
  }

  /* ---------- Preview state ---------- */
  if (value && !showUrl) {
    return (
      <div className="space-y-2">
        <div className="relative rounded-xl border border-white/10 bg-[#0a0d14] overflow-hidden group">
          {uploading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70">
              <span className="flex items-center gap-2 font-body text-sm text-white/80">
                <Loader2 size={16} className="animate-spin" /> Subiendo...
              </span>
            </div>
          )}

          <div className="flex items-center justify-center p-6 min-h-[180px]">
            {imgError ? (
              <div className="flex flex-col items-center gap-2 text-white/40">
                <AlertCircle size={28} />
                <p className="font-body text-xs">No se pudo cargar la imagen</p>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={value}
                alt="Vista previa del producto"
                onError={() => setImgError(true)}
                className="max-h-48 w-auto object-contain drop-shadow-lg"
              />
            )}
          </div>

          {/* Action bar */}
          <div className="flex items-center justify-between gap-2 border-t border-white/5 bg-[#0d1117] px-3 py-2">
            <p className="font-body text-[11px] text-white/30 truncate flex-1" title={value}>
              {value}
            </p>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="px-2.5 py-1.5 rounded-lg text-xs font-body text-white/60 hover:text-white hover:bg-white/5 transition-all"
              >
                Reemplazar
              </button>
              <button
                type="button"
                onClick={clear}
                className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all"
                title="Quitar imagen"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        </div>
        {error && <p className="font-body text-xs text-red-400 flex items-center gap-1.5"><AlertCircle size={13} /> {error}</p>}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
      </div>
    );
  }

  /* ---------- Empty / dropzone state ---------- */
  return (
    <div className="space-y-2">
      {showUrl ? (
        <div className="flex gap-2">
          <input
            autoFocus
            value={urlDraft}
            onChange={(e) => setUrlDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { e.preventDefault(); applyUrl(); }
              if (e.key === 'Escape') setShowUrl(false);
            }}
            placeholder="https://..."
            className="flex-1 px-4 py-2.5 bg-[#0a0d14] border border-white/10 rounded-xl text-white font-body text-sm placeholder:text-white/20 focus:outline-none focus:border-[#1E40AF]/60 focus:ring-1 focus:ring-[#1E40AF]/30 transition-all"
          />
          <button
            type="button"
            onClick={applyUrl}
            className="px-4 py-2.5 rounded-xl bg-[#1E40AF] hover:bg-[#1d3a9e] text-white font-label tracking-wider text-xs transition-colors"
          >
            USAR
          </button>
          <button
            type="button"
            onClick={() => setShowUrl(false)}
            className="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 transition-colors"
          >
            <X size={15} />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative cursor-pointer rounded-xl border-2 border-dashed p-8 transition-all ${
            dragOver ? 'border-[#1E40AF] bg-[#1E40AF]/10' : 'border-white/10 bg-[#0a0d14] hover:border-white/20'
          }`}
        >
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl z-10">
              <span className="flex items-center gap-2 font-body text-sm text-white/70">
                <Loader2 size={16} className="animate-spin" /> Subiendo...
              </span>
            </div>
          )}
          <div className="flex flex-col items-center text-center pointer-events-none">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-3">
              <UploadCloud size={22} className="text-white/40" />
            </div>
            <p className="font-body text-sm text-white/60">
              Arrastrá una imagen o <span className="text-[#60A5FA]">hacé click</span> para seleccionar
            </p>
            <p className="font-body text-xs text-white/25 mt-1">JPG, PNG, WEBP o AVIF · máx. {MAX_MB} MB</p>
          </div>
        </div>
      )}

      {!showUrl && (
        <button
          type="button"
          onClick={() => setShowUrl(true)}
          className="flex items-center gap-1.5 font-body text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          <Link2 size={13} /> o pegar una URL
        </button>
      )}

      {error && <p className="font-body text-xs text-red-400 flex items-center gap-1.5"><AlertCircle size={13} /> {error}</p>}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </div>
  );
}
