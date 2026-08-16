import joblib
import pandas as pd


MODEL_PATH = "models/risk_model.pkl"


def load_model():
    return joblib.load(MODEL_PATH)


def predict_risk(
    attendance_percentage,
    assignment_average,
    exam_score,
    previous_exam_score,
    study_hours,
    weak_subject_count
):
    model = load_model()

    input_data = pd.DataFrame([
        {
            "attendance_percentage": attendance_percentage,
            "assignment_average": assignment_average,
            "exam_score": exam_score,
            "previous_exam_score": previous_exam_score,
            "study_hours": study_hours,
            "weak_subject_count": weak_subject_count
        }
    ])

    prediction = model.predict(input_data)[0]

    probabilities = model.predict_proba(input_data)[0]

    class_probabilities = dict(
        zip(model.classes_, probabilities)
    )

    return {
        "predicted_risk": prediction,
        "probabilities": {
            key: round(float(value), 4)
            for key, value in class_probabilities.items()
        }
    }