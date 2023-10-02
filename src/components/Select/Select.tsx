import './Select.scss'

const Flags = {
    scanSYN: {label: 'SYN Scan', value: '-sS'},
    scanVersion: {label: 'Version Scan', value: '-sV'},
    scanTCP: {label: 'TCP Connect Scan', value: '-sT'},
    scanUDP: {label: 'UDP Scan', value: '-sU'},
}

interface SelectProps {
    label: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({label, onChange}: SelectProps){
    return (
        <div className='selector'>
        <p className='label' style={{marginRight: '20px'}}>{label}</p>
        <select className="select" onChange={onChange}>
            <option value={Flags.scanSYN.value}>{Flags.scanSYN.label}</option> 
            <option value={Flags.scanVersion.value}>{Flags.scanVersion.label}</option> 
            <option value={Flags.scanTCP.value}>{Flags.scanTCP.label}</option> 
            <option value={Flags.scanUDP.value}>{Flags.scanUDP.label}</option> 
        </select> 
       </div>
    )
}