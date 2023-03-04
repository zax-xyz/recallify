import React, { useState } from 'react';
import 'twin.macro';

import Button from 'components/Button';
import Input from 'components/Input';
import ProfilePic from '../assets/generic_pfp.jpg';

const Profile = () => {
  const [preferredName, setPreferredName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@email.com');
  const [location, setLocation] = useState('Cabaramatta');

  const updateProfileDetails = () => {
    // Do something with the data on the backend.
  };

  return (
    <>
      <header>
        <h1 tw="text-3xl font-bold my-2">Your Profile</h1>
      </header>
      <section>
        <div tw="flex flex-col justify-center items-center gap-5">
          <img
            src={ProfilePic}
            alt="profile pic"
            tw="w-[100px] h-[100px] rounded-[50%] object-cover"
          />
          <div tw="flex flex-col justify-center items-center">
            <p tw="text-[20px] font-bold">John Doe</p>
            <p>Joined on 15th February 2022</p>
          </div>
        </div>
      </section>
      <section>
        <form tw="flex flex-col gap-5">
          <div tw="flex flex-col gap-2">
            <label htmlFor="preferred-name">Preferred Name</label>
            <Input
              id="preferred-name"
              type="text"
              value={preferredName}
              placeholder="Please enter your preferred name..."
              onChange={e => setPreferredName(e.target.value)}
            />
          </div>
          <div tw="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="text"
              value={email}
              placeholder="Please enter your email..."
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div tw="flex flex-col gap-2">
            <label htmlFor="location">Location</label>
            <Input
              id="location"
              type="text"
              value={location}
              placeholder="Please enter your location..."
              onChange={e => setLocation(e.target.value)}
            />
          </div>
          <div tw="flex justify-between">
            <Button
              text="Logout"
              isWarning
              onClick={e => {
                e.preventDefault();
                // Logout
              }}
            />
            <Button
              text="Save"
              filled
              onClick={e => {
                e.preventDefault();
                updateProfileDetails();
              }}
            />
          </div>
        </form>
      </section>
    </>
  );
};

export default Profile;
