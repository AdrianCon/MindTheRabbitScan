from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin  # Import Flask-CORS
import nmap
from OpenSSL import SSL

app = Flask(__name__)
#CORS(app)  # Enable CORS for your Flask app
cors = CORS(app, resource={
    r"/api/*":{
        "origins":"*"
    }
})
app.config['SESSION_COOKIE_SECURE'] = True
#app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['FORCE_HTTPS'] = True
app.config['CORS_HEADERS'] = 'Content-Type'
@app.route('/api/scan', methods=['POST'])
@cross_origin()
def nmap_scan():
    print(request.json)
    try:
        ip_address = request.json['ip_address']
        scan_type = request.json['scan_type']
        flags = request.json['flags']
        flags = " ".join(flags)
        # Create an Nmap scanner
        nm = nmap.PortScanner()
        # Run the Nmap scan
        scan_results = nm.scan(ip_address, arguments=f"-T4 -F {scan_type} {flags}")
        response = jsonify(scan_results)
        #response.headers.add('Access-Control-Allow-Origin', '*')
        print(response)
        return response
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    #context = SSL.Context(SSL.SSLv23_METHOD)
    #context.use_privatekey_file('/etc/letsencrypt/live/mindtherabbit.com/privkey.pem')
    #context.use_certificate_file('/etc/letsencrypt/live/mindtherabbit.com/fullchain.pem')
    context = ('/etc/letsencrypt/live/mindtherabbit.com/fullchain.pem','/etc/letsencrypt/live/mindtherabbit.com/privkey.pem')
    app.run(host='0.0.0.0',debug=True, ssl_context=context)
