import PersonalInformation from './PersonalInfo';
import ProfileImage from './ProfileImage';
import React from 'react';

function Profile({ type }: { type?: string }) {
  return (
    <div className="grid grid-cols-1 gap-6 py-6 sm:px-6">
      <ProfileImage />
      <PersonalInformation type={type} />
    </div>
  );
}

export { Profile };
