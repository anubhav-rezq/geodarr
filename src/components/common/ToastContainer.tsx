import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const getIcon = () => {
          switch (toast.type) {
            case 'success':
              return <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />;
            case 'warning':
              return <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />;
            case 'error':
              return <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />;
            case 'info':
            default:
              return <Info className="w-5 h-5 text-[#27187E] shrink-0 mt-0.5" />;
          }
        };

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-white border border-[#E5E4F0] rounded-sm shadow-md p-3.5 flex items-start gap-3 transition-all transform animate-in fade-in slide-in-from-bottom-3"
          >
            {getIcon()}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#17172A] leading-tight">{toast.title}</h4>
              <p className="text-xs font-medium text-[#64647A] mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#64647A] hover:text-[#17172A] p-1 rounded-sm transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
