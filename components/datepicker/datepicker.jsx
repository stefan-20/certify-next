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
  // TODO: FIX FOR build
  // inputDateFormatProp: 'yyyy-mm-dd',
  inputDateFormatProp: {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  },
};

export const DatePicker = ({ id, defaultDate }) => {
  const [show, setShow] = useState(false);
  const handleChange = (selectedDate) => {
    console.log(selectedDate);
  };
  const handleClose = (state) => {
    setShow(state);
  };

  options.inputIdProp = id;
  options.inputNameProp = id;
  options.defaultDate = defaultDate;
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
