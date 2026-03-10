from __future__ import annotations

import os
import socket
import sys

import uvicorn


def find_available_port(base_port: int, max_attempts: int = 10) -> int:
    for offset in range(max_attempts + 1):
        candidate = base_port + offset
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            if sock.connect_ex(("127.0.0.1", candidate)) != 0:
                if offset > 0:
                    print(f"Port {base_port + offset - 1} is busy, retrying on {candidate}")
                return candidate
            print(f"Port {candidate} is busy, retrying on {candidate + 1}")
    raise RuntimeError("No available port found for Python backend")


if __name__ == "__main__":
    base_port = int(os.getenv("PORT", "8010"))
    selected_port = find_available_port(base_port)
    reload_enabled = "--reload" in sys.argv
    uvicorn.run("backend.main:app", host="0.0.0.0", port=selected_port, reload=reload_enabled)