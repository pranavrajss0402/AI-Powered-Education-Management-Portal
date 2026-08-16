def generate_teacher_interventions(subject):
    interventions = []

    attendance = subject["attendance_percentage"]
    assignment = subject["assignment_average"]
    exam = subject["exam_score"]
    previous_exam = subject["previous_exam_score"]

    # Attendance intervention
    if attendance < 60:
        interventions.append({
            "type": "ATTENDANCE",
            "priority": "HIGH",
            "action": "Monitor attendance and discuss the attendance issue with the student."
        })
    elif attendance < 75:
        interventions.append({
            "type": "ATTENDANCE",
            "priority": "MEDIUM",
            "action": "Encourage the student to improve class attendance."
        })

    # Assignment intervention
    if assignment < 50:
        interventions.append({
            "type": "ASSIGNMENTS",
            "priority": "HIGH",
            "action": "Review missing or weak assignments and provide additional academic guidance."
        })
    elif assignment < 65:
        interventions.append({
            "type": "ASSIGNMENTS",
            "priority": "MEDIUM",
            "action": "Monitor assignment completion and provide feedback."
        })

    # Exam intervention
    if exam < 50:
        interventions.append({
            "type": "ACADEMIC_SUPPORT",
            "priority": "HIGH",
            "action": "Provide additional support for difficult topics and review the student's exam mistakes."
        })
    elif exam < 65:
        interventions.append({
            "type": "ACADEMIC_SUPPORT",
            "priority": "MEDIUM",
            "action": "Monitor the student's preparation and provide targeted revision support."
        })

    # Declining performance intervention
    if exam < previous_exam - 5:
        interventions.append({
            "type": "PERFORMANCE_MONITORING",
            "priority": "HIGH",
            "action": "Monitor the next assessment closely because the student's performance is declining."
        })

    # No intervention required
    if not interventions:
        interventions.append({
            "type": "MONITORING",
            "priority": "LOW",
            "action": "Continue regular monitoring and maintain the student's current academic progress."
        })

    return interventions