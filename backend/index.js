const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const TaskRoutes = require('./Routes/TaskRoutes');  // Assuming you have TaskRoutes defined
const PORT = process.env.PORT || 8080;

require('./Models/db');  // Ensure your database is correctly connected

app.use(cors());
app.use(bodyParser.json());

// Use /api/tasks route
app.use('/api/tasks', TaskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
