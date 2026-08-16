def evaluate_intervention(
    previous_score,
    current_score,
    previous_attendance,
    current_attendance
):
    score_change = current_score - previous_score
    attendance_change = current_attendance - previous_attendance

    improvements = []
    concerns = []

    # Academic performance
    if score_change >= 5:
        improvements.append(
            "Academic performance improved."
        )
    elif score_change < 0:
        concerns.append(
            "Academic performance declined."
        )

    # Attendance
    if attendance_change >= 5:
        improvements.append(
            "Attendance improved."
        )
    elif attendance_change < 0:
        concerns.append(
            "Attendance declined."
        )

    # Overall intervention evaluation
    if improvements and not concerns:
        status = "EFFECTIVE"

    elif improvements and concerns:
        status = "PARTIALLY_EFFECTIVE"

    else:
        status = "NOT_EFFECTIVE"

    return {
        "status": status,
        "score_change": round(score_change, 2),
        "attendance_change": round(attendance_change, 2),
        "improvements": improvements,
        "concerns": concerns
    }