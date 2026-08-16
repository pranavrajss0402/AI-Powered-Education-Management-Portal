def calculate_risk(subject):
    attendance = subject["attendance_percentage"]
    assignment = subject["assignment_average"]
    exam = subject["exam_score"]
    previous_exam = subject["previous_exam_score"]

    risk_score = 0
    reasons = []

    # Attendance
    if attendance < 60:
        risk_score += 30
        reasons.append("Low attendance")
    elif attendance < 75:
        risk_score += 15
        reasons.append("Attendance needs improvement")

    # Assignment performance
    if assignment < 50:
        risk_score += 25
        reasons.append("Low assignment performance")
    elif assignment < 65:
        risk_score += 10
        reasons.append("Moderate assignment performance")

    # Current exam performance
    if exam < 50:
        risk_score += 30
        reasons.append("Low exam performance")
    elif exam < 65:
        risk_score += 15
        reasons.append("Moderate exam performance")

    # Performance trend
    if exam < previous_exam:
        risk_score += 15
        reasons.append("Performance is declining")

    # Risk classification
    if risk_score >= 60:
        risk_level = "HIGH"
    elif risk_score >= 30:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    return {
        "subject": subject["subject"],
        "risk_score": risk_score,
        "risk_level": risk_level,
        "reasons": reasons
    }