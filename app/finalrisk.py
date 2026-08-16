def calculate_final_risk(rule_risk, ml_risk, ml_probabilities):
    """
    Compare rule-based risk with ML prediction
    and generate a final risk decision.
    """

    rule_level = rule_risk.upper()
    ml_level = ml_risk.upper()

    # Both systems agree
    if rule_level == ml_level:
        final_level = rule_level
        confidence = "HIGH"

    # Systems disagree
    else:
        ml_confidence = ml_probabilities.get(ml_level, 0)

        if rule_level == "HIGH":
            final_level = "HIGH" if ml_confidence >= 0.50 else "MEDIUM"

        elif rule_level == "MEDIUM":
            if ml_level == "HIGH" and ml_confidence >= 0.60:
                final_level = "HIGH"
            elif ml_level == "LOW" and ml_confidence >= 0.60:
                final_level = "LOW"
            else:
                final_level = "MEDIUM"

        else:  # LOW
            if ml_level == "HIGH" and ml_confidence >= 0.60:
                final_level = "MEDIUM"
            else:
                final_level = "LOW"

        confidence = "MEDIUM"

    return {
        "rule_based_risk": rule_level,
        "ml_risk": ml_level,
        "final_risk": final_level,
        "decision_confidence": confidence
    }