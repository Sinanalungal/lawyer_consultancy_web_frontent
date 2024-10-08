import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import Toast from './Toast';

interface ToastProviderProps {
  children: ReactNode;
}

interface ToastContextType {
  addToast: (type: 'success' | 'danger' | 'info', message: string) => void;
}

interface ToastType {
  id: number;
  type: 'success' | 'danger' | 'info';
  message: string;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = useCallback((type: ToastType['type'], message: string) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, type, message }]);
    setTimeout(() => removeToast(id), 3000); 
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }} >
      {children}
      <div className="fixed bottom-0 right-0 p-4" style={{zIndex:9999}}>
        {toasts.map((toast) => (
          <Toast key={toast.id} type={toast.type} message={toast.message} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
