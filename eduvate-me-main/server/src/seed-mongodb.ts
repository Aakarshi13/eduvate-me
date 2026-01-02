import { connectDB, disconnectDB } from './config/mongodb';
import { User, College, Cutoff, Exam, Scholarship, Hostel, Placement } from './models/index';
import { colleges, exams, scholarships, pgHostels, placementData, users } from './seedData';
import bcrypt from 'bcryptjs';

const seed = async () => {
  console.log('🌱 Starting database seeding...');

  try {
    // Connect to MongoDB
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      College.deleteMany({}),
      Cutoff.deleteMany({}),
      Exam.deleteMany({}),
      Scholarship.deleteMany({}),
      Hostel.deleteMany({}),
      Placement.deleteMany({}),
    ]);

    // Seed users
    console.log('🧑‍💻 Seeding users...');
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({
        email: user.email.toLowerCase(),
        password: hashedPassword,
        name: user.name || null,
      });
    }
    console.log('✅ Users seeded successfully');

    // Seed colleges
    console.log('📚 Seeding colleges...');
    const createdColleges = await College.insertMany(
      colleges.map((college) => ({
        name: college.name,
        shortName: college.shortName,
        location: college.location,
        state: college.state,
        type: college.type,
        ranking: college.ranking,
        fees: college.fees,
        avgPackage: college.avgPackage,
        highestPackage: college.highestPackage,
        placementRate: college.placementRate,
        topRecruiters: college.topRecruiters,
        facilities: college.facilities,
        courses: college.courses,
        established: college.established,
        accreditation: college.accreditation,
        imageUrl: college.imageUrl || null,
      }))
    );
    console.log(`✅ Seeded ${createdColleges.length} colleges`);

    // Seed cutoffs
    console.log('📊 Seeding cutoffs...');
    let cutoffCount = 0;
    for (const college of colleges) {
      const createdCollege = createdColleges.find((c: any) => c.shortName === college.shortName);
      if (!createdCollege) continue;

      if (college.cutoffs.jee) {
        for (const cutoff of college.cutoffs.jee) {
          await Cutoff.create({
            collegeId: createdCollege._id,
            examType: 'jee',
            year: cutoff.year,
            general: cutoff.general,
            obc: cutoff.obc,
            sc: cutoff.sc,
            st: cutoff.st,
            ews: cutoff.ews,
          });
          cutoffCount++;
        }
      }

      if (college.cutoffs.neet) {
        for (const cutoff of college.cutoffs.neet) {
          await Cutoff.create({
            collegeId: createdCollege._id,
            examType: 'neet',
            year: cutoff.year,
            general: cutoff.general,
            obc: cutoff.obc,
            sc: cutoff.sc,
            st: cutoff.st,
            ews: cutoff.ews,
          });
          cutoffCount++;
        }
      }

      if (college.cutoffs.cuet) {
        for (const cutoff of college.cutoffs.cuet) {
          await Cutoff.create({
            collegeId: createdCollege._id,
            examType: 'cuet',
            year: cutoff.year,
            general: cutoff.general,
            obc: cutoff.obc,
            sc: cutoff.sc,
            st: cutoff.st,
            ews: cutoff.ews,
          });
          cutoffCount++;
        }
      }
    }
    console.log(`✅ Seeded ${cutoffCount} cutoffs`);

    // Seed exams
    console.log('📝 Seeding exams...');
    await Exam.insertMany(
      exams.map((exam) => ({
        name: exam.name,
        fullName: exam.fullName,
        date: exam.date,
        resultDate: exam.resultDate,
        counsellingStart: exam.counsellingStart,
        counsellingEnd: exam.counsellingEnd,
        type: exam.type,
        registrationDeadline: exam.registrationDeadline,
      }))
    );
    console.log(`✅ Seeded ${exams.length} exams`);

    // Seed scholarships
    console.log('🎓 Seeding scholarships...');
    await Scholarship.insertMany(
      scholarships.map((scholarship) => ({
        name: scholarship.name,
        provider: scholarship.provider,
        amount: scholarship.amount,
        eligibility: scholarship.eligibility,
        deadline: scholarship.deadline,
        category: scholarship.category,
        examTypes: scholarship.examType,
      }))
    );
    console.log(`✅ Seeded ${scholarships.length} scholarships`);

    // Seed hostels
    console.log('🏠 Seeding hostels...');
    await Hostel.insertMany(
      pgHostels.map((hostel) => ({
        name: hostel.name,
        type: hostel.type,
        location: hostel.location,
        nearbyColleges: hostel.nearbyColleges,
        distance: hostel.distance,
        rent: hostel.rent,
        amenities: hostel.amenities,
        gender: hostel.gender,
        rating: hostel.rating,
        reviews: hostel.reviews || 0,
        imageUrl: hostel.imageUrl || null,
      }))
    );
    console.log(`✅ Seeded ${pgHostels.length} hostels`);

    // Seed placements
    console.log('💼 Seeding placements...');
    let placementCount = 0;
    
    // placementData is an object with statistics, not individual placement records
    // For now, we'll create some sample placements for each college
    for (const college of colleges) {
      const createdCollege = createdColleges.find((c: any) => c.shortName === college.shortName);
      if (!createdCollege) continue;

      // Create sample placement records for this college
      const companies = ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Goldman Sachs'];
      const sectors = ['IT/Software', 'Finance', 'Consulting', 'Core Engineering'];
      
      for (let year = 2022; year <= 2024; year++) {
        for (const company of companies.slice(0, Math.floor(Math.random() * companies.length) + 1)) {
          await Placement.create({
            collegeId: createdCollege._id,
            year,
            sector: sectors[Math.floor(Math.random() * sectors.length)],
            company,
            offers: Math.floor(Math.random() * 100) + 10,
            avgPackage: Math.floor(Math.random() * 50) + 20,
            highestPackage: Math.floor(Math.random() * 100) + 50,
          });
          placementCount++;
        }
      }
    }
    console.log(`✅ Seeded ${placementCount} placement records`);

    console.log('\n🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
};

seed();
