import React, { useEffect, useState, Suspense } from 'react';
import './App.css';
import ClashRoyalCards from './components/ClashRoyalCards/ClashRoyalCards'

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ClashRoyalCards><div>hello</div></ClashRoyalCards>
      </header>
    </div>
  )
}
