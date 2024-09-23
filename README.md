# TaskManager

## Technologies Used

### Frontend

1. ReactJS -  Functional Components for the frontend pages. Used usestate and useeffect react hooks . 
2. React Router Dom for  page navigation
3. notistack- for messages to be displayed.
4. mdb-react-ui-kit- Free Material design UI to improve the look and feel of the buttons,grids and text fields.
5. Implemented Material UI for dropdown design and date picker
6. Implemented sorting of tasks by due date and proirity.
7. Displayed Completed tasks and Inprogress tasks in separate tables 

To run the front end application -
1. open terminal and clone the repository.
2. cd react-task-management-frontend
3. npm start


### Backend
1 Node JS and Express JS
2 Bcrypt for password protection
3.jsonwebtoken for authentication
4. cors of cross origin browser compatibility
5. Mongoose for saving and retrieving data from  MongoDB

To run the backend end application -
1. open terminal and clone the repository.
3. npm start

Deployment URL in Vercel:https://task-manager-six-omega.vercel.app/

### MongoDB

Set up 2 Tables

| Users  | 
| ------------- |
| username      | 
| email         | 
| password      | 


| Tasks  | 
| ------------- |
| title               | 
| description         | 
| priority            | 
| userId(of the user who created the task)      | 
| dueDate             |






