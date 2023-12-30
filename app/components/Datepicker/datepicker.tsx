import { useState } from 'react';
import Datepicker from 'tailwind-datepicker-react';

const options = {
  title: 'Calendar',
  autoHide: true,
  todayBtn: true,
  clearBtn: true,
  clearBtnText: 'Clear',
  //   maxDate: new Date('2030-01-01'),
  //   minDate: new Date('1950-01-01'),
  theme: {
    background: 'bg-white',
    todayBtn: '',
    clearBtn: '',
    icons: '',
    text: '',
    disabledText: 'dark:text-slate-400',
    input: 'dark:bg-white dark:text-black',
    inputIcon: '',
    selected: '',
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => <span className="">Previous</span>,
    next: () => <span>Next</span>,
  },
  //   datepickerClassNames: 'top-12',
  defaultDate: new Date(),
  language: 'en-gb',
  disabledDates: [],
  weekDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  inputNameProp: 'date',
  inputIdProp: 'date',
  inputPlaceholderProp: 'Select Date',
  // inputDateFormatProp: 'yyyy-mm-dd',
  // inputDateFormatProp: {
  //   day: 'numeric',
  //   month: 'numeric',
  //   year: 'numeric',
  // },
};

export const DatePicker = ({
  id,
  defaultDate,
}: {
  id: string;
  defaultDate: Date | null;
}) => {
  const [show, setShow] = useState(false);
  const handleChange = (selectedDate: Date) => {
    console.log(selectedDate);
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  options.inputIdProp = id;
  options.inputNameProp = id;
  options.defaultDate = defaultDate!;
  return (
    <div className="">
      <Datepicker
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
      />
    </div>
  );
};
