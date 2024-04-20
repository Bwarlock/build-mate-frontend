// import "../styles/LandingPage.css";
import "../styles/animate.min.css";
import "../styles/bootstrap.min.css";
import "../styles/elegant-font-icons.css";
import "../styles/elegant-font-icons.css";
import "../styles/flaticon.css";
import "../styles/fontawesome.min.css";
import "../styles/main.css";
import "../styles/odometer.min.css";
import "../styles/owl.carousel.css";
import "../styles/responsive.css";
import "../styles/slick.css";
import "../styles/themify-icons.css";

const LandingPage = () => {
	return (
		<>
			<header>
				<div className="logo">
					<img src="logo.png" alt="Build-Mate Logo" />
				</div>
				<nav>
					<ul>
						<li>
							<a href="#home">Home</a>
						</li>
						<li>
							<a href="#features">Features</a>
						</li>
						<li>
							<a href="#pricing">Pricing</a>
						</li>
						<li>
							<a href="#contact">Contact</a>
						</li>
					</ul>
				</nav>
			</header>

			<section className="hero">
				<div className="hero-content">
					<h1>Transform Your Construction Projects with Build-Mate</h1>
					<p>Join our platform to streamline project management</p>
					<form>
						<span>Add Build MAte animation</span>
						<a href="/register">
							<button type="button">Register Now</button>
						</a>
					</form>
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
