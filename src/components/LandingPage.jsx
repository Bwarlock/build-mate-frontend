import "../styles/LandingPage.css";
import { TypeAnimation } from "react-type-animation";
// import "../styles/animate.min.css";
// import "../styles/bootstrap.min.css";
// import "../styles/elegant-font-icons.css";
// import "../styles/elegant-font-icons.css";
// import "../styles/flaticon.css";
// import "../styles/fontawesome.min.css";
// import "../styles/main.css";
// import "../styles/odometer.min.css";
// import "../styles/owl.carousel.css";
// import "../styles/responsive.css";
// import "../styles/slick.css";
// import "../styles/themify-icons.css";

const LandingPage = () => {
	return (
		<>
			<header>
				<div className="logo">
					<img src="logo.png" alt="Build-Mate Logo" />
				</div>
				<nav>
					<ul>
						{/* <li>
							<a href="#home">Home</a>
						</li>
						<li>
							<a href="#features">Features</a>
						</li>
						<li>
							<a href="#pricing">Pricing</a>
						</li> */}
						<li>
							<a href="/login">
							<button>Login</button>
							</a>
						</li>
					</ul>
				</nav>
			</header>

			<section className="hero">
				<div className="hero-content">
					<h1>Transform Your Construction Projects with Build-Mate</h1>
					<p>Join our platform to streamline project management</p>
					<form>
						<a href="/register">
							<button type="button">Register Now</button>
						</a>
					</form>
					<TypeAnimation
					sequence={[
						"Build",
						1000, // wait 1s before replacing "Mice" with "Hamsters"
						"Build-",
						1000,
						"Build-Mate",
						1000,
						"Build-Mate",
						1000,
						"Build-",
						1000,
						"Build",
						1000,
						"",
						2000,
					]}
					wrapper="span"
					speed={50}
					style={{
						fontSize: "5em",
						// fontWeight: "Bold",
						fontFamily:
							"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
						display: "inline-block",
					}}
					repeat={Infinity}
				/>
				</div>
			</section>

			<section className="testimonial">
				<h2>What Our Users Say</h2>
				<div className="testimonial-carousel">
					<div className="testimonial-slide">
						<blockquote>
							"Build-Mate has been instrumental in organizing our construction
							projects efficiently."
						</blockquote>
						<p>- John Doe, Project Manager</p>
					</div>
				</div>
			</section>

			<footer>
				<div className="footer-links">
					{/* <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
            </ul>  */}
				</div>
				<div className="social-links">
					<a href="https://www.facebook.com/buildmate" target="_blank">
						Facebook
					</a>
					<a href="https://twitter.com/buildmate" target="_blank">
						Twitter
					</a>
					<a href="https://www.linkedin.com/company/build-mate" target="_blank">
						LinkedIn
					</a>
				</div>
				<div className="footer-info">
					<p>&copy; 2024 Build-Mate. All Rights Reserved.</p>
				</div>
			</footer>
		</>
	);
};

export default LandingPage;
