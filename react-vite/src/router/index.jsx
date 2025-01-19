import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomePage from '../components/Homepage/homepage';
import Profile from '../components/Profile/profile';
import AddExerciseForm from '../components/Exercise/Addexercise';
import ExerciseList from '../components/Exercise/allExercises';
import EventList from '../components/Event/allEvents';
import WorkoutList from '../components/Workout/AllWorkouts'
import Layout from './Layout';
import UpdateExerciseForm from '../components/Exercise/UpdateExcercise';
import UserExerciseList from '../components/Exercise/UserExercise';
import UserEventsList from '../components/Event/UserEvents';
import UserCommentList from '../components/Comment/UserComment';
import UserWorkoutList from '../components/Workout/UserWorkoutList';
import NotFound from '../components/NotFound/notfound';
import WorkoutDetails from '../components/Workout/WorkoutDetails';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/user/profile",
        element: <Profile />,
      },
      {
        path: "/exercise/new",
        element: <AddExerciseForm />,
      },
      {
        path: "/exercise/update/:execiseId",
        element: <UpdateExerciseForm />,
      },
      {
        path: "/exercise/",
        element: <ExerciseList />,
      },
      {
        path: "/event/",
        element: <EventList />,
      },
      {
        path: "/workout/",
        element: <WorkoutList />,
      },
      {
        path: "/exercise/user",
        element: <UserExerciseList />,
      },
      {
        path: "/event/user",
        element: <UserEventsList />,
      },
      {
        path: "/comment/user",
        element: <UserCommentList />,
      },
      {
        path: "/workout/user",
        element: <UserWorkoutList />,
      },
      {
        path: "/workout/:id",
        element: <WorkoutDetails />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);