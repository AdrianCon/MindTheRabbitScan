import { useEffect, useState } from 'react';
import './Checkbox.scss'
import { Checkbox, FormControlLabel } from '@mui/material';

interface ButtonProps {
    label: string;
    value: string;
    handleChecked: (label: string, checked: boolean) => void;
}

export default function CheckBox({handleChecked, label, value}: ButtonProps) {
    const [checked, setChecked] = useState(false);

    function handleCheck(){
        handleChecked(value, checked)
        setChecked(prev=>!prev);
    }

    return (
        <FormControlLabel
        label={value}
        control={
            <Checkbox
                title={label}
                name={label}
                checked={checked}
                onChange={() => handleCheck()}
                sx={{
                    color: '#EAE4E6',
                    '&.Mui-checked': {
                        color: '#EAE4E6',
                      },
                }}
            />
        }
        />
    )
}