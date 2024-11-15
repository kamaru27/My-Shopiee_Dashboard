'use client'
import { useState } from "react";

type TProps ={
  id:string
}


const FeaturedSwitch = (props:TProps) => {
  
  const [enabled, setEnabled] = useState<boolean>(false);

  return (
    <div>
      <label
        htmlFor={props.id}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id = {props.id}
            className="sr-only"
            onChange={() => {
              setEnabled(!enabled);
            }}
          />
          <div className="block h-8 w-14 rounded-full bg-gray-3 dark:bg-[#5A616B]"></div>
          <div
            className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow-switch-1 transition ${
              enabled && "!right-1 !translate-x-full !bg-primary dark:!bg-white"    
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default FeaturedSwitch;
