import './Summary.scss'

interface SelectProps {
    data: any;
}

export default function Summary({data}: SelectProps){
    const {nmap, scan} = data;
    const {scaninfo, scanstats} = nmap;
    console.log('nmap', nmap)
    console.log('scan', scan)
    const entries = Object.entries(scan)
    console.log('entries', entries)
    console.log(entries?.[0]?.[1])
    return (
        <section className={'summary'}>
            <h1>{nmap.command_line}</h1>
            <hr className='dashed'/>
            {scaninfo?.tcp && (
                <>
                    <div className='row'>
                        <h3>{scaninfo.tcp ? 'Method: TCP' : ""}</h3>
                    </div>
                    <h3>Ports scanned:</h3>
                    <p>{scaninfo.tcp.services}</p>
                </>
            )}
            {scaninfo?.udp && (
                <>
                    <div className='row' style={{gap: '10px'}}>
                        <h3>{scanstats.totalhosts ? `Total Hosts: ${scanstats.totalhosts}` : ""}</h3>
                        <h3>{scanstats.uphosts ? `Up Hosts: ${scanstats.uphosts}` : ""}</h3>
                        <h3>{scanstats.downhosts ? `Down Hosts: ${scanstats.downhosts}` : ""}</h3>
                        <h3>{scaninfo.udp ? 'Method: UDP' : ""}</h3>
                    </div>
                    <p>{scaninfo.udp.services}</p>
                </>
            )}
            <hr className='dashed'/>
            {entries?.length > 0 ? (
                entries.map((info,index) => {
                    const entry = info[1];
                    const protocol = entry?.tcp ?? entry?.udp;
                    const ports = protocol ? Object.entries(protocol) : null;
                    return(
                    <div key={`Scan_${index}`}>
                        <h3>{`Address: ${entry.addresses?.ipv4}`}</h3>
                        <h3>{`Status: ${entry.status.state}`}</h3>
                        <h3>{`Reason: ${entry.status.reason}`}</h3>
                        <div>
                            <h3>Ports</h3>
                            {ports ? ports.map((port,index) => (
                                <div className='row' key={port?.[0]} style={{gap: '20px'}}>
                                    <h4>{port?.[0]}</h4>
                                    <h4>{`Service: ${port?.[1]?.name}`}</h4>
                                    <h4>{`State: ${port?.[1]?.state}`}</h4>
                                </div>
                            ))

                            :null}
                        </div>
                        <hr className='dashed'/>
                    </div>
                )})
            ) : null}
       </section>
    )
}