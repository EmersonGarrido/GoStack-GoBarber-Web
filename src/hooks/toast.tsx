import React,{ createContext, useCallback , useContext, useState } from 'react';
import { uuid } from 'uuidv4'
import ToastContainer from '../components/ToastContainer';

export interface ToastMessage{
  id: string;
  type?: "success" | "error" | "info",
  title: string;
  description?: string;
}

interface ToastContextData{
  addToast(messege: Omit<ToastMessage, 'id'> ): void;
  removeToast(id : string) : void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messeges, setMesseges] = useState<ToastMessage[]>([]);

  const addToast = useCallback(({type, title, description}: Omit<ToastMessage, 'id'>) => {
    const id = uuid();

    const toast = {
      id,
      type,
      title,
      description
    }

    setMesseges(state => [...state, toast])

  },[])
  const removeToast = useCallback((id: string) => {
    setMesseges(state => state.filter(messege => messege.id !== id))
  },[])

  return(
    <ToastContext.Provider value={{ addToast , removeToast}} >
        {children}
      <ToastContainer  messeges={messeges}/>
    </ToastContext.Provider>
  )
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export { ToastProvider, useToast };