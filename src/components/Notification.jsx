import React from 'react';

const Notification = ({ message }) => {
  return (
    <div className="bg-green-600 text-white p-3 rounded">
      {message}
    </div>
  );
};

export default Notification;
