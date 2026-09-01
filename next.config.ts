import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev-сервер смотрят по LAN-адресу: без этого Next 16 отдаёт 403 на JS/HMR
  // для origin, отличного от localhost (сайт не гидрируется, Reveal-блоки пустые).
  allowedDevOrigins: ['10.10.2.6', '127.0.0.1', 'localhost'],
};

export default nextConfig;
