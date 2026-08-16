from pydantic import BaseModel
from typing import List


class SubjectInput(BaseModel):
    subject: str
    attendance_percentage: float
    assignment_average: float
    exam_score: float
    previous_exam_score: float
    study_hours: float = 0


class StudentInput(BaseModel):
    student_id: int
    subjects: List[SubjectInput]


class StudentAcademicData(BaseModel):
    student_id: int
    subjects: List[SubjectInput]