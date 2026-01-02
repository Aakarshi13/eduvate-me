import mongoose from 'mongoose';

// User Schema
export const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  name: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const User = mongoose.model('User', userSchema);

// College Schema
export const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  location: { type: String, required: true },
  state: { type: String, required: true },
  type: { type: String, required: true },
  ranking: Number,
  fees: Number,
  avgPackage: Number,
  highestPackage: Number,
  placementRate: Number,
  topRecruiters: [String],
  facilities: [String],
  courses: [String],
  established: Number,
  accreditation: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
});

export const College = mongoose.model('College', collegeSchema);

// Cutoff Schema
export const cutoffSchema = new mongoose.Schema({
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
  examType: { type: String, required: true }, // 'jee', 'neet', 'cuet'
  year: { type: Number, required: true },
  general: Number,
  obc: Number,
  sc: Number,
  st: Number,
  ews: Number,
});

cutoffSchema.index({ collegeId: 1, examType: 1, year: -1 });

export const Cutoff = mongoose.model('Cutoff', cutoffSchema);

// Exam Schema
export const examSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fullName: { type: String, required: true },
  date: Date,
  resultDate: Date,
  counsellingStart: Date,
  counsellingEnd: Date,
  type: { type: String, required: true },
  registrationDeadline: Date,
  createdAt: { type: Date, default: Date.now },
});

export const Exam = mongoose.model('Exam', examSchema);

// Scholarship Schema
export const scholarshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  provider: { type: String, required: true },
  amount: { type: Number, required: true },
  eligibility: { type: String, required: true },
  deadline: Date,
  category: String,
  examTypes: [String],
  createdAt: { type: Date, default: Date.now },
});

export const Scholarship = mongoose.model('Scholarship', scholarshipSchema);

// Hostel Schema
export const hostelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  nearbyColleges: [String],
  distance: Number,
  rent: Number,
  amenities: [String],
  gender: String,
  rating: Number,
  reviews: { type: Number, default: 0 },
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
});

export const Hostel = mongoose.model('Hostel', hostelSchema);

// Placement Schema
export const placementSchema = new mongoose.Schema({
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
  year: { type: Number, required: true },
  sector: String,
  company: String,
  offers: Number,
  avgPackage: Number,
  highestPackage: Number,
});

placementSchema.index({ collegeId: 1, year: -1 });

export const Placement = mongoose.model('Placement', placementSchema);
