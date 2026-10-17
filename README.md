# Dub-Sync — AI Video Dubbing Platform

Dub-Sync is an AI-powered video dubbing platform that automates speech transcription, translation, subtitle generation, and audio replacement.

## Repositories

- **Frontend:** This repository — Next.js, React, TypeScript, and Tailwind CSS.
- **Backend:** https://github.com/PioGodwin-M/Dub-Sync — Flask, Whisper, Hugging Face translation models, gTTS, and FFmpeg.

## Architecture

The frontend uploads a video and selected target language to the Flask API. The backend processes the video asynchronously, tracks job status, and returns the generated video when processing is complete.

## Deployment

The frontend was deployed using AWS Amplify, and the backend was deployed on an AWS EC2 instance. The backend is currently offline because of free-tier resource limitations.

## Project Status

The application has been implemented and previously deployed. Live processing is currently unavailable while the backend is offline.
