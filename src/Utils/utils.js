export function isPrivateIP(ip) {
    // Convert the IP address to a numeric representation
    const ipNumeric = ip.split('.').reduce((acc, octet, index) => acc + parseInt(octet) * Math.pow(256, 3 - index), 0);

    // Define private address ranges
    const privateRanges = [
        { start: ipToNumeric('10.0.0.0'), end: ipToNumeric('10.255.255.255') },
        { start: ipToNumeric('172.16.0.0'), end: ipToNumeric('172.31.255.255') },
        { start: ipToNumeric('192.168.0.0'), end: ipToNumeric('192.168.255.255') },
        // Add more private ranges if needed
    ];

    // Check if the IP address is in any of the private ranges
    return privateRanges.some(range => ipNumeric >= range.start && ipNumeric <= range.end);
}

export function isLocalHost(ip) {
    // Convert the IP address to a numeric representation
    const ipNumeric = ip.split('.').reduce((acc, octet, index) => acc + parseInt(octet) * Math.pow(256, 3 - index), 0);

    // Define private address ranges
    const privateRanges = [
        { start: ipToNumeric('127.0.0.0'), end: ipToNumeric('127.255.255.255') },
    ];

    // Check if the IP address is in any of the private ranges
    return privateRanges.some(range => ipNumeric >= range.start && ipNumeric <= range.end);
}

// Helper function to convert an IP address to a numeric representation
function ipToNumeric(ip) {
    return ip.split('.').reduce((acc, octet, index) => acc + parseInt(octet) * Math.pow(256, 3 - index), 0);
}