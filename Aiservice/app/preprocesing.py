def preprocess_student_data(student):
    """
    Preprocess student input.

    Accepts either:
    - Pydantic StudentInput object
    - dictionary produced by model_dump()
    """

    # Support dictionary input
    if isinstance(student, dict):
        student_id = student["student_id"]
        subjects = student["subjects"]
    else:
        # Support Pydantic object input
        student_id = student.student_id
        subjects = student.subjects

    processed_subjects = []

    for subject in subjects:

        # Convert Pydantic subject to dictionary if necessary
        if hasattr(subject, "model_dump"):
            subject_data = subject.model_dump()
        elif hasattr(subject, "dict"):
            subject_data = subject.dict()
        else:
            subject_data = subject

        processed_subjects.append({
            "subject": subject_data["subject"],
            "attendance_percentage": float(
                subject_data.get("attendance_percentage", 0)
            ),
            "assignment_average": float(
                subject_data.get("assignment_average", 0)
            ),
            "exam_score": float(
                subject_data.get("exam_score", 0)
            ),
            "previous_exam_score": float(
                subject_data.get("previous_exam_score", 0)
            ),
            "study_hours": float(
                subject_data.get("study_hours", 0)
            )
        })

    return {
        "student_id": student_id,
        "subjects": processed_subjects
    }