import express from 'express';
import Sentiment from '../models/sentimentModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { review, label, confidence } = req.body;

    const newEntry = new Sentiment({
      review,
      label,
      confidence,
    });

    await newEntry.save();
    console.log('✅ Saved:', newEntry);

    res.status(201).json({ message: 'Sentiment saved successfully' });
  } catch (err) {
    console.error('❌ Error saving sentiment:', err);
    res.status(500).json({ error: 'Failed to save sentiment' });
  }
});

router.get('/', async (req, res) => {
  try {
    const sentiments = await Sentiment.find().sort({ createdAt: -1 });
    res.json(sentiments);
  } catch (err) {
    console.error('❌ Error fetching sentiments:', err);
    res.status(500).json({ error: 'Failed to fetch sentiments' });
  }
});

export default router;
