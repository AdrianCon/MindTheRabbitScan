import './Form.scss'
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import Select from '../Select/Select';
import ScanLoader from '../ScanLoader/ScanLoader';
import Code from '../Code/Code';
import CheckBoxes from '../CheckBoxes/CheckBoxes';
import Summary from '../Summary/Summary';
import { Alert } from '@mui/material';

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
    const [selectedVis, setSelectedVis] = useState('text');
    const [error, setError] = useState(false);

    function validateInput(input: string) {
        const ValidIpAddressRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/\d{1,2})?$/;
        const ValidHostnameRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/;
      
        if (ValidIpAddressRegex.test(input)) {
          return true;
        } else if (ValidHostnameRegex.test(input)) {
          return true;
        } else {
          return false;
        }
    }

    useEffect(() => {
        const timeId = setTimeout(() => {
          // After 3 seconds set the show value to false
          setError(false)
        }, 8000)
    
        return () => {
          clearTimeout(timeId)
        }
      }, [error]);


    const handleScanEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
        const validInput = validateInput(nmapScan.ip_address);
        console.log(validInput)
        if(!validInput) {
            setError(true)
            return
        }
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
            scan_type: e.target.value,
            flags: prev.scan_type === "" ? [] : prev.flags 
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

    const handleVisSelect = (type: string) => {
        if(type === 'text') setSelectedVis('text')
        else setSelectedVis('json')
    }

    console.log(nmapScan)
    return (
        <div style={{display: 'flex'}}>
            <form
                className='form'
                onSubmit={e => e.preventDefault()}
            >
                <div className='row' style={{width: '100%', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', alignItems: 'center'}}>
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
                <div className='col' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0'}}>
                    <Select label={"Scan Type:"}onChange={handleScanTypeChange}/>
                </div>
                {nmapScan.scan_type === "" ? (
                    <CheckBoxes onChange={handleCheck} visible={nmapScan.scan_type === "" ? true : false}/>
                ): null}
                {isLoading ? <ScanLoader/> : null}
                {result && (
                    <div className='code-cont'>
                        <div className="visualization">
                            <button
                                className={selectedVis === 'text' ? 'selected' : ''}
                                onClick={() => handleVisSelect('text')}
                            >
                                Text
                            </button>
                            <button
                                className={selectedVis === 'json' ? 'selected' : ''}
                                onClick={() => handleVisSelect('json')}
                            >
                                JSON
                            </button>
                        </div>
                        {selectedVis === 'text' ? <Summary data={JSON.parse(result)}/> : null}
                        {selectedVis === 'json' ? <Code code={result}/> : null}
                    </div>

                )}
                {error && (
                    <div
                        style={{
                            position: 'sticky',
                            width: '50%',
                            bottom: '10px'
                        }}
                    >
                        <Alert severity="error">Error - Not a domain, IP or IP range!</Alert>
                    </div>
                )}
            </form>
        </div>
    )
}
