"use client";

import { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const options = [
  { id: "1", name: "ECE" },
  { id: "2", name: "FLN" },
  { id: "3", name: "CSE" },
  { id: "4", name: "IT" },
];

export default function MultiSelectDropdown() {
  const [selectedOptions, setSelectedOptions] = useState<
    { id: string; name: string }[]
  >([]);
  const [category, setCategory] = useState<{ id: string }[]>([]);

  console.log("first", category);
  const handleSelect = (selected: { id: string; name: string }[]) => {
    setSelectedOptions(selected);
    setCategory(selected.map((option) => ({ id: option.id })));
  };

  return (
    <div className="w-72">
      <label className="mb-1 text-sm text-cyan-600">Category</label>
      <Listbox value={selectedOptions} onChange={handleSelect} multiple>
        <div className="relative">
          <ListboxButton className="w-full rounded-md border border-cyan-400 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400">
            <span className="block truncate">
              {selectedOptions.length > 0
                ? selectedOptions.map((item) => item.name).join(", ")
                : "Select options"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </span>
          </ListboxButton>

          <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg focus:outline-none">
            {options.map((option) => (
              <ListboxOption
                key={option.id}
                value={option}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? "bg-cyan-100 text-cyan-900" : "text-gray-900"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.name}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-600">
                        ✓
                      </span>
                    )}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}
