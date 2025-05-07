# AskARabbi - Jewish Q&A Web Application

AskARabbi is a modern web application that provides Torah-based answers to Jewish questions. Built with Next.js and powered by AI, this application allows users to ask questions about Judaism and receive answers based on traditional Jewish sources.

## Features

- **Hebrew Interface**: Fully right-to-left (RTL) interface designed for Hebrew speakers
- **Source Selection**: Users can choose to include answers from Talmudic sources and modern rabbinic perspectives
- **AI-Powered Answers**: Leverages Groq's language models to generate accurate, respectful responses
- **Mobile Responsive**: Works seamlessly on both desktop and mobile devices
- **Dark/Light Mode**: Supports both dark and light themes

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn
- Groq API key (for production use)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/askarabbi.git
cd askarabbi
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your Groq API key:
```
GROQ_API_KEY=your_groq_api_key_here
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application

## Project Structure

```
askarabbi/
├── public/              # Static files
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── api/         # API routes
│   │   │   └── question/# Q&A endpoint
│   │   ├── layout.tsx   # Root layout with RTL support
│   │   ├── page.tsx     # Main application page
│   │   └── globals.css  # Global styles
│   └── utils/          
│       ├── config.ts    # Application configuration
│       └── groq.ts      # Groq API integration
├── .env.local           # Environment variables (not in git)
├── package.json         # Project dependencies
└── README.md           # This file
```

## Development

### API Integration

The application uses Groq's API to generate responses. In development mode, if no API key is provided, the application will use mock responses.

To enable real AI responses:
1. Obtain a Groq API key from [console.groq.com](https://console.groq.com)
2. Add it to your `.env.local` file
3. Restart the development server

### Customization

- Modify the system prompt in `src/utils/groq.ts` to adjust the AI's response style
- Update colors and styling in `src/app/globals.css`
- Add additional religious sources by extending the parser in `src/utils/groq.ts`

## Deployment

The application can be easily deployed to Vercel:

```bash
npm install -g vercel
vercel
```

## License

This project is licensed under the MIT License

## Disclaimer

This application is intended as a resource for Jewish learning and information. It is not a substitute for consulting with a Rabbi for complex or sensitive questions.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Groq](https://groq.com/)
- [Tailwind CSS](https://tailwindcss.com/)
