import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";//modified
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Container, Row } from "react-bootstrap";
import Profile from "./pages/Profile";
import Message from "./components/Message"
import "./App.css";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import { getCurrentUser } from "./api/profile";
import { getLocalStorage } from "./helpers/localStorage";
//new code below
//import io from "socket.io-client";


/* const connOpt = {
	transpots: ["websocket"]
}

let socket = io("https://striveschool-api.herokuapp.com") */




function App() {
	const [me, setMe] = React.useState(null);
	const [currentProfile, setCurrentProfile] = React.useState({});
	const [submitUser, setSubmitUser] = React.useState(0);
	

	return (
		<div className='App'>
			<Router>
				<NavBar submitUser={submitUser} />
				<Container className='mt-5'>
					<Row>
						<Route
							path='/profile/:id'
							exact
							render={(props) => (
								<Profile
									changeMe={() => setMe(true)}
									changeNotMe={() => setMe(false)}
									me={me}
									{...props}
								/>
							)}
						/>
					</Row>
				</Container>
				<ProtectedRoute path='/' exact component={Home} />
				<Route path='/message' exact component={Message} />
				<Route path='/auth/signup' exact component={Signup} />
				<Route
					path='/auth/login'
					exact
					render={(props) => (
						<Login
							getCurrentUser={() => setSubmitUser(submitUser + 1)}
							{...props}
						/>
					)}
				/>

				<Footer />
			</Router>
		</div>
	);
}

export default App;
