import pandas as pd


FEATURE_COLUMNS = [
    "attendance_percentage",
    "assignment_average",
    "exam_score",
    "previous_exam_score",
    "study_hours",
    "weak_subject_count"
]

TARGET_COLUMN = "risk_level"


def load_training_data(file_path="data/studenthistory.csv"):
    df = pd.read_csv(file_path)
    return df


def prepare_features(df):
    X = df[FEATURE_COLUMNS]
    y = df[TARGET_COLUMN]

    return X, y