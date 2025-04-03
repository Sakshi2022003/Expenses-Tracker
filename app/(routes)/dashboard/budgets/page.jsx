"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import BudgetList from './_components/BudgetList';

function Budget() {
  const router = useRouter();

  return (
    <div className='p-10 '>
      <button 
        className='text-xl font-bold mb-4 flex items-center' 
        onClick={() => router.back()}
      >
        <h2 className='font-bold text-3xl'>← My Budgets </h2>
        
      </button>
      
      <BudgetList />
    </div>
  );
}

export default Budget;
