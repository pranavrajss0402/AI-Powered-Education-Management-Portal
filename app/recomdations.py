def generate_recommendations(subject):
    recommendations = []

    attendance = subject["attendance_percentage"]
    assignment = subject["assignment_average"]
    exam = subject["exam_score"]
    previous_exam = subject["previous_exam_score"]

    # Attendance recommendation
    if attendance < 60:
        recommendations.append(
            "Improve attendance and attend upcoming classes regularly."
        )
    elif attendance < 75:
        recommendations.append(
            "Maintain better attendance to support academic performance."
        )

    # Assignment recommendation
    if assignment < 50:
        recommendations.append(
            "Complete pending assignments and improve assignment performance."
        )
    elif assignment < 65:
        recommendations.append(
            "Improve assignment consistency and submission quality."
        )

    # Exam recommendation
    if exam < 50:
        recommendations.append(
            "Focus on revision and practice questions for this subject."
        )
    elif exam < 65:
        recommendations.append(
            "Increase exam preparation and practice regularly."
        )

    # Performance trend recommendation
    if exam < previous_exam:
        recommendations.append(
            "Monitor the declining performance and review weak topics."
        )

    # General recommendation
    if not recommendations:
        recommendations.append(
            "Continue the current study strategy and maintain consistent performance."
        )

    return recommendations