import React from 'react';

const Overlay = ({ children }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      color: '#ff8800',
      zIndex: 998,
    }}>
      {children}
    </div>
  );
};

export default Overlay;
