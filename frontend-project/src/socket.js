// src/socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Cambia esto a la URL de tu backend si es necesario

export default socket;
