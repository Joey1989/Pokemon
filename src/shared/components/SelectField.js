import React from 'react';
import IconChevronDown from '../../images/IconChevronDown';

export function SelectField({name, value, setter, options = []}) {
  return (
    <div className="SelectGroup">
        <select
            name={name}
            className=""
            id={name}
            aria-describedby={name + "Help"}
            placeholder={name}
            value={value}
            onChange={(event) => {
                if (!setter) return;
                const option = options.find(
                    (option) => option.value === event.currentTarget.value
                );
                setter(option.value);
            }}
        >
            {options.map(({ label, value }) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </select>
        <IconChevronDown />
    </div>
  );
}
