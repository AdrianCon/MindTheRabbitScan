import './Form.scss'
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useState } from 'react';
import Select from '../Select/Select';
import { wrap } from 'module';
import ScanLoader from '../ScanLoader/ScanLoader';
import Code from '../Code/Code';

interface nmap{
    ip_address: string;
    scan_type: string;
}

const nmapInitialState: nmap = {
    ip_address: '',
    scan_type: '-sT',
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
        fetch("http://localhost:5000/scan", requestOptions)
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

    return (
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
            {isLoading ? <ScanLoader/> : null}
            {result ? <Code code={result}/> : null}
        </form>
    )
}