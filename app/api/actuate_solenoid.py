# echo-client.py
import socket

HOST = "192.168.50.44"  # The server's hostname or IP address
PORT = 65432  # The port used by the server

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    s.sendall(b"Low CO2!!!")
    data = s.recv(1024)

print(f"Received {data!r}")