import React from 'react'
import {Label} from "@/components/ui/label";
import {Controller} from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

const SelectField = ({name, label, placeholder, options, control, error, required = false, className, style}: SelectFieldProps) => {
  return (
    <div className={`space-y-2 ${className || ''}`} style={style}>
        <Label htmlFor={name} className="form-label">
            {label}
        </Label>


        <Controller name={name} control={control} rules={{ required: required ? `${label.toLowerCase()} is required.` : false }} render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="select-trigger text-base">
                    <SelectValue placeholder={placeholder}/>
                </SelectTrigger>
                <SelectContent className="bg-[#0a1628] border-white/10 text-white">
                    {options.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          className="text-base text-white hover:bg-white/10 focus:bg-white/10 data-[state=checked]:bg-white/10 data-[state=checked]:text-white"
                        >
                          {option.label}
                        </SelectItem>
                    ))}

                </SelectContent>
                {error && <p className="text-sm text-red-500">{error.message}</p>}
            </Select>

        )} />

    </div>


  )
}

export default SelectField