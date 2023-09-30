from flask import Flask, request, jsonify
from flask_cors import CORS  # Import Flask-CORS
import nmap

app = Flask(__name__)
CORS(app)  # Enable CORS for your Flask app

@app.route('/scan', methods=['POST'])
def nmap_scan():
    try:
        ip_address = request.json['ip_address']
        scan_type = request.json['scan_type']
        # Create an Nmap scanner
        nm = nmap.PortScanner()
        # Run the Nmap scan
        scan_results = nm.scan(ip_address, arguments=f"-T4 -F {scan_type}")
        return jsonify(scan_results)
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)
