// src/utils/apiconfig.js
import { toast } from 'react-toastify';

export const API_URL = "http://localhost:8080/api";

export const notify = (message, type) => {
  if (type === 'success') toast.success(message);
  else if (type === 'error') toast.error(message);
  else toast.info(message);
};
