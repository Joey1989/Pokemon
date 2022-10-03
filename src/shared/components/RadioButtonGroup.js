import React from 'react';

export function RadioButtonGroup({ name = '', label = '', options = [], selected, setter }) {
    function renderOptions(){
       return options.map(({label, value, colorCode }) => {
            return (
                <label
                    className={`RadioBadge ${selected === value ? 'Active' : ''}`}
                    key={value}
                    style={{color: 'white', backgroundColor: colorCode}}
                    htmlFor={value}>
                    <input 
                        type='radio' 
                        id={value}
                        name={name}
                        value={value}
                        onChange={(event) => {
                            if (!setter) return
                            setter(event.target.value);
                        }}
                    />
                    <span>{label}</span>
                </label>
            );
       });
    }
 
    return (
        <>
            <h3 className='RadioGroupLabel'>{label.length && label}</h3>
            <div className='RadioGroup'>
                {renderOptions()}
            </div>
        </>
    );
 };
