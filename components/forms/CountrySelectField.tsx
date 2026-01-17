/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMemo, useState } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import countryList from 'react-select-country-list';

type CountrySelectProps = {
    name: string;
    label: string;
    control: Control<any>;
    error?: FieldError;
    required?: boolean;
    className?: string;
    style?: React.CSSProperties;
};

const CountrySelect = ({
                           value,
                           onChange,
                       }: {
  value?: string;
  onChange: (value: string) => void;
}) => {
    const [open, setOpen] = useState(false);
    
    // Memoize countries list to avoid recreating on every render
    const countries = useMemo(() => countryList().getData(), []);

    const getFlagEmoji = (countryCode: string) => {
        const codePoints = countryCode
          .toUpperCase()
          .split('')
          .map((char) => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
      };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={open}
                className='country-select-trigger w-full justify-between text-base'
              >
                {value ? (
                  <span className='flex items-center gap-2'>
                    <span>{getFlagEmoji(value)}</span>
                    <span>{countries.find((c) => c.value === value)?.label}</span>
                  </span>
                ) : (
                  'Select your country...'
                )}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent
                align='start'
                side='bottom'
                sideOffset={4}
                className='w-[300px] p-0 bg-[#0a1628] border-white/10'
            >
              <Command 
                shouldFilter={true}
                className='w-full'
              >
                <CommandInput
                  placeholder='Search countries...'
                  className='flex !h-auto w-full rounded-md bg-transparent py-3 text-lg outline-hidden placeholder:text-white/50 disabled:cursor-not-allowed disabled:opacity-50'
                />
                <CommandEmpty className='py-6 text-center text-base'>
                  No country found.
                </CommandEmpty>

                <CommandList className='max-h-[300px] overflow-y-auto'>
                  <CommandGroup className='p-1.5'>
                    {countries.map((country) => {
                      const isSelected = value === country.value;
                      return (
                        <CommandItem
                          key={country.value}
                          value={country.label}
                          onSelect={() => {
                            onChange(country.value);
                            setOpen(false);
                          }}
                          className={cn(
                            'relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-base outline-hidden select-none transition-colors',
                            'text-white hover:bg-white/10 focus:bg-white/10 data-[selected=true]:bg-white/10 data-[selected=true]:text-white'
                          )}
                        >
                          <Check
                            className={cn(
                              'ml-1 h-5 w-5 text-yellow-500',
                              isSelected ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          <span className='flex items-center gap-2'>
                            <span className='text-lg'>{getFlagEmoji(country.value)}</span>
                            <span>{country.label}</span>
                          </span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
        </Popover>
      );
  };

export const CountrySelectField = ({
                                       name,
                                       label,
                                       control,
                                       error,
                                       required = false,
                                       className,
                                       style,
                                   }: CountrySelectProps) => {
    return (
          <div className={`space-y-2 ${className || ''}`} style={style}>
            <Label htmlFor={name} className='form-label'>
                {label}
            </Label>

            <Controller
                name={name}
                control={control}
                rules={{
                    required: required ? `Please select ${label.toLowerCase()}` : false,
                }}
                render={({ field }) => <CountrySelect value={field.value} onChange={field.onChange} />}
            />

            {error && <p className='text-sm text-red-500'>{error.message}</p>}

            <p className='text-xs text-white/50'>
              Helps us show news and data relevant to your selected country.
            </p>
        </div>
    );
};