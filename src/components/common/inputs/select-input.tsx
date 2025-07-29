import React, { useEffect, useState } from 'react';
import Select,{SingleValue} from 'react-select';

interface IOption{
    label:string;
    value:string;
}

interface IProps {
    options: IOption[];
    onChange:(value:string)=>void;
    placeholder:string;
    error?:string;
    defaultValue?:string;
}

const SelectInput:React.FC<IProps> = ({error,options=[],onChange,defaultValue,placeholder})=>{
    console.log('select default value',defaultValue)
    // state to track the selected value
    const [selectedValue,setSelectedValue] =  useState<string | undefined>(defaultValue);
    const selectedOption =  options.find(option=>option.value==selectedValue) || null;
    
    //sync with parent's default changes
    useEffect(()=>{
        setSelectedValue(defaultValue)
    },[defaultValue])

    const handleChange = (selectedOption:SingleValue<IOption>)=>{
        const newValue =  selectedOption?.value || '';
        console.log('new value', newValue);
        setSelectedValue(newValue);
        onChange(newValue);
    }
   

    return (
		<div>
			<Select
				styles={{
					input: (baseStyles) => ({
						...baseStyles,
						padding: "8px",
					}),
                    control:(baseStyle) =>({
                        ...baseStyle,
                        borderColor:error ?  '#FB2C36' :'#D1D5DC'
                    })
				}}
				onChange={handleChange}
				options={options}
                value = {selectedOption}
                
				placeholder={placeholder ?? "Select"}
			/>
			{error && <p className="text-xs text-red-500 mt-0">{error}</p>}
		</div>
	);
    
}

export  default SelectInput