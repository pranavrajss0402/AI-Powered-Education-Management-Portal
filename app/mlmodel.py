import os
import joblib

from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

from .mlfeatures import load_training_data, prepare_features


MODEL_PATH = "models/risk_model.pkl"


def train_model():

    # ==========================================
    # Load dataset
    # ==========================================

    df = load_training_data()

    print("Dataset loaded successfully.")
    print("Dataset shape:", df.shape)

    # ==========================================
    # Prepare features and target
    # ==========================================

    X, y = prepare_features(df)

    print("\nFeatures:")
    print(X.columns.tolist())

    print("\nTarget distribution:")
    print(y.value_counts())

    # ==========================================
    # Split dataset
    # ==========================================

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )

    print("\nTraining samples:", len(X_train))
    print("Testing samples:", len(X_test))

    # ==========================================
    # Create Random Forest model
    # ==========================================

    model = RandomForestClassifier(
        n_estimators=100,
        random_state=42
    )

    # ==========================================
    # Train model
    # ==========================================

    model.fit(X_train, y_train)

    print("\nModel training completed.")

    # ==========================================
    # Test predictions
    # ==========================================

    predictions = model.predict(X_test)

    # ==========================================
    # Accuracy
    # ==========================================

    accuracy = accuracy_score(y_test, predictions)

    print("\n==========================================")
    print("MODEL ACCURACY")
    print("==========================================")

    print("Accuracy:", round(accuracy, 4))

    # ==========================================
    # Classification Report
    # ==========================================

    print("\n==========================================")
    print("CLASSIFICATION REPORT")
    print("==========================================")

    print(
        classification_report(
            y_test,
            predictions,
            zero_division=0
        )
    )

    # ==========================================
    # Confusion Matrix
    # ==========================================

    print("\n==========================================")
    print("CONFUSION MATRIX")
    print("==========================================")

    cm = confusion_matrix(y_test, predictions)

    print(cm)

    # ==========================================
    # Cross Validation
    # ==========================================

    print("\n==========================================")
    print("5-FOLD CROSS VALIDATION")
    print("==========================================")

    cv_scores = cross_val_score(
        model,
        X,
        y,
        cv=5,
        scoring="accuracy"
    )

    print("CV Scores:", cv_scores)

    print(
        "Mean CV Accuracy:",
        round(cv_scores.mean(), 4)
    )

    print(
        "CV Standard Deviation:",
        round(cv_scores.std(), 4)
    )

    # ==========================================
    # Feature Importance
    # ==========================================

    print("\n==========================================")
    print("FEATURE IMPORTANCE")
    print("==========================================")

    feature_importance = sorted(
        zip(
            X.columns,
            model.feature_importances_
        ),
        key=lambda x: x[1],
        reverse=True
    )

    for feature, importance in feature_importance:

        print(
            f"{feature}: {importance:.4f}"
        )

    # ==========================================
    # Create models directory
    # ==========================================

    os.makedirs(
        "models",
        exist_ok=True
    )

    # ==========================================
    # Save trained model
    # ==========================================

    joblib.dump(
        model,
        MODEL_PATH
    )

    print("\n==========================================")
    print("MODEL SAVED")
    print("==========================================")

    print(
        f"Model saved to: {MODEL_PATH}"
    )

    return model


if __name__ == "__main__":
    train_model()