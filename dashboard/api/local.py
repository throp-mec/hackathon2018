from http import server
import json
import api

class myHandler(server.BaseHTTPRequestHandler):

    def send_api(self):
        frames = api.get_frames()

        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', 'http://10.101.12.240:8080')
        self.send_header('Access-Control-Allow-Credentials', True)
        self.send_header('Content-type','text/json')
        self.end_headers()
        self.wfile.write(json.dumps({
            'data': {
                'frames': frames,
            },
            'status_code': 200,
        }).encode('utf-8'))

    def do_GET(self):
        if self.path == '/api/data':
            return self.send_api()

        self.send_response(404)
        self.send_header('Content-type','text/json')
        self.end_headers()
        # Send the html message
        self.wfile.write(json.dumps({
            'error': 'Path unknown',
            'status_code': 404,
        }).encode('utf-8'))


def run(server_class, handler_class):
    server_address = ('', 8081)
    httpd = server_class(server_address, handler_class)
    print(f"Serving on port {server_address[1]}")
    httpd.serve_forever()

if __name__ == "__main__":
    try:
        run(server.HTTPServer, myHandler)
    except KeyboardInterrupt:
        print('\nExiting on user input\n')
