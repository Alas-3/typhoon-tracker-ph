import React from 'react';

const TyphoonBanner = ({ typhoons }) => {
  return (
    <div className="typhoon-banner bg-red-500 text-white p-4 rounded-lg mb-4 shadow-lg">
      <h2 className="text-lg font-bold">Typhoon Alerts</h2>
      <ul className="list-disc pl-5 mt-2">
        {typhoons.map((typhoon, index) => (
          <li key={index} className="mb-2">
            <strong>{typhoon.title}:</strong> {typhoon.description.replace('See More', '').trim()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TyphoonBanner;
