import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from './models/index';
import dotenv from 'dotenv';

dotenv.config();

async function testSignup() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eduvate');
    console.log('✅ Connected to MongoDB');

    // Check existing users
    const existingUsers = await User.find();
    console.log(`\n📊 Existing users in database: ${existingUsers.length}`);
    existingUsers.forEach((user: any) => {
      console.log(`  - ${user.email} (ID: ${user._id})`);
    });

    // Create a test user
    const testEmail = `testuser${Date.now()}@example.com`;
    const testPassword = 'TestPassword123!';

    console.log(`\n🔐 Creating test user: ${testEmail}`);

    // Hash password
    const hashedPassword = await bcrypt.hash(testPassword, 10);

    // Create user
    const newUser = await User.create({
      email: testEmail.toLowerCase(),
      password: hashedPassword,
      name: 'Test User',
    });

    console.log(`✅ User created successfully!`);
    console.log(`   Email: ${newUser.email}`);
    console.log(`   ID: ${newUser._id}`);
    console.log(`   Name: ${newUser.name}`);

    // Verify user was saved
    const savedUser = await User.findById(newUser._id);
    if (savedUser) {
      console.log(`\n✅ User verified in database!`);
      console.log(`   Email: ${savedUser.email}`);
      console.log(`   Password Hash: ${savedUser.password.substring(0, 20)}...`);
    } else {
      console.log(`\n❌ User NOT found in database after creation!`);
    }

    // List all users now
    const allUsers = await User.find();
    console.log(`\n📊 Total users in database now: ${allUsers.length}`);
    allUsers.forEach((user: any) => {
      console.log(`  - ${user.email} (ID: ${user._id})`);
    });

    await mongoose.disconnect();
    console.log('\n✅ Test completed and disconnected');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testSignup();
