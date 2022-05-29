import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 9988;

app.use(bodyParser.json());
app.listen(port, () => console.log(`Listening on port #${port}`));

app.post("/webhook", (req, res) => {
    const activity = req.body.event.activity;
    const message = `${activity[0].fromAddress} paid you ${activity[0].value} ETH. https://goerli.etherscan.io/tx/${activity[0].hash}`;
    res.send(message);
});