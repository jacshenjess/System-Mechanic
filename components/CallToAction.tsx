import React from 'react';
import { SUPPORT_PHONE_LINK } from '../constants';

interface CallToActionProps {
  phoneNumber: string;
  className?: string;
  text?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({ phoneNumber, className = '', text = 'Call Now for Support' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <a
        href={SUPPORT_PHONE_LINK}
        className="flex items-center bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-red-700 transition duration-300 ease-in-out text-lg md:text-xl"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        {text}: {phoneNumber}
      </a>
    </div>
  );
};

export default CallToAction;