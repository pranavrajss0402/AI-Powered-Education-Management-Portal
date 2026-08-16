import json
import os
from datetime import datetime


HISTORY_FILE = "data/intervention_history.json"


def _ensure_history_file():
    os.makedirs("data", exist_ok=True)

    if not os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, "w", encoding="utf-8") as file:
            json.dump([], file, indent=4)


def save_intervention(
    student_id,
    subject,
    intervention_type,
    action,
    status,
    score_change,
    attendance_change
):
    _ensure_history_file()

    with open(HISTORY_FILE, "r", encoding="utf-8") as file:
        history = json.load(file)

    record = {
        "student_id": student_id,
        "subject": subject,
        "intervention_type": intervention_type,
        "action": action,
        "status": status,
        "score_change": score_change,
        "attendance_change": attendance_change,
        "timestamp": datetime.now().isoformat()
    }

    history.append(record)

    with open(HISTORY_FILE, "w", encoding="utf-8") as file:
        json.dump(history, file, indent=4)

    return record


def get_student_intervention_history(student_id):
    _ensure_history_file()

    with open(HISTORY_FILE, "r", encoding="utf-8") as file:
        history = json.load(file)

    return [
        record
        for record in history
        if record["student_id"] == student_id
    ]