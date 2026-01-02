import mongoose from 'mongoose';
import { User } from './models/index';
import dotenv from 'dotenv';

dotenv.config();

async function testSignupAPI() {
  try {
    // Connect to MongoDB
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eduvate');
    console.log('✅ Connected to MongoDB');

    // Get initial user count
    const initialUsers = await User.find();
    console.log(`\n📊 Initial user count: ${initialUsers.length}`);
    initialUsers.forEach((u: any) => console.log(`  - ${u.email}`));

    // Test 1: Create user via API endpoint simulation
    console.log('\n🧪 Test 1: Creating user via simulated API call...');
    const testEmail = `testuser${Date.now()}@example.com`;
    const testPassword = 'TestPassword123!';
    const testName = 'Test User ' + Date.now();

    // Simulate the API request
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
        name: testName,
      }),
    });

    const responseData: any = await response.json();
    console.log(`API Response Status: ${response.status}`);
    console.log(`API Response:`, responseData);

    if (response.ok) {
      console.log(`✅ User created via API!`);
      console.log(`   Token received: ${responseData.token ? 'YES' : 'NO'}`);
      console.log(`   User email: ${responseData.user?.email}`);
      console.log(`   User name: ${responseData.user?.name}`);
    } else {
      console.log(`❌ API Error: ${responseData.error}`);
      throw new Error(responseData.error);
    }

    // Verify user was saved
    await new Promise(resolve => setTimeout(resolve, 500)); // Wait for write
    const finalUsers = await User.find();
    console.log(`\n📊 Final user count: ${finalUsers.length}`);
    finalUsers.forEach((u: any) => console.log(`  - ${u.email}`));

    // Find the new user
    const newUser = await User.findOne({ email: testEmail });
    if (newUser) {
      console.log(`\n✅ User verified in MongoDB!`);
      console.log(`   Email: ${newUser.email}`);
      console.log(`   Name: ${newUser.name}`);
      console.log(`   ID: ${newUser._id}`);
    } else {
      console.log(`\n❌ User NOT found in MongoDB!`);
    }

    await mongoose.disconnect();
    console.log('\n✅ Test completed');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testSignupAPI();
