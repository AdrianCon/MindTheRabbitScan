import CheckBox from '../Checkbox/Checkbox';
import './CheckBoxes.scss'

// const Flags = {
//     scanSYN: {label: 'SYN Scan', value: '-sS', checked: false},
//     scanVersion: {label: 'Version Scan', value: '-sV', checked: false},
//     scanTCP: {label: 'TCP Connect Scan', value: '-sT', checked: false},
//     scanUDP: {label: 'UDP Scan', value: '-sU', checked: false},
// }

const Flags = [
    {label: 'SYN Scan', value: '-sS', checked: false},
    {label: 'Version Scan', value: '-sV', checked: false},
    {label: 'TCP Connect Scan', value: '-sT', checked: false},
    {label: 'UDP Scan', value: '-sU', checked: false},
]

interface SelectProps {
    onChange: () => void;
}

export default function CheckBoxes({onChange}: SelectProps){
    return (
        <div className='selector'>
            {
                Flags.map((flag) => (
                    <CheckBox key={flag.value} handleChecked={onChange} label={flag.label} value={flag.value}/>
                ))
            }
       </div>
    )
}