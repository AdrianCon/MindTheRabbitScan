import './Summary.scss'

interface SelectProps {
    data: any;
}

export default function Summary({data}: SelectProps){
    const {nmap, scan} = data;
    const {scaninfo, scanstats} = nmap;
    const scanIp = Object.keys(scan);
    console.log(nmap, scan, scanIp)
    return (
        <section className={'summary'}>
            <h1>{nmap.command_line}</h1>
            {scaninfo?.tcp && (
                <>
                    <div className='row'>
                        <h3>{scaninfo.tcp ? 'Method: TCP' : ""}</h3>
                    </div>
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
       </section>
    )
}