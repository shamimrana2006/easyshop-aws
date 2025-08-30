import React from "react";
import { useSelector } from "react-redux";
import Loading from "../../../Layout/Loading";

export default function PersionalInfo() {
  const userState = useSelector((state) => state.userStore);
  const user = userState?.user?.payLoad;

  if (userState.loading) {
    return <Loading />;
  }
  return (
    <div className=" overflow-hidden">
      <div className=" p-3">
        <div className="text-center">
          <span className=" ">
            Persional Info <br />
            <span className="text-ptext text-sm">Info about you and your preferences across Easy Shop services</span>
          </span>
        </div>

       <div className="flex justify-center  items-center w-full b">
         <div className="flex lg:min-w-[1000px]  flex-col mt-2">
          <div className="border border-border p-2 rounded">
            {/* //single column */}
            <div className=" p-2 grid grid-cols-12">
              <div className="col-span-4 md:col-span-2 overflow-auto">Profile </div>
              <div className="col-span-8 md:col-span-10 grid grid-cols-12 overflow-auto">
                <div className="col-span-10">A Profile photo add your personalize</div>
                <div className="w-10 h-10 rounded-full bg-primary"></div>
              </div>
            </div>
            <div className=" p-2 border-t border-border grid grid-cols-12">
              <div className="col-span-4 md:col-span-2 overflow-auto">Name </div>
              <div className="col-span-8 md:col-span-10 overflow-auto">{user?.name}</div>
            </div>
            <div className="border-t border-border p-2 grid grid-cols-12">
              <div className="col-span-4 md:col-span-2 overflow-auto">Date of birth </div>
              <div className="col-span-8 md:col-span-10 overflow-auto">{Date(user?.dateOfBirth)}</div>
            </div>
            <div className="border-t border-border p-2 grid grid-cols-12">
              <div className="col-span-4 md:col-span-2 overflow-auto">Gender </div>
              <div className="col-span-8 md:col-span-10 overflow-auto">{user?.gender}</div>
            </div>
          </div>
        </div>
       </div>
      </div>
    </div>
  );
}
