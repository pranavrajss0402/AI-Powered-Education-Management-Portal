def analyze_performance(subject):
    current_score = subject["exam_score"]
    previous_score = subject["previous_exam_score"]

    change = current_score - previous_score

    if change > 5:
        trend = "IMPROVING"
    elif change < -5:
        trend = "DECLINING"
    else:
        trend = "STABLE"

    return {
        "subject": subject["subject"],
        "current_score": current_score,
        "previous_score": previous_score,
        "score_change": round(change, 2),
        "trend": trend
    }