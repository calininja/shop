import axios from 'axios';
export * from './users';
export * from './orders';
export * from './products';
import { backUrl } from 'config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;


