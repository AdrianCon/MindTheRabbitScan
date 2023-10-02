import './Form.scss'
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useState } from 'react';
import Select from '../Select/Select';
import { wrap } from 'module';
import ScanLoader from '../ScanLoader/ScanLoader';
import Code from '../Code/Code';
import CheckBoxes from '../CheckBoxes/CheckBoxes';

interface nmap{
    ip_address: string;
    scan_type: string;
    flags: any;
}

const nmapInitialState: nmap = {
    ip_address: '',
    scan_type: '-sT',
    flags: [],
}

export default function Form() {
    const [nmapScan, setNmapScan] = useState<nmap>(nmapInitialState);
    const [result, setResult] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleScanEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(nmapScan);

        var requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        setIsLoading(true);
        setResult('');
        fetch("http://143.198.65.227:5000/scan", requestOptions)
        .then(response => response.json())
        .then(result => {
            setResult(JSON.stringify(result,null,2))
            setIsLoading(false);
        })
        .catch(error => {
            console.log('error', error)
            setIsLoading(false);
        });
        console.log(nmapScan)
    }

    const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNmapScan((prev) => ({
            ...prev,
            ip_address: e.target.value
        }))
    }

    const handleScanTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)
        setNmapScan((prev) => ({
            ...prev,
            scan_type: e.target.value
        }))
    }

    const handleCheck = (label?: string, checked?: boolean) => {
        console.log('is running')
        if(checked) {
            const newArr: string[] = nmapScan.flags.filter((flag: string) => flag !== label)
            setNmapScan((prev) => ({
                ...prev,
                flags: newArr
            }))
        } else {
            let arr: string[] = [...nmapScan.flags, label];
            setNmapScan((prev) => ({
                ...prev,
                flags: arr
            }))
        }
    }

    console.log(nmapScan)
    return (
        <div style={{display: 'flex', marginTop: '10vh'}}>
            <form
                className='form'
                onSubmit={e => e.preventDefault()}
            >
                <div style={{width: '100%', marginBottom: '5vh', flexWrap: 'wrap'}}>
                    <Input
                        placeholder="Enter IP or Domain to scan..."
                        value={nmapScan.ip_address}
                        onChange={handleDomainChange}
                    />
                    <Button
                        label={'Scan'}
                        onClick={handleScanEvent}
                    />
                </div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Select label={"Scan Type:"}onChange={handleScanTypeChange}/>
                </div>
                <CheckBoxes onChange={handleCheck}/>
                {isLoading ? <ScanLoader/> : null}
                {result ? <Code code={result}/> : null}
            </form>
        </div>
    )
}
