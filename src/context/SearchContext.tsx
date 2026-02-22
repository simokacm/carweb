import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  location: string;
  pickupDate: string;
  returnDate: string;
  setLocation: (val: string) => void;
  setPickupDate: (val: string) => void;
  setReturnDate: (val: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  return (
    <SearchContext.Provider value={{
      location,
      pickupDate,
      returnDate,
      setLocation,
      setPickupDate,
      setReturnDate
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
