from .preprocesing import preprocess_student_data
from .performance import analyze_performance
from .Weaksubject import detect_weak_subject
from .risk import calculate_risk
from .recomdations import generate_recommendations
from .rootcause import analyze_root_causes
from .teacherintervention import generate_teacher_interventions
from .mlpredict import predict_risk
from .finalrisk import calculate_final_risk


def analyze_student(student):
    processed_data = preprocess_student_data(student)

    subject_results = []

    for subject in processed_data["subjects"]:

        # ==========================================
        # Rule-based analysis
        # ==========================================

        performance = analyze_performance(subject)

        weak_subject = detect_weak_subject(subject)

        risk = calculate_risk(subject)

        root_causes = analyze_root_causes(subject)

        recommendations = generate_recommendations(subject)

        teacher_interventions = generate_teacher_interventions(subject)

        # ==========================================
        # ML prediction
        # ==========================================

        ml_prediction = predict_risk(
            attendance_percentage=subject["attendance_percentage"],
            assignment_average=subject["assignment_average"],
            exam_score=subject["exam_score"],
            previous_exam_score=subject["previous_exam_score"],
            study_hours=subject.get("study_hours", 0),
            weak_subject_count=(
                1 if weak_subject["level"] == "WEAK" else 0
            )
        )

        # ==========================================
        # Final subject-level risk
        # Compare rule-based risk with ML risk
        # ==========================================

        finalrisk = calculate_final_risk(
            rule_risk=risk["risk_level"],
            ml_risk=ml_prediction["predicted_risk"],
            ml_probabilities=ml_prediction["probabilities"]
        )

        # ==========================================
        # Store subject result
        # ==========================================

        subject_results.append({
            "subject": subject["subject"],
            "performance": performance,
            "weak_subject": weak_subject,
            "risk": risk,
            "ml_prediction": ml_prediction,
            "final_risk": finalrisk,
            "root_causes": root_causes,
            "recommendations": recommendations,
            "teacher_interventions": teacher_interventions
        })

    # ==========================================
    # Overall numerical risk score
    # ==========================================

    risk_scores = [
        result["risk"]["risk_score"]
        for result in subject_results
    ]

    if risk_scores:
        average_risk_score = sum(risk_scores) / len(risk_scores)

        highest_risk_score = max(risk_scores)

        overall_risk_score = round(
            (highest_risk_score * 0.7) +
            (average_risk_score * 0.3),
            2
        )

    else:
        overall_risk_score = 0

    # ==========================================
    # Overall rule-based risk level
    # ==========================================

    if overall_risk_score >= 60:
        overall_risk_level = "HIGH"

    elif overall_risk_score >= 30:
        overall_risk_level = "MEDIUM"

    else:
        overall_risk_level = "LOW"

    # ==========================================
    # Overall final risk
    # Based on subject-level final risk
    # ==========================================

    final_risk_levels = [
        result["final_risk"]["final_risk"]
        for result in subject_results
    ]

    if "HIGH" in final_risk_levels:
        overall_final_risk = "HIGH"

    elif "MEDIUM" in final_risk_levels:
        overall_final_risk = "MEDIUM"

    else:
        overall_final_risk = "LOW"

    # ==========================================
    # Weak subjects
    # ==========================================

    weak_subjects = [
        result["subject"]
        for result in subject_results
        if result["weak_subject"]["level"] == "WEAK"
    ]

    # ==========================================
    # Final response
    # ==========================================

    return {
        "student_id": processed_data["student_id"],

        "overall_risk": {
            "score": overall_risk_score,
            "level": overall_risk_level,
            "final_level": overall_final_risk
        },

        "weak_subjects": weak_subjects,

        "subjects": subject_results
    }