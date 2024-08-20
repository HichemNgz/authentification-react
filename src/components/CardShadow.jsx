import React from 'react';

export default function CardShadow({ children, customClass, height = '90%' }) {
  return (
    <div className={` ${customClass} border-y-4 rounded-md  `}>
      <>{children}</>
    </div>
  );
}
