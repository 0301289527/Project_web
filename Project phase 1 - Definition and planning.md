# Project phase 1 - Definition and planning

## Pomodoro To-Do
Smart To-Do + Pomodoro Manager

## 1. User Personas

| User Roles  | Introduction | Behavioral habits | Technical Level | Target |
| :---:  |     :---:      |     :---:      |     :---:      |    :---:      |
| Normal User | Students, office workers, freelancers | Task management, focus on work, record completion  | Medium or low  | Improve efficiency and avoid delays  |
| Advanced users (optional) | Heavy task planner, efficiency expert | Multiple lists, tags, export data  | Medium or above  | Data visualization and refined management  |
| Administrator (optional, during development) | Product Maintainer | View error logs and user feedback  | Developers  | Maintenance project, backend management  |


## 2. Use Cases and User Flows

### Use Cases

| Nombers  | Cases | Describe |
|     :---:      |     :---:      |    :---:      |
| UC1 | User Register/Login | Support email login |
| UC2 | Create tasks | Enter the task name, set the priority, label, and deadline |
| UC3 | Start Pomodoro | Set the focus time (25 minutes/changeable), and automatically record the task status after the timer is reached |
| UC4 | Task accomplished | The user checks and completes, and the system records the timestamp |
| UC5 | Task Statistics | Display charts such as daily / weekly completion numbers, focus time, Pomodoro rounds, etc. |
| UC6 | Modify/Delete Task | Edit task name, deadline, tags, or delete the task |
| UC7 | Email reminder | Send email reminders of unfinished to-dos or reminders of to-dos for the next day |

### User Flows

#### Process 1: First time use / after logging in

[Home page] → [Login/Register] → [Task page] → Create tasks → Start Pomodoro

#### Process 2: Create tasks + Start Pomodoro

Click "New Task" → Fill in the information (name + tag + deadline) → The task card appears → Click "Start Focus" → Set the timer to 25 minutes (changeable) → A break reminder pops up → Check box to complete

#### Process 3: View Statistics

Click "Statistics Page" → View chart → Switch time range (Daily / Weekly / Monthly / Yearly)


## 3. UI Prototypes

🏠 Home (Dashboard)
Top: Logo + User Avatar

Left Navigation Bar:

    📋 My Tasks
    
    ⏱ Pomodoro
    
    📊 Statistics
    
    ⚙️ Settings

✅ Task Page

    “Add New Task” Button (Pop-up Window)

    Task List Area

    Task Card (Name + Label + Priority + Deadline)

    Check Box (Completed)

    “Start Pomodoro” Button

    Filter (Label, Priority, Completed)

⏱ Pomodoro Page

    Current Task Name
    
    Countdown in Large Text (25:00)
    
    Start / Pause / Reset


📊 Statistics Page

    Calendar / Chart Area
    
    Pomodoro Rounds
    
    Number of Completed Tasks
    
    Switchable Views (Daily, Weekly, Monthly)


## 4. Information Architecture and Technical Design

### Information Architecture

      - /
        - /login
        - /tasks
        - /pomodoro
        - /stats
        - /settings

### Technical Design

| Tiers | Technology |
|     :---:      |     :---:      |
| Frontend | React + Tailwind CSS (quickly build responsive UI) |
| State Management | Zustand (lightweight) or Redux (normalized) |
| Timer | Custom React hook (usePomodoroTimer) |
| Data storage | Local Storage or Firebase Firestore (Cloud Storage) |
| Backend | Node.js + Express / Firebase Functions |

### Data structure (schematic)

    // Task example
    {
    id: "abc123",
    name: "Review React",
    priority: "high",
    deadline: "2.3.2025",
    tags: ["Learning"],
    completed: false,
    pomodoroCount: 3
    }
    
    // User example
    {
    uid: "user_001",
    name: "123",
    email: "...",
    createdAt: "...",
    stats: {
    totalPomodoros: 120,
    completedTasks: 65
    }
    }


## 5. Project Management and User Testing

### Project Management

| Management | Task |
|     :---:      |     :---:      |
| 1. Planning stage | Clarify the function list, draw UI prototype, and determine the technical solution |
| 2. MVP Phase | Login + Add Task + Pomodoro + Local Storage |
| 3. Extended functionality | Tag classification + Chart statistics + Firebase data synchronization |
| 4. User Testing | Invite 2~3 people to try it out, record the operation path, and collect feedback |
| 5. Deployment and launch | One-click deployment using Netlify / Vercel |

### User Testing

#### Objective: Confirm whether adding tasks and operating the Pomodoro timer are smooth

##### User tasks:

- Create a new task

- Start a Pomodoro timer

- Check which tasks are completed in a day

##### Record observation points:

- Are there any unclear steps

- Are the buttons unclear

- Is the page responsive



