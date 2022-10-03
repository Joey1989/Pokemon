import React from 'react';

export function InputField({name, value, setter, type='text', checked=false}) {
  return (
    <div className='FormGroup'>
      <input
        type={type}
        name={name}
        className=''
        id={name}
        aria-describedby={name + 'Help'}
        placeholder={name}
        value={value}
        checked={checked}
        onChange={(event) => {
          if (!setter) return
          setter(event.target.value);
        }}
      />
    </div>
  );
}
