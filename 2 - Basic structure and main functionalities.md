# Project phase 2 - Basic structure and main functionalities


## 1. Environment

### Technology stack

    Backend: Node.js + Express
    
    Frontend: React + Vite + Tailwind CSS
    
    Database: PostgreSQL + Sequelize ORM
    
    Test framework: Jest (backend) and React Testing Library (frontend)

### Development tools

    IDE: VS Code
    
    Package management tools: npm or yarn
    
    Version control: Git + GitHub
    
    Deployment: Heroku (backend) + Netlify/Vercel (frontend)
    
    Environment management: dotenv (for loading environment variables)

## 2. Backend (Node.js + Express)

### Example project structure

    /server
    ├── src/
    │ ├── routes/          // API routing
    │ ├── controllers/     // logic processing
    │ ├── services/        // data services
    │ ├── models/          // Prisma schema
    │ ├── middlewares/     // JWT, log
    │ └── utils/           // utility functions
    ├── .env
    ├── app.js
    └── prisma/
    ├── schema.prisma


## 3. Frontend (React + Zustand)

### Example project structure

    /client
      ├── src/
      │   ├── pages/
      │   ├── components/
      │   ├── hooks/
      │   ├── store/
      │   ├── api/
      │   └── styles/


## 4. Database (PostgreSQL)

### Prisma + PostgreSQL:

    model User {
      id        Int      @id @default(autoincrement())
      email     String   @unique
      password  String
      tasks     Task[]
      sessions  Pomodoro[]
    }
    
    model Task {
      id          Int      @id @default(autoincrement())
      userId      Int
      title       String
      description String?
      priority    String
      dueDate     DateTime?
      completed   Boolean  @default(false)
      createdAt   DateTime @default(now())
      user        User     @relation(fields: [userId], references: [id])
    }
    
    model Pomodoro {
      id        Int      @id @default(autoincrement())
      userId    Int
      taskId    Int?
      startTime DateTime
      endTime   DateTime?
      duration  Int
      status    String    // 'completed' | 'interrupted'
      user      User      @relation(fields: [userId], references: [id])
      task      Task?     @relation(fields: [taskId], references: [id])
    }


## 5. Basic structure and architecture

### Architecture Design
    MVC Mode (Model-View-Controller):
    
    Model: Database interaction (Sequelize).
    
    Controller: Business logic.
    
    View: Front-end components

## 6. Functionalities (Stage MVP)

### User functions
    Register / Login (JWT)
    
    Change password / Logout

### Task functions
    Create new tasks (title, priority, deadline, tag)
    
    View task list (filter by status)
    
    Edit / delete tasks
    
    Mark tasks as completed

### Pomodoro function
    Start Pomodoro (countdown)
    
    Record duration after completion

### Statistics function
    Display daily / weekly Pomodoro rounds
    
    Display completed task count chart

## 7. Code quality and documentation

### Code quality

ESLint + Prettier automatic formatting

### Documentation

- Generate documentation using JSDoc comments.
- The README file should contain:
  - Project overview
  - Technology stack
  - Installation and running instructions

## 8. Testing and error handling

### Testing

- Unit testing:
  - Backend: Jest to test API routes
  - Frontend: React Testing Library to test components
- Integration testing:
  - Test frontend and backend connectivity
  - Test database queries
- Error handling
  - Global error catching middleware (Express).
  - User-friendly error prompts.

## 9. User interface and interaction

### Basic requirements

- Simple and intuitive task management interface.
- Clear buttons and guidance copy.
- Dynamic prompts (task success/failure, timer end
- Smooth operation: loading status/success prompt/error prompt

### Interaction details

- Pomodoro timer:
  - When the countdown is completed, a pop-up window or sound prompt.

- Task management:

  - Dynamic task list, support drag and drop sorting.

  - Automatically refresh after creating a task.

### User experience optimization

- Responsive layout: adapt to desktop and mobile terminals.

- Animation effect: use Framer Motion to make the interface more vivid.
