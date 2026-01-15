// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing


const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- IMPORTANT: Define specific HTML serving routes BEFORE static file middleware ---

// Routes for serving HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});
app.get('/staff', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/hbvheiwbvhebnjhfrbvhjdbhvbfxjkbkdbhadmin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});
app.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view.html'));
});
app.get('/edit', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'edit.html'));
});
// New routes for login and register pages
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/uygrbyeyeggbey5ebgy7fgvifview_transactions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view_transactions.html'));
});
// NEW: Route for the price change page
app.get('/hiyth4ygb5yhgtiuriueiuhgtuhg8price', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'price.html'));
});
app.get('/manage-defaults', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'defaults.html'));
});
// NEW: Route for the Reading Difference page
app.get('/reading-diff', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'diff.html'));
});
// NEW: Route for the oil stock management page
app.get('/oil_stock', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'oil_stock.html'));
});
app.get('/packed-oil-history', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'packed_oil_history.html'));
});
app.get('/excess-shot-report', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'excess_shot.html'));
});
// Serve static files from the 'public' directory
// This middleware will now only handle requests that haven't been caught by the routes above
app.use(express.static(path.join(__dirname, 'public')));


// Enable CORS for all routes (important if frontend and backend are on different origins during development)
// In production, you might want to configure CORS more restrictively.
app.use(cors());


// MongoDB Connection
// Replace with your actual MongoDB connection string
mongoose.connect(`mongodb+srv://wyenfos013:wyenfos4551@cluster0.90i2ivc.mongodb.net/adminp`)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error(err));

// --- Mongoose Schemas and Models ---

// Schema for User Authentication
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure usernames are unique
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving the user
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const User = mongoose.model('User', userSchema);

// NEW: Schema for Staff (separate from User for login)
const staffSchema = new mongoose.Schema({
    // MongoDB will automatically generate an _id
    staffId: { // New field to store the user-provided staff ID
        type: String,
        required: true,
        unique: true, // Ensure staff IDs are unique
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Staff = mongoose.model('Staff', staffSchema);


// Schema for Reading Data
const readingSchema = new mongoose.Schema({
    currentDate: { type: String, required: true },
    selectedId: { type: String, required: true }, // This will now store the staffId
    petrol: { type: Number, default: 0 },
    diesel: { type: Number, default: 0 },
    oil: { type: Number, default: 0 },
    oilFirstReading: { type: Number, default: 0 },
    oilFirstReading2: { type: Number, default: 0 },
    oilFirstReading3: { type: Number, default: 0 },
    oilSecondReading: { type: Number, default: 0 },
    oilSecondReading2: { type: Number, default: 0 },
    oilSecondReading3: { type: Number, default: 0 },
    firstReading1: { type: Number, default: 0 },
    firstReading2: { type: Number, default: 0 },
    firstReading3: { type: Number, default: 0 },
    secondReading1: { type: Number, default: 0 },
    secondReading2: { type: Number, default: 0 },
    secondReading3: { type: Number, default: 0 },
    dieselFirstReading1: { type: Number, default: 0 },
    dieselFirstReading2: { type: Number, default: 0 },
    dieselFirstReading3: { type: Number, default: 0 },
    dieselSecondReading1: { type: Number, default: 0 },
    dieselSecondReading2: { type: Number, default: 0 },
    dieselSecondReading3: { type: Number, default: 0 },
    petrolTestQuantity: { type: Number, default: 0 },
    dieselTestQuantity: { type: Number, default: 0 },
    batteryWater30: { type: Number, default: 0 },
    batteryWater60: { type: Number, default: 0 },
    batteryWater150: { type: Number, default: 0 },
    acidWater: { type: Number, default: 0 },
   packedOilEntries: [{ name: String, amount: Number, price: Number}],
    creditEntries: [{ name: String, amount: Number }],
    debitEntries: [{ name: String, amount: Number }],
    note500: { type: Number, default: 0 },
    note200: { type: Number, default: 0 },
    note100: { type: Number, default: 0 },
    note50: { type: Number, default: 0 },
    note20: { type: Number, default: 0 },
    note10: { type: Number, default: 0 },
    note5: { type: Number, default: 0 },
    coins: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now } // Add timestamp
});

const Reading = mongoose.model('Reading', readingSchema);

// NEW: Schema for Oil Stock (Inventory master list)
const oilStockSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const OilStock = mongoose.model('OilStock', oilStockSchema);

const defaultReadingSchema = new mongoose.Schema({
    // Store Petrol readings
    p1: { type: Number, default: 0 },
    p2: { type: Number, default: 0 },
    p3: { type: Number, default: 0 },
    // Store Diesel readings
    d1: { type: Number, default: 0 },
    d2: { type: Number, default: 0 },
    d3: { type: Number, default: 0 }
});

const DefaultReading = mongoose.model('DefaultReading', defaultReadingSchema);

// NEW: Schema for Party
const partySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Party = mongoose.model('Party', partySchema);

// NEW: Schema for Prices
// This schema will store the current petrol, diesel, and oil prices.
// We'll design it to hold only one document.
const priceSchema = new mongoose.Schema({
    petrolPrice: { type: Number, default: 0 },
    dieselPrice: { type: Number, default: 0 },
    oilPrice: { type: Number, default: 0 },
    // A flag to ensure only one document exists, or just rely on finding/upserting the first one
    // lastUpdated: { type: Date, default: Date.now } // Could add a timestamp if needed
});

// Create a static method to get or create the single price document
priceSchema.statics.getPrices = async function() {
    let prices = await this.findOne();
    if (!prices) {
        prices = await this.create({ petrolPrice: 0, dieselPrice: 0, oilPrice: 0 }); // Initialize with zeros
    }
    return prices;
};

const Price = mongoose.model('Price', priceSchema);


// --- API Endpoints for User Authentication ---


// Login User
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Compare provided password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // In a real application, you would generate a JWT here and send it to the client
        // For this example, we'll just send a success message.
        res.status(200).json({ message: 'Logged in successfully!' });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
});

// --- NEW API Endpoints for Staff Management ---

// API Endpoint to add a new staff member
app.post('/api/staff', async (req, res) => {
    try {
        const { staffId, name } = req.body; // Destructure staffId and name
        const newStaff = new Staff({ staffId, name }); // Use staffId from req.body
        await newStaff.save();
        res.status(201).json(newStaff);
    } catch (error) {
        console.error('Error adding staff:', error);
        if (error.code === 11000) { // Duplicate key error
            return res.status(409).json({ message: 'A staff member with this ID already exists.', error: error.message });
        }
        res.status(500).json({ message: 'Error adding staff', error: error.message });
    }
});

// API Endpoint to get all staff members
app.get('/api/staff', async (req, res) => {
    try {
        const staffList = await Staff.find({});
        res.status(200).json(staffList);
    } catch (error) {
        console.error('Error fetching staff:', error);
        res.status(500).json({ message: 'Error fetching staff', error: error.message });
    }
});

// API Endpoint to delete a staff member by staffId (the custom ID)
app.delete('/api/staff/:staffId', async (req, res) => {
    try {
        const { staffId } = req.params;
        // Use findOneAndDelete to query by the custom staffId field
        const deletedStaff = await Staff.findOneAndDelete({ staffId: staffId });

        if (!deletedStaff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }

        res.status(200).json({ message: 'Staff member deleted successfully', deletedStaff });
    } catch (error) {
        console.error('Error deleting staff:', error);
        res.status(500).json({ message: 'Error deleting staff', error: error.message });
    }
});

app.get('/api/reports/daily-excess-shot', async (req, res) => {
    try {
        const { date } = req.query;
        const readings = await Reading.find({ currentDate: date });
        const staffList = await Staff.find({});

        const report = readings.map(reading => {
            const staff = staffList.find(s => s.staffId === reading.selectedId);
            const name = staff ? staff.name : reading.selectedId;

            console.log(`--- Calculating for Staff: ${name} ---`);

            // 1. OIL SALES: (Second - First) * Price
            const oilReq = ((Number(reading.oilSecondReading || 0) - Number(reading.oilFirstReading || 0)) +
                            (Number(reading.oilSecondReading2 || 0) - Number(reading.oilFirstReading2 || 0)) +
                            (Number(reading.oilSecondReading3 || 0) - Number(reading.oilFirstReading3 || 0))) * Number(reading.oil || 0);
            console.log(`Oil Money: ${oilReq}`);

            // 2. PETROL SALES: (Second - First) * Price
            const petrolReq = ((Number(reading.secondReading1 || 0) - Number(reading.firstReading1 || 0)) +
                               (Number(reading.secondReading2 || 0) - Number(reading.firstReading2 || 0)) +
                               (Number(reading.secondReading3 || 0) - Number(reading.firstReading3 || 0))) * Number(reading.petrol || 0);
            console.log(`Petrol Money: ${petrolReq}`);

            // 3. DIESEL SALES: (Second - First) * Price
            const dieselReq = ((Number(reading.dieselSecondReading1 || 0) - Number(reading.dieselFirstReading1 || 0)) +
                               (Number(reading.dieselSecondReading2 || 0) - Number(reading.dieselFirstReading2 || 0)) +
                               (Number(reading.dieselSecondReading3 || 0) - Number(reading.dieselFirstReading3 || 0))) * Number(reading.diesel || 0);
            console.log(`Diesel Money: ${dieselReq}`);

            // 4. WATER & ACID
            const waterMoney = (Number(reading.batteryWater30 || 0) * 30) + 
                               (Number(reading.batteryWater60 || 0) * 60) + 
                               (Number(reading.batteryWater150 || 0) * 150) + 
                               Number(reading.acidWater || 0);

            // 5. PACKED OIL
            const packedOilMoney = (reading.packedOilEntries || []).reduce((sum, e) => sum + (Number(e.price) || 0), 0);
            console.log(`Packed Oil Total: ${packedOilMoney}`);

            // 6. CREDIT & DEBIT
            const totalCredit = (reading.creditEntries || []).reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
            const totalDebit = (reading.debitEntries || []).reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
            console.log(`Credits: ${totalCredit}, Debits: ${totalDebit}`);

            // 7. TEST QUANTITIES (Liters)
           const petrolTestMoney = Number(reading.petrolTestQuantity || 0) * Number(reading.petrol || 0);
            const dieselTestMoney = Number(reading.dieselTestQuantity || 0) * Number(reading.diesel || 0);
            const totalTestMoney = petrolTestMoney + dieselTestMoney;
            
            console.log(`Test Money Subtracted: ${totalTestMoney}`);

            // 8. DENOMINATIONS
            const totalDenomination = (
                (Number(reading.note500 || 0) * 500) + (Number(reading.note200 || 0) * 200) +
                (Number(reading.note100 || 0) * 100) + (Number(reading.note50 || 0) * 50) +
                (Number(reading.note20 || 0) * 20) + (Number(reading.note10 || 0) * 10) +
                (Number(reading.note5 || 0) * 5) + Number(reading.coins || 0)
            );
            console.log(`Cash Denominations: ${totalDenomination}`);

            // THE FINAL FORMULA PROVIDED BY YOU:
            // (Oil + Petrol + Diesel + Water + Acid + Packed + Credit) - (Debit + Tests + Denomination)
            const result = (totalCredit + totalTestMoney + totalDenomination) - (oilReq + petrolReq + dieselReq + waterMoney + packedOilMoney + totalDebit);
            const requiredmoney =   (oilReq + petrolReq + dieselReq + waterMoney + packedOilMoney + totalDebit ) - (totalCredit + totalTestMoney);
             console.log(`required money: ${requiredmoney}`);
            console.log(`FINAL CALCULATION RESULT: ${result}`);
            console.log(`--------------------------------------`);

            return {
                staffName: name,
                required: requiredmoney.toFixed(2),
                collected: totalDenomination.toFixed(2),
                excessShot: result.toFixed(2)
            };
        });

        res.status(200).json(report);
    } catch (error) {
        console.error("CRITICAL ERROR:", error);
        res.status(500).json({ message: 'Error' });
    }
});

app.get('/api/transactions/packedOil', async (req, res) => {
    try {
        const { fromDate, toDate, oilType } = req.query;
        let query = {};

        if (fromDate && toDate) {
            query.currentDate = { $gte: fromDate, $lte: toDate };
        }
         const allStaff = await Staff.find({});
        const staffMap = {};
        allStaff.forEach(s => {
            staffMap[s.staffId] = s.name;
        });
        // Fetch readings and only the necessary fields
        const readings = await Reading.find(query).select('currentDate packedOilEntries selectedId');

        let history = [];

        readings.forEach(reading => {
            if (reading.packedOilEntries && reading.packedOilEntries.length > 0) {
                reading.packedOilEntries.forEach(entry => {
                    // Filter by oil type if requested
                    if (!oilType || oilType === 'All' || entry.name === oilType) {
                        history.push({
                            date: reading.currentDate,
                            staffName: staffMap[reading.selectedId] || reading.selectedId,
                            name: entry.name,
                            quantity: entry.amount,
                            price: entry.price,
                            total: (entry.amount * entry.price).toFixed(2)
                        });
                    }
                });
            }
        });

        // Sort by date descending
        history.sort((a, b) => new Date(b.date) - new Date(a.date));

        res.status(200).json(history);
    } catch (error) {
        console.error('Error fetching packed oil history:', error);
        res.status(500).json({ message: 'Failed to fetch history', error: error.message });
    }
});

// API Endpoint to fetch credit/debit transactions for view_transactions.html (UPDATED)
app.get('/api/transactions/creditDebit', async (req, res) => {
    try {
        const { fromDate, toDate, staffId, partyName } = req.query; // Destructure partyName
        let query = {};

        if (fromDate && toDate) {
            query.currentDate = { $gte: fromDate, $lte: toDate };
        }

        if (staffId && staffId !== 'All Staff') {
            query.selectedId = staffId;
        }

        // Base query to fetch readings
        let readingsQuery = Reading.find(query).select('currentDate creditEntries debitEntries selectedId');

        const readings = await readingsQuery;

        const transactionsByDate = {};

        readings.forEach(reading => {
            const date = reading.currentDate;
            const staff = reading.selectedId;

            let filteredCredits = [];
            let filteredDebits = [];

            // Filter credit entries by partyName if provided
            if (reading.creditEntries && reading.creditEntries.length > 0) {
                filteredCredits = reading.creditEntries.filter(entry => {
                    return !partyName || entry.name.toLowerCase().includes(partyName.toLowerCase());
                });
            }

            // Filter debit entries by partyName if provided
            if (reading.debitEntries && reading.debitEntries.length > 0) {
                filteredDebits = reading.debitEntries.filter(entry => {
                    return !partyName || entry.name.toLowerCase().includes(partyName.toLowerCase());
                });
            }

            // Only add to transactionsByDate if there are filtered entries for this date
            if (filteredCredits.length > 0 || filteredDebits.length > 0) {
                if (!transactionsByDate[date]) {
                    transactionsByDate[date] = {
                        credits: [],
                        debits: []
                    };
                }

                filteredCredits.forEach(entry => {
                    transactionsByDate[date].credits.push({
                        ...entry._doc,
                        staffId: staff
                    });
                });

                filteredDebits.forEach(entry => {
                    transactionsByDate[date].debits.push({
                        ...entry._doc,
                        staffId: staff
                    });
                });
            }
        });

        const sortedDates = Object.keys(transactionsByDate).sort((a, b) => new Date(b) - new Date(a));
        const sortedTransactions = {};
        sortedDates.forEach(date => {
            sortedTransactions[date] = transactionsByDate[date];
        });

        res.status(200).json(sortedTransactions);
    } catch (error) {
        console.error('Error fetching credit/debit transactions:', error);
        res.status(500).json({ message: 'Failed to fetch credit/debit transactions', error: error.message });
    }
});


// --- API Endpoints for Reading Data (Existing) ---

// API Endpoint to save a new reading
app.post('/api/saveReading', async (req, res) => {
    try {
        const data = req.body;
        const newReading = new Reading(req.body);
        await newReading.save();

        if (data.packedOilEntries && data.packedOilEntries.length > 0) {
            for (const entry of data.packedOilEntries){
                // Find the oil type in the stock and decrement the quantity
                // We use $inc with a negative value to reduce the stock
                await OilStock.findOneAndUpdate(
                    { type: entry.name }, 
                    { $inc: { quantity: -entry.amount } }
                );
            }
        }

        // AUTOMATIC UPDATE: Set current Second Readings as the new First Readings for next time
        await DefaultReading.findOneAndUpdate({}, {
            p1: req.body.secondReading1,
            p2: req.body.secondReading2,
            p3: req.body.secondReading3,
            d1: req.body.dieselSecondReading1,
            d2: req.body.dieselSecondReading2,
            d3: req.body.dieselSecondReading3
        }, { upsert: true });

        res.status(201).json(newReading);
    } catch (error) {
        console.error('Error saving reading:', error);
        res.status(500).json({ message: 'Error saving reading', error: error.message });
    }
});

// API Endpoint to get a single reading by _id (GET request for view.html and edit.html)
app.get('/api/reading/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const reading = await Reading.findById(id);
        if (!reading) {
            return res.status(404).json({ message: 'Reading not found' });
        }
        res.status(200).json(reading);
    } catch (error) {
        console.error('Error fetching reading:', error);
        res.status(500).json({ message: 'Error fetching reading', error: error.message });
    }
});

// API Endpoint to search readings by date and/or ID (GET request for admin.html)
app.get('/api/readings', async (req, res) => {
    try {
        const { searchDate, searchId } = req.query;
        let filter = {};

        if (searchDate) {
            filter.currentDate = searchDate;
        }
        if (searchId) {
            filter.selectedId = searchId; // searchId refers to the staffId now
        }

        const readings = await Reading.find(filter).sort({ timestamp: -1 });
        res.status(200).json(readings);
    } catch (error) {
        console.error('Error fetching readings:', error);
        res.status(500).json({ message: 'Error fetching readings', error: error.message });
    }
});

// API Endpoint to delete a reading by _id
app.delete('/api/readings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReading = await Reading.findByIdAndDelete(id);

        if (!deletedReading) {
            return res.status(404).json({ message: 'Reading not found' });
        }

        res.status(200).json({ message: 'Reading deleted successfully', deletedReading });
    } catch (error) {
        console.error('Error deleting entry:', error);
        res.status(500).json({ message: 'Error deleting entry', error: error.message });
    }
});

// API Endpoint to fetch credit/debit transactions for view_transactions.html
app.get('/api/transactions/creditDebit', async (req, res) => {
    try {
        const { fromDate, toDate, staffId } = req.query;
        let query = {};

        if (fromDate && toDate) {
            // Assuming currentDate in schema is stored as a string in 'YYYY-MM-DD' format
            // Adjust if your currentDate in the Reading schema is stored as a Date object.
            query.currentDate = { $gte: fromDate, $lte: toDate };
        }

        if (staffId && staffId !== 'All Staff') {
            query.selectedId = staffId;
        }

        // Fetch readings that have either creditEntries or debitEntries,
        // and select only the necessary fields
        const readings = await Reading.find(query).select('currentDate creditEntries debitEntries selectedId');

        // Process the readings to group transactions by date and separate credits/debits
        const transactionsByDate = {};
        readings.forEach(reading => {
            const date = reading.currentDate;
            if (!transactionsByDate[date]) {
                transactionsByDate[date] = {
                    credits: [],
                    debits: []
                };
            }
            if (reading.creditEntries && reading.creditEntries.length > 0) {
                reading.creditEntries.forEach(entry => {
                    transactionsByDate[date].credits.push({
                        ...entry._doc, // Include all fields from the subdocument
                        staffId: reading.selectedId // Include staffId for filtering/display
                    });
                });
            }
            if (reading.debitEntries && reading.debitEntries.length > 0) {
                reading.debitEntries.forEach(entry => {
                    transactionsByDate[date].debits.push({
                        ...entry._doc, // Include all fields from the subdocument
                        staffId: reading.selectedId // Include staffId for filtering/display
                    });
                });
            }
        });

        // Sort dates in descending order for display
        const sortedDates = Object.keys(transactionsByDate).sort((a, b) => new Date(b) - new Date(a));
        const sortedTransactions = {};
        sortedDates.forEach(date => {
            sortedTransactions[date] = transactionsByDate[date];
        });

        res.status(200).json(sortedTransactions);
    } catch (error) {
        console.error('Error fetching credit/debit transactions:', error);
        res.status(500).json({ message: 'Failed to fetch credit/debit transactions', error: error.message });
    }
});

// API Endpoint to update a reading by _id (PUT request for edit.html)
app.put('/api/reading/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedReading = await Reading.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedReading) {
            return res.status(404).json({ message: 'Reading not found' });
        }

        res.status(200).json(updatedReading);
    } catch (error) {
        console.error('Error updating reading:', error);
        if (error.code === 11000) {
            return res.status(409).json({ message: 'A reading with this ID already exists. Please use a different ID for update.', error: error.message });
        }
        res.status(500).json({ message: 'Error updating reading', error: error.message });
    }
});
     
 app.get('/api/defaults', async (req, res) => {
    try {
        let defaults = await DefaultReading.findOne();
        if (!defaults) {
            defaults = await DefaultReading.create({ p1:0, p2:0, p3:0, d1:0, d2:0, d3:0 });
        }
        res.status(200).json(defaults);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching defaults' });
    }
});

app.put('/api/defaults/update', async (req, res) => {
    try {
        const updated = await DefaultReading.findOneAndUpdate({}, req.body, { upsert: true, new: true });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Error updating defaults' });
    }
});

// NEW: API Endpoint to get current prices
app.get('/api/prices/current', async (req, res) => {
    try {
        const prices = await Price.getPrices(); // Use the static method to get or create
        res.status(200).json(prices);
    } catch (error) {
        console.error('Error fetching prices:', error);
        res.status(500).json({ message: 'Failed to fetch prices', error: error.message });
    }
});

// NEW: API Endpoint to update prices
app.put('/api/prices/update', async (req, res) => {
    try {
        const { petrolPrice, dieselPrice, oilPrice } = req.body;

        // Find one document and update it. If none exists, create one.
        const updatedPrices = await Price.findOneAndUpdate(
            {}, // Query for any document (there should ideally be only one)
            { petrolPrice, dieselPrice, oilPrice },
            { new: true, upsert: true, runValidators: true } // Return the updated doc, create if not found, run schema validators
        );
        res.status(200).json(updatedPrices);
    } catch (error) {
        console.error('Error updating prices:', error);
        res.status(500).json({ message: 'Failed to update prices', error: error.message });
    }
});

// GET: Fetch all available oil types for the frontend dropdown
app.get('/api/oilStock', async (req, res) => {
    try {
        const stocks = await OilStock.find().sort({ type: 1 });
        res.status(200).json(stocks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching oil stock', error: error.message });
    }
});

// POST: Add a new oil type to the inventory (used in oil_stock.html)
app.post('/api/oilStock', async (req, res) => {
    try {
        const newStock = new OilStock(req.body);
        await newStock.save();
        res.status(201).json(newStock);
    } catch (error) {
        res.status(500).json({ message: 'Error adding stock', error: error.message });
    }
});

// DELETE: Remove an oil type from inventory
app.delete('/api/oilStock/:id', async (req, res) => {
    try {
        await OilStock.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Stock item deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting stock' });
    }
});

// PUT: Update an existing oil stock item
app.put('/api/oilStock/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { type, quantity } = req.body;

        const updatedStock = await OilStock.findByIdAndUpdate(
            id,
            { type, quantity },
            { new: true, runValidators: true } // Returns the updated document
        );

        if (!updatedStock) {
            return res.status(404).json({ message: 'Stock item not found' });
        }

        res.status(200).json(updatedStock);
    } catch (error) {
        console.error('Error updating stock:', error);
        res.status(500).json({ message: 'Error updating stock', error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});