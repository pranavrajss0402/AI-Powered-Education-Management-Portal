def detect_weak_subject(subject):
    exam_score = subject["exam_score"]
    assignment_average = subject["assignment_average"]

    # Combined academic score
    academic_score = (
        (exam_score * 0.7) +
        (assignment_average * 0.3)
    )

    if academic_score < 50:
        level = "WEAK"
    elif academic_score < 65:
        level = "MODERATE"
    else:
        level = "GOOD"

    return {
        "subject": subject["subject"],
        "academic_score": round(academic_score, 2),
        "level": level
    }