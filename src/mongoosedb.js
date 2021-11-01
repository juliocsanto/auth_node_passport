const mongoose = require('mongoose');
require("dotenv/config");

const user = process.env.USERDB;
const pass = process.env.PASS;
const database = process.env.DATABASE;
const serverName = process.env.SERVERNAME;

module.exports = {
    init: () => {
        mongoose
            .connect(
                `mongodb+srv://${user}:${pass}@${serverName}/${database}?retryWrites=true&w=majority`,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    // useFindAndModify: false,
                    // userCreateIndex: false,
                }
            )
            .then((res) => { console.log(`Connection Successful ${res}`) })
            .catch((err) => { console.log(`Error in DB connection ${err}`) });
    },
};
