# AI Study Assistant

AI Study Assistant is a study management web application that I built as a personal programming project.

I wanted to create something more useful than a simple practice website, so I combined several features into one application. The current version allows users to manage vocabulary, practice quizzes, track study time, set daily goals, and view their learning progress.

This project is also part of my journey of learning web development and improving my programming skills.

---

## About the Project

I started this project to practice JavaScript and learn how different parts of a web application work together.

Instead of creating separate small projects for a vocabulary list, quiz, timer, and progress tracker, I decided to combine them into one study application.

The current version mainly focuses on the frontend. Data is stored locally in the browser using LocalStorage.

I plan to continue developing the project by adding a Python backend, database support, and eventually AI-based features.

---

## Features

### Dashboard

The dashboard gives the user a quick overview of their study activity.

It includes:

- Overall progress
- Vocabulary count
- Completed quizzes
- Total study time
- Study streak
- Daily goals
- Recent activity
- Daily motivation

The dashboard is designed to make the most important information visible without requiring the user to open different pages.

---

### Vocabulary Manager

The vocabulary section allows users to build their own vocabulary list.

Users can:

- Add a new word
- Add the meaning of the word
- View saved vocabulary
- Delete words
- See the current vocabulary count

The application also saves vocabulary using LocalStorage, so the data is not lost when the page is refreshed.

Some example words included in the project are:

- establish
- distinct
- consecutive
- regulate
- implication

These are useful for English and IELTS preparation.

---

### Vocabulary Quiz

The project includes a simple multiple-choice vocabulary quiz.

The quiz provides:

- Multiple answer choices
- Correct answer detection
- Incorrect answer feedback
- Score calculation
- Completed quiz tracking

The quiz is connected to the progress section, so completing a quiz can contribute to the user's study statistics.

---

### Study Timer

The application includes a 25-minute study timer.

The timer can be:

- Started
- Paused
- Reset

I added this feature because focused study sessions are an important part of my own study routine.

The application also keeps track of study time.

There are keyboard shortcuts for making the timer easier to use:

- `Space` — Start / Pause
- `Escape` — Pause

---

### Daily Goals

The dashboard contains daily study goals.

Users can mark goals as completed and see their progress.

For example:

- Learn new vocabulary
- Complete a quiz
- Study for a certain amount of time
- Review previous material

The progress percentage changes when goals are completed.

---

### Progress Tracking

The progress section provides a simple overview of study activity.

It includes:

- Weekly progress
- Study time
- Quiz activity
- Vocabulary progress
- Study streak

The goal is to make studying more measurable and help users see their progress over time.

---

### Dark Mode

The application supports both light mode and dark mode.

The selected theme is saved using LocalStorage, so the user's preference remains after refreshing the page.

---

## Technologies

The current version uses:

### HTML5

Used to create the structure of the application.

### CSS3

Used for:

- Layout
- Responsive design
- Cards
- Buttons
- Navigation
- Dark mode
- Progress components
- Animations and visual effects

### JavaScript

JavaScript is used for most of the application's functionality.

For example:

- Navigation
- Vocabulary management
- Quiz logic
- Timer
- Progress calculation
- Dark mode
- LocalStorage
- User interactions

### LocalStorage

LocalStorage is currently used to store data directly in the browser.

This includes:

- Vocabulary
- Quiz statistics
- Study time
- Theme preference
- Progress information

---

## Project Structure

```text
AI-Study-Assistant/
│
├── index.html
├── style.css
├── script.js
└── README.md
