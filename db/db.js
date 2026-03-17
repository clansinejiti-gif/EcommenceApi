import mongoose from 'mongoose'
const DB_URI = process.env.MONGODB_URI;

if(!DB_URI) {
    throw new Error('Please define the Mongodb uri');
}
const connectToDatabase = async () => {
    try{
        await mongoose.connect(DB_URI);
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database:', error);

        process.exit(1);
    }
}

export default  connectToDatabase()