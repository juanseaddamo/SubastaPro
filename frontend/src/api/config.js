// URL del backend: se configura con EXPO_PUBLIC_API_URL (ver frontend/.env.example).
// Sin variable, apunta al backend local:
// 10.0.2.2 = emulador Android → localhost del host; localhost = web / iOS sim.
const isWeb = typeof document !== 'undefined';
const LOCAL_URL = isWeb ? 'http://localhost:8080' : 'http://10.0.2.2:8080';

export const API_URL = process.env.EXPO_PUBLIC_API_URL || LOCAL_URL;
