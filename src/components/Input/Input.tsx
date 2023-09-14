import './Input.scss'
import {useState} from "react";

interface InputProps {
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({value, placeholder, onChange}: InputProps) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            name="text"
            className="input"
            onChange={onChange}
            value={value}
        />
    )
}