const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const ExpressError = require('./utils/ExpressError');

dotenv.config();
const app =express();
const authRoutes = require('./routes/auth.routes');
const clientRoutes = require('./routes/client.routes');
const documentRoutes = require('./routes/document.routes');
const invoiceRoutes = require('./routes/invoice.routes');
const reminderRoutes = require("./routes/reminder.Routes");

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/clients', clientRoutes);
app.use('/api/v1/documents', documentRoutes);
app.use('/api/v1/invoices', invoiceRoutes);
app.use('/api/v1/reminders', reminderRoutes);


const PORT = process.env.PORT || 8080;

// MongoDB connection
main()
.then(() => {
    console.log("Connected to MongoDB");
})
.catch(err => {
    console.error("Error connecting to MongoDB:", err);
});

async function main() {
    await mongoose.connect(process.env.DB_URI)
}



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})