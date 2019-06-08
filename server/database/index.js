const mongoose = require("mongoose");

mongoose.connect(
    `mongodb+srv://${"WebFixerr"}:${"B11khTpnD8K35RZT"}@project-ppgo7.mongodb.net/${"newTask"}?retryWrites=true`,
    { useNewUrlParser: true },
    err => {
        if (err) console.log(err);
        else console.log("Database connected...");
    }
);
