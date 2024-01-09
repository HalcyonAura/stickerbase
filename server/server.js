import express from "express";
import cors from "cors";
import router from "./router.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(cors());
app.use(express.json());


app.use(router);