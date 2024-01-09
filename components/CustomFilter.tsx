"use client";

import { Fragment, useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Listbox, Transition } from '@headlessui/react';
import { CustomFilterProps } from '@/types';
import { updateSearchParams } from '@/utils';

const CustomFilter = ({ title, options }: CustomFilterProps) => {
  const Router = useRouter();
  const [selected, setSelected] = useState(options[0]); //creates state for button selections and provides list for specific year, fuel
  
  //Updated Parameters of URL to enable specific links to be shared and server side rendered
  const handleUpdateParams = (e: { title: string, value: string }) => {
    
    const newPathName = updateSearchParams(title, e.value.toLowerCase());

    Router.push(newPathName);
  }
  
  return (
    <div className='w-fit'>
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          handleUpdateParams(e);
          }}>
        <div className='relative w-fit z-10'>
          <Listbox.Button className="custom-filter__btn hover:bg-slate-100">
            {/*shows what is currently selected */}
            <span className='block truncate'>
              <Image
                src="/chevron-up-down.svg"
                width={18}
                height={18}
                className='ml-4 object-contain'
                alt='chevron up-down'/>
              {selected.title}
            </span>
          </Listbox.Button>
          {/* creates animation when opening up menu options */}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom='opacity-=100'
            leaveTo='opacity-0'
          >
            <Listbox.Options
              className="custom-filter__options">
              {options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  value={option}
                  className={({ active }) => `relative
                  cursor-default select-non py-2 px-4 ${
                    active ? 'bg-slate-200 opacity-30 text-gray-950' : 'text-slate 800'
                    }`}
                >
                  {({ selected }) => (
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {option.title}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>

          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CustomFilter