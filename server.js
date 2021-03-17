const express = require('express');
const logger = require('morgan')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 8080

const app = express();

app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/static', express.static(path.join(__dirname, 'public')))

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// will need to require in routes below !!!! ---------------------------------------------------------------------


app.use(require('./Develop/routes/html-routes.js'))
app.use(require('./Develop/routes/api-routes.js'))




app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});