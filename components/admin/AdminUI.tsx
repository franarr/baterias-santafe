'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, AlertTriangle, Info, X, Loader2 } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type ToastKind = 'success' | 'error' | 'info';
type Toast = { id: number; kind: ToastKind; message: string };

type ConfirmOptions = {
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
};

type ConfirmState = ConfirmOptions & {
  resolve: (ok: boolean) => void;
  loading: boolean;
};

type AdminUIContextValue = {
  toast: (message: string, kind?: ToastKind) => void;
  confirm: (opts: ConfirmOptions) => Promise<boolean>;
};

const AdminUIContext = createContext<AdminUIContextValue | null>(null);

export function useAdminUI() {
  const ctx = useContext(AdminUIContext);
  if (!ctx) throw new Error('useAdminUI must be used within <AdminUIProvider>');
  return ctx;
}

/** True only after the first client render, so portals don't break hydration. */
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/* ------------------------------------------------------------------ */
/* Provider                                                            */
/* ------------------------------------------------------------------ */

export function AdminUIProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confirmState, setConfirmState] = useState<ConfirmState | null>(null);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, kind: ToastKind = 'success') => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, kind, message }]);
      setTimeout(() => dismiss(id), 4000);
    },
    [dismiss]
  );

  const confirm = useCallback((opts: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setConfirmState({ ...opts, resolve, loading: false });
    });
  }, []);

  const closeConfirm = (ok: boolean) => {
    setConfirmState((prev) => {
      prev?.resolve(ok);
      return null;
    });
  };

  return (
    <AdminUIContext.Provider value={{ toast, confirm }}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
      {confirmState && (
        <ConfirmDialog
          state={confirmState}
          onCancel={() => closeConfirm(false)}
          onConfirm={() => closeConfirm(true)}
        />
      )}
    </AdminUIContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Toasts                                                              */
/* ------------------------------------------------------------------ */

const TOAST_STYLES: Record<ToastKind, { icon: typeof Info; ring: string; text: string }> = {
  success: { icon: CheckCircle2, ring: 'border-green-500/30 bg-green-500/10', text: 'text-green-300' },
  error: { icon: AlertTriangle, ring: 'border-red-500/30 bg-red-500/10', text: 'text-red-300' },
  info: { icon: Info, ring: 'border-blue-500/30 bg-blue-500/10', text: 'text-blue-300' },
};

function ToastViewport({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: number) => void }) {
  const mounted = useMounted();
  if (!mounted) return null;
  return createPortal(
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2.5 w-[min(360px,calc(100vw-2.5rem))]">
      {toasts.map((t) => {
        const s = TOAST_STYLES[t.kind];
        const Icon = s.icon;
        return (
          <div
            key={t.id}
            role="status"
            className={`flex items-start gap-3 rounded-xl border ${s.ring} backdrop-blur-md px-4 py-3 shadow-lg shadow-black/40 animate-[admin-toast-in_.25s_ease-out]`}
          >
            <Icon size={18} className={`${s.text} shrink-0 mt-0.5`} />
            <p className="flex-1 font-body text-sm text-white/90 leading-snug">{t.message}</p>
            <button
              onClick={() => onDismiss(t.id)}
              className="text-white/30 hover:text-white transition-colors shrink-0"
              aria-label="Cerrar"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>,
    document.body
  );
}

/* ------------------------------------------------------------------ */
/* Confirm dialog                                                      */
/* ------------------------------------------------------------------ */

function ConfirmDialog({
  state,
  onCancel,
  onConfirm,
}: {
  state: ConfirmState;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const mounted = useMounted();
  const { title, message, confirmLabel, cancelLabel, danger } = state;
  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-[admin-fade-in_.15s_ease-out]"
      onClick={onCancel}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-[#111827] border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/60 animate-[admin-pop-in_.18s_ease-out]"
      >
        <div className="flex items-start gap-3.5">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              danger ? 'bg-red-500/15 text-red-400' : 'bg-blue-500/15 text-blue-400'
            }`}
          >
            <AlertTriangle size={20} />
          </div>
          <div className="min-w-0">
            <h3 className="font-headline text-lg text-white tracking-wide">{title}</h3>
            {message && <p className="font-body text-sm text-white/50 mt-1 leading-relaxed">{message}</p>}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2.5 rounded-xl font-label tracking-wider text-sm text-white transition-colors ${
              danger ? 'bg-red-600 hover:bg-red-500' : 'bg-[#1E40AF] hover:bg-[#1d3a9e]'
            }`}
          >
            {confirmLabel || 'CONFIRMAR'}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl font-label tracking-wider text-sm text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            {cancelLabel || 'CANCELAR'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* Tiny inline spinner reused by forms */
export function Spinner({ className = '' }: { className?: string }) {
  return <Loader2 size={16} className={`animate-spin ${className}`} />;
}
