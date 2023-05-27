import React from "react";

const Input = (props) => {
   const { label, error, ...refs } = props;

   return (
      <div>
         <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
         >
            {label}
         </label>
         <input
            {...refs}
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
         />
         {error && <p className="text-[13px] text-red-500">{error}</p>}
      </div>
   );
};

export default Input;
