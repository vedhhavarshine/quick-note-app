# Quick Note Application

A simple full-stack note-taking web application developed as part of my Workora Full-Stack Development Internship.

## Project Overview

The Quick Note Application allows users to create, view, and delete notes through a simple web interface. The application uses a Node.js and Express.js backend with a JSON file for data storage.

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- REST API
- Fetch API
- JSON

## Features

- Create new notes
- View all saved notes
- Delete existing notes
- Store notes using a JSON file
- RESTful API endpoints
- Asynchronous communication using Fetch API
- Responsive user interface

## REST API Endpoints

### GET /notes

Returns all saved notes.

### POST /notes

Creates a new note.

Example request:

{
  "text": "My first note"
}

### DELETE /notes/:id

Deletes a note using its unique ID.

## Data Storage

Notes are stored locally in the following file:

data/notes.json

## Project Structure

Quick-Note-App/
│
├── data/
│   └── notes.json
│
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js

## How to Run the Project

### Install Dependencies

Open the project folder in the terminal and run:

npm install

### Start the Server

Run:

node server.js

### Open the Application

Open the following address in a web browser:

http://localhost:3001

## Internship

Developed as part of the Workora Full-Stack Development Internship.

## Author

Vedhhavarshine B P