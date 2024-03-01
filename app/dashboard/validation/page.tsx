'use client';
import { lusitana } from '@/components/ui/fonts';
import { ValidateUser } from '@/components/ui/validation/buttons';
import { useEffect, useState } from 'react';
import Select from 'react-select';

export default function Page() {
  const [options, setOptions] = useState<any | null>([]);
  const [selectedOption, setSelectedOption] = useState<any | null>({
    label: 'Email',
    value: null,
  });

  useEffect(() => {
    fetch('/api/validation/users')
      .then((res) => res.json())
      .then((data) => setOptions(data.results));
  }, []);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Validation</h1>
      </div>
      <div className="mt-4 flex items-center justify-start gap-2 md:mt-8">
        <Select
          options={options}
          value={selectedOption}
          className="w-1/3"
          id={'userEmailSelect'}
          onChange={(option) => {
            setSelectedOption(option);
          }}
        ></Select>
        <ValidateUser userId={selectedOption.value}></ValidateUser>
      </div>
    </div>
  );
}
