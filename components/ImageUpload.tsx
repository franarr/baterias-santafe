'use client';
import { useState, useRef, useCallback } from 'react';

type Props = {
  value: string;
  onChange: (url: string) => void;
};

export function ImageUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(
    async (file: File) => {
      setUploading(true);
      setError('');
      const fd = new FormData();
      fd.append('file', file);
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (res.ok) {
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
  };

  return (
    <div className="space-y-2">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all ${
          dragOver
            ? 'border-[#1E40AF] bg-[#1E40AF]/10'
            : 'border-white/10 bg-[#0a0d14] hover:border-white/20'
        } ${value ? 'p-3' : 'p-8'}`}
      >
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl z-10">
            <span className="font-body text-sm text-white/70">Subiendo...</span>
          </div>
        )}
        {value ? (
          <div className="flex items-center gap-4">
            <img
              src={value}
              alt="preview"
              className="h-20 w-20 object-contain rounded-lg bg-white/5 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-body text-xs text-white/40 truncate">{value}</p>
              <p className="font-body text-xs text-white/25 mt-1">
                Click o arrastrá para reemplazar
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center pointer-events-none">
            <p className="font-body text-sm text-white/40">
              Arrastrá una imagen o hacé click para seleccionar
            </p>
            <p className="font-body text-xs text-white/20 mt-1">JPG, PNG, WEBP</p>
          </div>
        )}
      </div>
      {error && <p className="font-body text-xs text-red-400">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
