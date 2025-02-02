# Multilingual FAQ Management System

A robust backend system for managing FAQs with multi-language support, and efficient caching mechanisms.

## 🚀 Features

- Multilingual FAQ management with automatic translation support
- Redis-based caching for improved performance
- RESTful API with language selection
- MongoDB for data persistence

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Redis (v6 or higher)

## 🛠️ Installation

### Manual Installation

1. Clone the repository:
```bash
git clone [https://github.com/your-username/faq-system.git](https://github.com/Azharkoivila/Multilingual-Node-Js-FAQ-Management-System-Backend)
cd faq-system
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
DB_NAME=FAQS
DB_URL=mongodb://127.0.0.1:27017/
DEFAULT_FAQS=English
BENGALI_FAQS=Bengali
HINDI_FAQS=Hindi
```

4. Start MongoDB and Redis services

5. Run the application:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🔍 API Documentation

### Create FAQ
OR You can Use PostMan

```bash
curl -X POST http://localhost:3000/api/faqs/create/ -H "Content-Type: application/json"   -d '{"question": "What is this?", "answer": "This is a FAQ system"}'


Response:

[
    {
        "status": "fulfilled",
        "value": {
            "acknowledged": true,
            "insertedId": "679f98d4ee2a77cdd9dc6629"
        }
    },
    {
        "status": "fulfilled",
        "value": [
            "Hindi Transalation Compleated and SavedTO DB",
            "Bengali Transalation Compleated and SavedTO DB"
        ]
    }
]
```

### Get FAQs

```bash
GET /api/faqs?lang=<language_code>

Parameters:
- lang: Language code (en, hi, bn) [optional, defaults to 'en']

Response:
[
    {
        "_id": "679f971c8c6bff36ab613a7a",
        "question": "हैलो, कैसे मदद कर सकते हैं?",
        "answer": "मैं कुछ पानी चाहिए"
    }
]
```

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage
```


## ⚙️ Technical Details

- **Database**: MongoDB with Mongoose ODM
- **Caching**: Redis for improved performance
- **Translation**: Google Translate API

## 📈 Performance Considerations

- Redis caching reduces database load
- Automatic translation caching
- Efficient MongoDB indexing

