# NEET Exam API Usage

## Overview
NEET exam data is used through the college predictor system in the application.

## Frontend Components

### 1. **ExamSelector Component** (`src/components/predictor/ExamSelector.tsx`)
- **Purpose**: UI component to select exam type
- **NEET Option**: 
  ```typescript
  { id: 'neet', name: 'NEET', fullName: 'Medical Entrance', icon: '🏥' }
  ```
- **Used in**: `src/pages/Index.tsx`
- **Flow**: User selects NEET exam → ID 'neet' is passed to prediction logic

### 2. **Index Page** (`src/pages/Index.tsx`)
- **State**: `selectedExam` = 'neet' (when NEET is selected)
- **Usage**: 
  ```typescript
  <ExamSelector selected={selectedExam} onSelect={setSelectedExam} />
  ```

### 3. **College Prediction** 
- **API Endpoint**: `POST /api/colleges/predict`
- **Request Body**:
  ```json
  {
    "rank": <number>,
    "category": "<category>",
    "examType": "neet"  // When NEET is selected
  }
  ```
- **Response**: Predicted colleges categorized as:
  - `safe`: Colleges with lower cutoffs
  - `likely`: Colleges matching rank
  - `competitive`: Colleges with higher cutoffs

## Backend API

### 1. **Colleges Controller** (`server/src/controllers/collegesController.ts`)
- **Function**: `predictColleges()`
- **Query Type**: 
  ```typescript
  const cutoffs = await Cutoff.find({ examType: examType.toLowerCase() })
  ```
- **For NEET**: 
  - Searches `cutoffs` collection where `examType: 'neet'`
  - Uses category-based cutoff comparison
  - Returns predicted colleges

### 2. **Routes** (`server/src/routes/colleges.ts`)
```typescript
router.post('/predict', predictColleges)
```

### 3. **MongoDB Collections**
- **Collection**: `cutoffs`
- **NEET Records**: Cutoff data for NEET across:
  - Multiple colleges
  - Different years (e.g., 2023, 2024)
  - Various categories (General, SC, ST, OBC)

## Data Flow for NEET

```
User Interface
    ↓
ExamSelector (NEET selected)
    ↓
ScoreInput (Enter rank/marks)
    ↓
POST /api/colleges/predict
    ├─ examType: 'neet'
    ├─ rank: <user_rank>
    └─ category: <user_category>
    ↓
Backend - collegesController.predictColleges()
    ├─ Fetch cutoffs where examType='neet'
    ├─ Compare user rank with college cutoffs
    └─ Categorize colleges
    ↓
Frontend - CollegeResults
    └─ Display safe/likely/competitive colleges
```

## Database Schema (MongoDB)

### Cutoffs Collection (Sample NEET Records)
```javascript
{
  _id: ObjectId,
  collegeId: ObjectId,
  examType: "neet",
  year: 2024,
  category: "General",
  cutoff: 600,  // NEET score cutoff
  createdAt: Date
}
```

### Total NEET Cutoff Records
- Seeded with ~302 total cutoff records across JEE/NEET/CUET
- NEET records include cutoffs for multiple colleges and categories

## API Endpoints Related to NEET

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/colleges` | GET | Get all colleges (filterable) |
| `/api/colleges/predict` | POST | Predict colleges for NEET rank |
| `/api/colleges/:id` | GET | Get specific college with NEET cutoffs |
| `/api/exams` | GET | Get exam list (includes NEET UG 2025) |

## Status of Exams Controller

⚠️ **Note**: The `examsController.ts` is still using SQLite (old database).
It needs to be updated to MongoDB to fully support NEET exam data retrieval.

To update it, use:
```typescript
import { Exam } from '../models/index';

export const getAllExams = async (req: Request, res: Response) => {
  try {
    const { type } = req.query;
    
    let query = Exam.find();
    if (type) {
      query = query.find({ examTypes: type });
    }
    
    const exams = await query.sort({ dates: 1 });
    res.json({ exams });
  } catch (error) {
    console.error('Get exams error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
```

## Summary
**NEET is being used through**:
1. **Frontend**: ExamSelector component (UI selection)
2. **API**: `/api/colleges/predict` endpoint (main prediction)
3. **Backend**: collegesController.predictColleges() (logic)
4. **Database**: MongoDB cutoffs collection (data storage)
