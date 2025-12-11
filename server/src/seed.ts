import { db, initDatabase } from './config/database';
import { colleges, exams, scholarships, pgHostels, placementData } from './seedData';

const seed = () => {
  console.log('🌱 Starting database seeding...');

  // Initialize database
  initDatabase();

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  db.exec('DELETE FROM placements');
  db.exec('DELETE FROM cutoffs');
  db.exec('DELETE FROM hostels');
  db.exec('DELETE FROM scholarships');
  db.exec('DELETE FROM exams');
  db.exec('DELETE FROM colleges');
  db.exec('DELETE FROM users');

  // Seed colleges
  console.log('📚 Seeding colleges...');
  const insertCollege = db.prepare(`
    INSERT INTO colleges (
      name, short_name, location, state, type, ranking, fees, 
      avg_package, highest_package, placement_rate, top_recruiters, 
      facilities, courses, established, accreditation, image_url
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertCutoff = db.prepare(`
    INSERT INTO cutoffs (college_id, exam_type, year, general, obc, sc, st, ews)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  colleges.forEach((college) => {
    const result = insertCollege.run(
      college.name,
      college.shortName,
      college.location,
      college.state,
      college.type,
      college.ranking,
      college.fees,
      college.avgPackage,
      college.highestPackage,
      college.placementRate,
      JSON.stringify(college.topRecruiters),
      JSON.stringify(college.facilities),
      JSON.stringify(college.courses),
      college.established,
      college.accreditation,
      college.imageUrl || null
    );

    const collegeId = result.lastInsertRowid;

    // Insert cutoffs
    if (college.cutoffs.jee) {
      college.cutoffs.jee.forEach((cutoff) => {
        insertCutoff.run(
          collegeId,
          'jee',
          cutoff.year,
          cutoff.general,
          cutoff.obc,
          cutoff.sc,
          cutoff.st,
          cutoff.ews || null
        );
      });
    }

    if (college.cutoffs.neet) {
      college.cutoffs.neet.forEach((cutoff) => {
        insertCutoff.run(
          collegeId,
          'neet',
          cutoff.year,
          cutoff.general,
          cutoff.obc,
          cutoff.sc,
          cutoff.st,
          cutoff.ews || null
        );
      });
    }

    if (college.cutoffs.cuet) {
      college.cutoffs.cuet.forEach((cutoff) => {
        insertCutoff.run(
          collegeId,
          'cuet',
          cutoff.year,
          cutoff.general,
          cutoff.obc,
          cutoff.sc,
          cutoff.st,
          cutoff.ews || null
        );
      });
    }
  });

  console.log(`✅ Seeded ${colleges.length} colleges`);

  // Seed exams
  console.log('📝 Seeding exams...');
  const insertExam = db.prepare(`
    INSERT INTO exams (name, full_name, date, result_date, counselling_start, counselling_end, type, registration_deadline)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  exams.forEach((exam) => {
    insertExam.run(
      exam.name,
      exam.fullName,
      exam.date,
      exam.resultDate,
      exam.counsellingStart,
      exam.counsellingEnd,
      exam.type,
      exam.registrationDeadline
    );
  });

  console.log(`✅ Seeded ${exams.length} exams`);

  // Seed scholarships
  console.log('🎓 Seeding scholarships...');
  const insertScholarship = db.prepare(`
    INSERT INTO scholarships (name, provider, amount, eligibility, deadline, category, exam_types)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  scholarships.forEach((scholarship) => {
    insertScholarship.run(
      scholarship.name,
      scholarship.provider,
      scholarship.amount,
      scholarship.eligibility,
      scholarship.deadline,
      scholarship.category,
      JSON.stringify(scholarship.examType)
    );
  });

  console.log(`✅ Seeded ${scholarships.length} scholarships`);

  // Seed hostels
  console.log('🏠 Seeding hostels...');
  const insertHostel = db.prepare(`
    INSERT INTO hostels (name, type, location, nearby_colleges, distance, rent, amenities, gender, rating, reviews, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  pgHostels.forEach((hostel) => {
    insertHostel.run(
      hostel.name,
      hostel.type,
      hostel.location,
      JSON.stringify(hostel.nearbyColleges),
      hostel.distance,
      hostel.rent,
      JSON.stringify(hostel.amenities),
      hostel.gender,
      hostel.rating,
      hostel.reviews,
      hostel.imageUrl || null
    );
  });

  console.log(`✅ Seeded ${pgHostels.length} hostels`);

  // Seed placement data
  console.log('💼 Seeding placement data...');
  const insertPlacement = db.prepare(`
    INSERT INTO placements (college_id, year, sector, company, offers, avg_package, highest_package)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  // Get all college IDs
  const allColleges = db.prepare('SELECT id, type FROM colleges').all() as any[];

  // Seed placements for top recruiters
  placementData.topRecruiters.forEach((recruiter) => {
    const randomColleges = allColleges
      .filter((c) => c.type === 'IIT' || c.type === 'NIT')
      .slice(0, 10);

    randomColleges.forEach((college) => {
      insertPlacement.run(
        college.id,
        2024,
        'IT/Software',
        recruiter.name,
        recruiter.offers / 10,
        recruiter.avgPackage * 100000,
        recruiter.avgPackage * 150000
      );
    });
  });

  // Seed sector-wise placements
  const sectors = ['IT/Software', 'Finance', 'Consulting', 'Core Engineering', 'Others'];
  allColleges.forEach((college) => {
    sectors.forEach((sector) => {
      insertPlacement.run(
        college.id,
        2024,
        sector,
        `${sector} Company`,
        Math.floor(Math.random() * 50) + 10,
        (Math.random() * 20 + 10) * 100000,
        (Math.random() * 40 + 20) * 100000
      );
    });
  });

  console.log(`✅ Seeded placement data`);

  console.log('🎉 Database seeding completed successfully!');
  process.exit(0);
};

seed();
