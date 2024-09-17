import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected: ' + conn.connection.host);
    } catch (error) {
        console.error('MongoDB Connection Error: ', error.message);
        process.exit(1);
    }
}