from flask import Flask, request, jsonify
from sentiment_model import SentimentModel
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Instantiate your model once
model = SentimentModel()  # No need to pass model_path unless you’re customizing it

@app.route("/predict", methods=["POST"])
def predict():
    print("📨 Received POST request")  # First log
    payload = request.get_json()
    print("📦 Payload content:", payload)  # Log the payload

    text = payload.get("review", "").strip()
    if not text:
        return jsonify({"error": "No text provided"}), 400

    print("🔍 Calling model.predict...")
    result = model.predict(text)
    print("✅ Prediction result:", result)

    return jsonify({
        "sentiment": result["label"],
        "confidence": result["confidence"]
    })


if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)

