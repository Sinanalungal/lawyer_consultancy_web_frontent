import { createContext, ReactNode, useContext, useState } from "react";

interface LoaderContextType {
    loader: boolean;
    setLoader: (state: boolean) => void;
  }
  
  const LoaderContext = createContext<LoaderContextType | undefined>(undefined);
  
  export const LoaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [loader, setLoader] = useState<boolean>(false);
  
    return (
      <LoaderContext.Provider value={{ loader, setLoader }}>
        {children}
      </LoaderContext.Provider>
    );
  };
  
  export const useLoader = (): LoaderContextType => {
    const context = useContext(LoaderContext);
    if (!context) {
      throw new Error('useLoader must be used within a LoaderProvider');
    }
    return context;
  };
  