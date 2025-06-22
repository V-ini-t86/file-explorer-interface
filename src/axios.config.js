import axios from "axios";
import { config } from "./config";

export const dataset = axios.create({ baseURL: config.DATASET_URL });