from transformers import RobertaTokenizer, RobertaForSequenceClassification
import torch

class SentimentModel:
    def __init__(self, model_path="./models/sentiment-bert"):
        self.tokenizer = RobertaTokenizer.from_pretrained(model_path)
        self.model = RobertaForSequenceClassification.from_pretrained(model_path)
        self.model.eval()
        self.label_map = {0: "Negative", 1: "Neutral", 2: "Positive"}

    def predict(self, text: str):
        inputs = self.tokenizer(
            text,
            return_tensors="pt",
            truncation=True,
            padding=True,
            max_length=256
        )
        with torch.no_grad():
            outputs = self.model(**inputs)
            logits = outputs.logits
            probs = torch.softmax(logits, dim=1)[0]

            neutral_prob = probs[1].item()
            pred = torch.argmax(probs).item()

            if neutral_prob >= 0.2:
                pred = 1

        return {
            "label": self.label_map[pred],
            "confidence": {
                "Negative": round(probs[0].item() * 100, 2),
                "Neutral": round(probs[1].item() * 100, 2),
                "Positive": round(probs[2].item() * 100, 2),
            }
        }
