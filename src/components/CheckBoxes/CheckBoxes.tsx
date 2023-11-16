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
    {label: 'No Ping', value: '-Pn', checked: false},
    {label: 'No Port Scan', value: '-sn', checked: false},
    {label: 'Fast Scan', value: '-F', checked: false},
    {label: 'All Ports', value: '-p-', checked: false},
    {label: 'Reverse DNS lookup', value: '-sU', checked: false},
    {label: 'Fragment Data into 8 bytes', value: '-f', checked: false},
    {label: 'Fragment Data into 16 bytes', value: '-ff', checked: false},
    // {label: 'Verbose', value: '-v', checked: false},
    // {label: 'Very Verbose', value: '-vv', checked: false},
]

interface SelectProps {
    onChange: () => void;
    visible: boolean;
}

export default function CheckBoxes({onChange, visible}: SelectProps){
    return (
        <div className={'checkbox-selector'}>
            {
                Flags.map((flag) => (
                    <CheckBox key={flag.value} handleChecked={onChange} label={flag.label} value={flag.value}/>
                ))
            }
       </div>
    )
}