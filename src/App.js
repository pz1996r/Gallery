import React, { useEffect, useState, Suspense } from 'react';
import './App.css';
import ClashRoyalCards from './components/ClashRoyalCards/ClashRoyalCards'

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ClashRoyalCards>
          <ClashRoyalCards.Label />
          <ClashRoyalCards.LoadingImg />
          <ClashRoyalCards.Stepper />
        </ClashRoyalCards>
      </header>
    </div>
  )
}
