import './Select.scss'

const Flags = [
    {label: 'SYN Scan', value: '-sS'},
    {label: 'Version Scan', value: '-sV'},
    {label: 'TCP Connect Scan', value: '-sT'},
    {label: 'UDP Scan', value: '-sU'},
    // {label: 'Custom', value: ''},
]

interface SelectProps {
    label: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({label, onChange}: SelectProps){
    return (
        <div className='selector'>
        <p className='label' style={{marginRight: '20px'}}>{label}</p>
        <select className="select" onChange={onChange}>
            {Flags.map((flag) => (
                <option key={flag.value} value={flag.value}>{flag.label}</option>
            ))}
        </select> 
       </div>
    )
}