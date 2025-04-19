from flask import Flask, request, jsonify
from sentiment_model import SentimentModel
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Instantiate the model once
model = SentimentModel()

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        review_text = data.get("review", "").strip()

        if not review_text:
            return jsonify({"error": "No review provided"}), 400

        print("📨 Received POST request")
        print("📦 Payload content:", data)

        # Get prediction from the model
        prediction = model.predict(review_text)
        print("✅ Prediction result:", prediction)

        # Prepare payload for backend (Node/Mongo)
        backend_payload = {
            "review": review_text,
            "label": prediction["label"],
            "confidence": prediction["confidence"]
        }

        # try:
        #     response = requests.post("http://localhost:5015/api/sentiments", json=backend_payload)
        #     print(f"📡 Sent to backend: {response.status_code} - {response.text}")
        # except Exception as post_err:
        #     print(f"❌ Error sending to backend: {post_err}")

        return jsonify(prediction)

    except Exception as e:
        print(f"❌ Internal server error: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)







# from flask import Flask, request, jsonify
# from sentiment_model import SentimentModel
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # Instantiate your model once
# model = SentimentModel()  # No need to pass model_path unless you’re customizing it

# @app.route("/predict", methods=["POST"])
# def predict():
#     print("📨 Received POST request")  # First log
#     payload = request.get_json()
#     print("📦 Payload content:", payload)  # Log the payload

#     text = payload.get("review", "").strip()
#     if not text:
#         return jsonify({"error": "No text provided"}), 400

#     print("🔍 Calling model.predict...")
#     result = model.predict(text)
#     print("✅ Prediction result:", result)

#     return jsonify({
#         "sentiment": result["label"],
#         "confidence": result["confidence"]
#     })


# if __name__ == "__main__":
#     app.run(debug=True, use_reloader=False)

