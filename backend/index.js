import express from "express"
import cors from "cors"
import fs from "fs";
import csvParser from "csv-parser";

const app = express()

const corsOptions = {
    origin: "http://localhost:5500",
};

app.use(cors({
    origin: "http://localhost:5500"
}))


app.use(cors(corsOptions));

app.get("/", (req, res) => {
    const data = [];

    // Read the COVID-19 CSV file and push rows to the data array
    fs.createReadStream("country_wise_latest.csv")
        .pipe(csvParser())
        .on("data", (row) => {
            // Process the data here, e.g., push specific columns to arrays
            const country = row["Country/Region"];
            const confirmed = parseInt(row["Confirmed"]);
            const deaths = parseInt(row["Deaths"]);
            const recovered = parseInt(row["Recovered"]);

            // Push data to the array
            data.push({ country, confirmed, deaths, recovered });
        })
        .on("end", () => {
            res.json(data); // Send the data as JSON
        });
});


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server listening on port ${port} 🚀`))