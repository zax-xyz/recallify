import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "twin.macro";

import ProfilePic from "assets/generic_pfp.jpg";
import Button from "components/Button";
import Input from "components/Input";
import UserContext, { defaultUserState } from "contexts/UserContext";
import Transition from "components/Transition";
import tw from "twin.macro";

const Profile = () => {
  const [preferredName, setPreferredName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@email.com");
  const [location, setLocation] = useState("Cabramatta");

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const updateProfileDetails = () => {
    // Do something with the data on the backend.
  };

  return (
    <>
      <Transition
        appear
        show
        enter={tw`transition duration-[600ms]`}
        enterFrom={tw`-translate-x-6 opacity-0`}
      >
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
              <p tw="text-[20px]">John Doe</p>
              <p tw="text-xs text-light-neutral-700">Joined on 15th February 2022</p>
            </div>
          </div>
        </section>
        <section>
          <form tw="flex flex-col gap-5">
            <div tw="flex flex-col gap-1">
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
                isWarning
                onClick={e => {
                  e.preventDefault();
                  setUser(defaultUserState.user);
                  navigate("/login");
                }}
              >
                Logout
              </Button>
              <Button
                filled
                onClick={e => {
                  e.preventDefault();
                  updateProfileDetails();
                }}
              >
                Save
              </Button>
            </div>
          </form>
        </section>
      </Transition>
    </>
  );
};

export default Profile;
