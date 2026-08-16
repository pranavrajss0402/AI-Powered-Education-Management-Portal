def analyze_root_causes(subject):
    attendance = subject["attendance_percentage"]
    assignment = subject["assignment_average"]
    exam = subject["exam_score"]
    previous_exam = subject["previous_exam_score"]

    root_causes = []

    # Attendance analysis
    if attendance < 60:
        root_causes.append({
            "factor": "Attendance",
            "status": "CRITICAL",
            "impact": "HIGH",
            "value": attendance,
            "explanation": "Attendance is significantly below the expected level."
        })
    elif attendance < 75:
        root_causes.append({
            "factor": "Attendance",
            "status": "NEEDS_IMPROVEMENT",
            "impact": "MEDIUM",
            "value": attendance,
            "explanation": "Attendance may be affecting academic consistency."
        })

    # Assignment analysis
    if assignment < 50:
        root_causes.append({
            "factor": "Assignments",
            "status": "CRITICAL",
            "impact": "HIGH",
            "value": assignment,
            "explanation": "Assignment performance is significantly below the expected level."
        })
    elif assignment < 65:
        root_causes.append({
            "factor": "Assignments",
            "status": "NEEDS_IMPROVEMENT",
            "impact": "MEDIUM",
            "value": assignment,
            "explanation": "Assignment performance needs improvement."
        })

    # Exam analysis
    if exam < 50:
        root_causes.append({
            "factor": "Exam Performance",
            "status": "CRITICAL",
            "impact": "HIGH",
            "value": exam,
            "explanation": "The current exam score indicates significant academic difficulty."
        })
    elif exam < 65:
        root_causes.append({
            "factor": "Exam Performance",
            "status": "NEEDS_IMPROVEMENT",
            "impact": "MEDIUM",
            "value": exam,
            "explanation": "The current exam score indicates room for improvement."
        })

    # Trend analysis
    score_change = exam - previous_exam

    if score_change < -5:
        root_causes.append({
            "factor": "Performance Trend",
            "status": "DECLINING",
            "impact": "HIGH",
            "value": round(score_change, 2),
            "explanation": "Current performance has declined compared with the previous assessment."
        })
    elif score_change > 5:
        root_causes.append({
            "factor": "Performance Trend",
            "status": "IMPROVING",
            "impact": "LOW",
            "value": round(score_change, 2),
            "explanation": "Performance has improved compared with the previous assessment."
        })

    return root_causes