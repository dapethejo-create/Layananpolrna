import { getDatabase } from "./reset";

export default function handler(req, res) {
  res.status(200).json(getDatabase());
}