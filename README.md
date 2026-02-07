# Stego

A modern, full-stack image steganography application that allows you to hide secret messages inside images using least significant bit (LSB) encoding. Messages can be optionally encrypted with password protection for added security.

## What is Steganography?

Steganography is the practice of concealing messages or information within other non-secret data. Unlike encryption (which scrambles data), steganography hides the very existence of the message. This application uses LSB (Least Significant Bit) steganography to embed text messages into image files in a way that's imperceptible to the human eye.

## Features

- **Hide Messages in Images**: Embed secret text messages into any image file (PNG, JPEG, etc.)
- **Extract Hidden Messages**: Decode and retrieve messages from encoded images
- **Optional Encryption**: Protect your messages with password-based encryption (Fernet/AES-128)
- **Configurable Encoding Density**: Adjust bits-per-pixel (1-8) to balance capacity vs. image quality
- **Capacity Validation**: Automatically checks if your message fits in the selected image
- **Modern UI**: Clean, responsive interface built with Material-UI
- **RESTful API**: Well-documented FastAPI backend for programmatic access

## How It Works

### LSB Steganography

The application modifies the least significant bits of image pixel values to store your message. Since these changes are minimal, they're invisible to the human eye but can be extracted by the decoder.

**Example**: To hide the letter 'A' (binary: 01000001):
- The 8 bits are distributed across pixel color channels (RGB)
- Each pixel's least significant bit is replaced with one bit from the message
- The image looks identical but now contains hidden data

### Optional Encryption

When you provide a password:
1. Your message is encrypted using Fernet (AES-128-CBC) with PBKDF2 key derivation (100,000 iterations)
2. The encrypted data is then embedded into the image
3. Only someone with the correct password can decrypt and read the message

## Technology Stack

### Backend (API)
- **FastAPI** - Modern Python web framework
- **Pillow** - Image processing and manipulation
- **cryptography** - Fernet encryption for message security
- **Pydantic** - Data validation and settings management
- **Uvicorn** - ASGI server

### Frontend (Client)
- **Next.js 16** - React framework with server-side rendering
- **React 19** - UI component library
- **TypeScript** - Type-safe JavaScript
- **Material-UI** - Professional UI components
- **Axios** - HTTP client for API communication

## Project Structure

```
Stego/
├── API/                    # Python FastAPI backend
│   ├── main.py            # Main application with encode/decode endpoints
│   ├── stego_utils.py     # Core steganography algorithms
│   ├── encryption.py      # Fernet encryption/decryption
│   ├── models.py          # Pydantic data models
│   ├── config.py          # Configuration management
│   └── requirements.txt   # Python dependencies
│
├── Client/                # Next.js/React TypeScript frontend
│   ├── pages/             # Application routes
│   ├── components/        # Reusable React components
│   ├── models/            # TypeScript interfaces
│   ├── services/          # API service layer
│   └── package.json       # Node dependencies
│
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 18+
- Yarn package manager

### Backend Setup

1. Navigate to the API directory:
```bash
cd API
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment variables (optional):
```bash
# .env.algorithm - Message boundary markers
PREFIX=~
SUFFIX=^

# .env.cors - CORS configuration
CLIENT_URL=http://localhost:3000
ALLOWED_METHODS=GET,POST

# .env.storage - File storage location
ROOT_DIRECTORY=./_data
```

4. Start the API server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the Client directory:
```bash
cd Client
```

2. Install Node dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn dev
```

The application will be available at `http://localhost:3000`

## Usage

### Encoding a Message

1. Navigate to the **Encode** page
2. Upload an image file
3. Enter your secret message
4. (Optional) Set a password for encryption
5. (Optional) Adjust bits-per-pixel for encoding density (1-8)
6. Click **Encode**
7. Download the encoded image

### Decoding a Message

1. Navigate to the **Decode** page
2. Upload an encoded image
3. (Optional) Enter the password if the message was encrypted
4. (Optional) Adjust bits-per-pixel to match encoding settings
5. Click **Decode**
6. View the extracted message

## API Endpoints

### Upload Image
```http
POST /upload
Content-Type: multipart/form-data

# Response
{
  "id": "uuid-string"
}
```

### Get Image
```http
GET /file/{file_id}

# Response: Image file
```

### Encode Message
```http
POST /encode
Content-Type: application/json

{
  "file_id": "uuid-string",
  "message": "Your secret message",
  "bits_per_pixel": 1,  // Optional: 1-8
  "secret": "password"  // Optional: For encryption
}

# Response
{
  "file_id": "uuid-string",
  "bits_changed": 1234
}
```

### Decode Message
```http
POST /decode
Content-Type: application/json

{
  "file_id": "uuid-string",
  "bits_per_pixel": 1,  // Optional: Must match encoding
  "secret": "password"  // Optional: If encrypted
}

# Response
{
  "message": "Your secret message"
}
```

## Configuration Options

### Bits Per Pixel
- **Range**: 1-8 bits
- **Lower values (1-2)**: Maximum image quality, less capacity
- **Higher values (6-8)**: More capacity, potential visible artifacts

### Security Considerations
- Always use encryption (provide a password) for sensitive messages
- The image itself is not encrypted - anyone can attempt to decode it
- Without the password, encrypted messages cannot be decrypted
- Avoid using common or weak passwords

## Example Use Cases

- **Secure Communication**: Send confidential information hidden in innocuous images
- **Digital Watermarking**: Embed copyright or ownership information in images
- **Puzzle Challenges**: Create treasure hunts or escape room challenges
- **Educational**: Learn about steganography and information hiding techniques

## License

MIT License - Copyright (c) 2022 Try at Software

## Author

Maintained by Tony Troeff

## Acknowledgments

- LSB steganography implementation inspired by classical information hiding techniques
- Encryption provided by the Python cryptography library (Fernet)
- UI components from Material-UI
