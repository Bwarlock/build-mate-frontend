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
			<div className="site-preloader-wrap">
				<div className="spinner"></div>
			</div>
			<header className="header">
				<div className="primary-header">
					<div className="container">
						<div className="primary-header-inner">
							<div className="header-logo">
								<a href="#">
									<img src="img/logo-dark.png" alt="Indico" />
								</a>
							</div>
							<div className="header-menu-wrap">
								<ul className="dl-menu">
									<li>
										<a href="#">Home</a>
										<ul>
											<li>
												<a href="index.html">Home Default</a>
											</li>
											<li>
												<a href="index-2.html">Home Modern</a>
											</li>
										</ul>
									</li>
									<li>
										<a href="#">About</a>
										<ul>
											<li>
												<a href="about-us.html">About Us</a>
											</li>
											<li>
												<a href="about-company.html">About Company</a>
											</li>
										</ul>
									</li>
									<li>
										<a href="#">Services</a>
										<ul>
											<li>
												<a href="services-1.html">Services 01</a>
											</li>
											<li>
												<a href="services-2.html">Services 02</a>
											</li>
										</ul>
									</li>
									<li>
										<a href="#">Pages</a>
										<ul>
											<li>
												<a href="projects.html">Our Projects</a>
											</li>
											<li>
												<a href="project-single.html">Project Single</a>
											</li>
											<li>
												<a href="team.html">Our Team</a>
											</li>
											<li>
												<a href="testimonial.html">Testimonial</a>
											</li>
											<li>
												<a href="404.html">404 Error</a>
											</li>
										</ul>
									</li>
									<li>
										<a href="#">Blog</a>
										<ul>
											<li>
												<a href="blog-grid.html">Blog Grid</a>
											</li>
											<li>
												<a href="blog-classic.html">Blog Classic</a>
											</li>
											<li>
												<a href="blog-single.html">Blog Single</a>
											</li>
										</ul>
									</li>
									<li>
										<a href="contact.html">Contact</a>
									</li>
								</ul>
							</div>
							<div className="header-right">
								<a className="menu-btn" href="#">
									Request a Quote
								</a>

								<div className="mobile-menu-icon">
									<div className="burger-menu">
										<div className="line-menu line-half first-line"></div>
										<div className="line-menu"></div>
										<div className="line-menu line-half last-line"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
			<div id="main-slider" className="dl-slider">
				<div className="single-slide">
					<div
						className="bg-img kenburns-top-right"
						style={{ backgroundImage: "url(img/slider-1.jpg)" }}></div>
					<div className="overlay"></div>
					<div className="slider-content-wrap d-flex align-items-center text-left">
						<div className="container">
							<div className="slider-content">
								<div className="dl-caption medium">
									<div className="inner-layer">
										<div data-animation="fade-in-right" data-delay="1s">
											Residencial
										</div>
									</div>
								</div>
								<div className="dl-caption big">
									<div className="inner-layer">
										<div data-animation="fade-in-left" data-delay="2s">
											We provide outstanding
										</div>
									</div>
								</div>
								<div className="dl-caption big">
									<div className="inner-layer">
										<div data-animation="fade-in-left" data-delay="2.5s">
											construction services.
										</div>
									</div>
								</div>
								<div className="dl-caption small">
									<div className="inner-layer">
										<div data-animation="fade-in-left" data-delay="3s">
											We have provided complete remodeling and construction
											solutions for <br />
											residential and commercial properties in cities.
										</div>
									</div>
								</div>
								<div className="dl-btn-group">
									<div className="inner-layer">
										<a
											href="#"
											className="dl-btn"
											data-animation="fade-in-left"
											data-delay="3.5s">
											View Projects <i className="arrow_right"></i>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="single-slide">
					<div
						className="bg-img kenburns-top-right"
						style={{ backgroundImage: "url(img/slider-2.jpg)" }}></div>
					<div className="overlay"></div>
					<div className="slider-content-wrap d-flex align-items-center text-center">
						<div className="container">
							<div className="slider-content">
								<div className="dl-caption medium">
									<div className="inner-layer">
										<div data-animation="fade-in-top" data-delay="1s">
											Residencial
										</div>
									</div>
								</div>
								<div className="dl-caption big">
									<div className="inner-layer">
										<div data-animation="fade-in-bottom" data-delay="2s">
											We are professional
										</div>
									</div>
								</div>
								<div className="dl-caption big">
									<div className="inner-layer">
										<div data-animation="fade-in-bottom" data-delay="2.5s">
											for building construction.
										</div>
									</div>
								</div>
								<div className="dl-caption small">
									<div className="inner-layer">
										<div data-animation="fade-in-bottom" data-delay="3s">
											We have provided complete remodeling and construction
											solutions for <br />
											residential and commercial properties in cities.
										</div>
									</div>
								</div>
								<div className="dl-btn-group">
									<div className="inner-layer">
										<a
											href="#"
											className="dl-btn"
											data-animation="fade-in-bottom"
											data-delay="3.5s">
											View Projects <i className="arrow_right"></i>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="single-slide">
					<div
						className="bg-img kenburns-top-right"
						style={{ backgroundImage: "url(img/slider-3.jpg)" }}></div>
					<div className="overlay"></div>
					<div className="slider-content-wrap d-flex align-items-center text-right">
						<div className="container">
							<div className="slider-content">
								<div className="dl-caption medium">
									<div className="inner-layer">
										<div data-animation="fade-in-left" data-delay="1s">
											Residencial
										</div>
									</div>
								</div>
								<div className="dl-caption big">
									<div className="inner-layer">
										<div data-animation="fade-in-right" data-delay="2s">
											We will be happy to take care
										</div>
									</div>
								</div>
								<div className="dl-caption big">
									<div className="inner-layer">
										<div data-animation="fade-in-right" data-delay="2.5s">
											of your construction works.
										</div>
									</div>
								</div>
								<div className="dl-caption small">
									<div className="inner-layer">
										<div data-animation="fade-in-right" data-delay="3s">
											We have provided complete remodeling and construction
											solutions for <br />
											residential and commercial properties in cities.
										</div>
									</div>
								</div>
								<div className="dl-btn-group">
									<div className="inner-layer">
										<a
											href="#"
											className="dl-btn"
											data-animation="fade-in-right"
											data-delay="3.5s">
											View Projects <i className="arrow_right"></i>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<section className="about-section padding">
				<div className="container">
					<div className="row about-wrap">
						<div className="col-lg-6 sm-padding">
							<div className="about-content wow fadeInLeft">
								<h2>
									We are the expart on this field better solution since 1984.
								</h2>
								<p>
									We are committed to building a sustainable future by fostering
									a collaborative spirit that creates exceptional experiences,
									balanced relationships, and community built environment.
									Building isn’t just job. It's our passion. With every project
									we undertake, we set the bar high and provide the best
									industry.
								</p>
								<a href="#" className="default-btn">
									More About Us
								</a>
							</div>
						</div>
						<div className="col-lg-6 sm-padding">
							<ul className="about-promo">
								<li className="about-promo-item wow fadeInUp">
									<i className="flaticon-factory"></i>
									<div>
										<h3>Professional Liability</h3>
										<p>
											We are committed to building a sustainable future by
											fostering a collaborative spirit.
										</p>
									</div>
								</li>
								<li
									className="about-promo-item wow fadeInUp"
									data-wow-delay="300ms">
									<i className="flaticon-worker"></i>
									<div>
										<h3>Dedicated To Our Clients</h3>
										<p>
											We are committed to building a sustainable future by
											fostering a collaborative spirit.
										</p>
									</div>
								</li>
								<li
									className="about-promo-item wow fadeInUp"
									data-wow-delay="500ms">
									<i className="flaticon-gear"></i>
									<div>
										<h3>Outstanding Services</h3>
										<p>
											We are committed to building a sustainable future by
											fostering a collaborative spirit.
										</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
			<section className="service-section bg-grey padding">
				<div className="dark-bg"></div>
				<div
					className="section-heading dark-background text-center mb-40 wow fadeInUp"
					data-wow-delay="100ms">
					<span>Services</span>
					<h2>
						Take the world’s best <br /> services for you
					</h2>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-lg-10 offset-lg-1">
							<div
								id="service-carousel"
								className="service-carousel box-shadow owl-carousel">
								<div className="service-item">
									<div className="service-icon">
										<i className="flaticon-3d-printer"></i>
									</div>
									<h3>General Building</h3>
									<p>
										We are committed a sustainable future fostering a
										collaborative spirit.
									</p>
									<a href="#" className="read-more">
										Read More
									</a>
									<div className="overlay-icon">
										<i className="flaticon-3d-printer"></i>
									</div>
								</div>
								<div className="service-item">
									<div className="service-icon">
										<i className="flaticon-industrial-robot"></i>
									</div>
									<h3>Building Construction</h3>
									<p>
										We are committed a sustainable future fostering a
										collaborative spirit.
									</p>
									<a href="#" className="read-more">
										Read More
									</a>
									<div className="overlay-icon">
										<i className="flaticon-industrial-robot"></i>
									</div>
								</div>
								<div className="service-item">
									<div className="service-icon">
										<i className="flaticon-assembly-line"></i>
									</div>
									<h3>Refurbishments</h3>
									<p>
										We are committed a sustainable future fostering a
										collaborative spirit.
									</p>
									<a href="#" className="read-more">
										Read More
									</a>
									<div className="overlay-icon">
										<i className="flaticon-assembly-line"></i>
									</div>
								</div>
								<div className="service-item">
									<div className="service-icon">
										<i className="flaticon-conveyor"></i>
									</div>
									<h3>Building Renovation</h3>
									<p>
										We are committed a sustainable future fostering a
										collaborative spirit.
									</p>
									<a href="#" className="read-more">
										Read More
									</a>
									<div className="overlay-icon">
										<i className="flaticon-conveyor"></i>
									</div>
								</div>
								<div className="service-item">
									<div className="service-icon">
										<i className="flaticon-control-system"></i>
									</div>
									<h3>Architectural Plans</h3>
									<p>
										We are committed a sustainable future fostering a
										collaborative spirit.
									</p>
									<a href="#" className="read-more">
										Read More
									</a>
									<div className="overlay-icon">
										<i className="flaticon-control-system"></i>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="work-pro-section padding">
				<div className="container">
					<div className="row">
						<div className="col-lg-3 col-sm-6 sm-padding">
							<div className="work-pro-item text-center">
								<span className="number">1</span>
								<div className="number-line"></div>
								<h3>Planning & Research</h3>
								<p>
									We are committed building a sustainable future fostering a
									collaborative spirit.
								</p>
							</div>
						</div>
						<div className="col-lg-3 col-sm-6 sm-padding">
							<div className="work-pro-item text-center">
								<span className="number">2</span>
								<div className="number-line"></div>
								<h3>Design & Ideas</h3>
								<p>
									We are committed building a sustainable future fostering a
									collaborative spirit.
								</p>
							</div>
						</div>
						<div className="col-lg-3 col-sm-6 sm-padding">
							<div className="work-pro-item text-center">
								<span className="number">3</span>
								<div className="number-line"></div>
								<h3>Specialized Projects</h3>
								<p>
									We are committed building a sustainable future fostering a
									collaborative spirit.
								</p>
							</div>
						</div>
						<div className="col-lg-3 col-sm-6 sm-padding">
							<div className="work-pro-item text-center">
								<span className="number">4</span>
								<h3>Final Outputs</h3>
								<p>
									We are committed building a sustainable future fostering a
									collaborative spirit.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="projects-section padding">
				<div className="container">
					<div className="row d-flex align-items-center">
						<div className="col-lg-8 col-md-6">
							<div className="section-heading mb-40">
								<span>Projects</span>
								<h2>
									Discover the most fascinating <br />
									projects for our clients
								</h2>
							</div>
						</div>
						<div className="col-lg-4 col-md-6 text-right">
							<a href="#" className="default-btn">
								View All Projects
							</a>
						</div>
					</div>
					<div
						id="projects-carousel"
						className="projects-carousel box-shadow owl-carousel">
						<div className="project-item">
							<img src="img/project-1.jpg" alt="projects" />
							<div className="overlay"></div>
							<a
								href="img/project-1.jpg"
								className="view-icon img-popup"
								data-gall="project">
								{" "}
								<i className="fas fa-expand"></i>
							</a>
							<div className="projects-content">
								<a href="#" className="category">
									Interior
								</a>
								<h3>
									<a href="#" className="tittle">
										Rectangular house near italy
									</a>
								</h3>
							</div>
						</div>
						<div className="project-item">
							<img src="img/project-2.jpg" alt="projects" />
							<div className="overlay"></div>
							<a
								href="img/project-2.jpg"
								className="view-icon img-popup"
								data-gall="project">
								{" "}
								<i className="fas fa-expand"></i>
							</a>
							<div className="projects-content">
								<a href="#" className="category">
									Architecture
								</a>
								<h3>
									<a href="#" className="tittle">
										Cathedral of brasilia brasilia
									</a>
								</h3>
							</div>
						</div>
						<div className="project-item">
							<img src="img/project-3.jpg" alt="projects" />
							<div className="overlay"></div>
							<a
								href="img/project-3.jpg"
								className="view-icon img-popup"
								data-gall="project">
								{" "}
								<i className="fas fa-expand"></i>
							</a>
							<div className="projects-content">
								<a href="#" className="category">
									Design
								</a>
								<h3>
									<a href="#" className="tittle">
										Harpa concert hall reykjavik
									</a>
								</h3>
							</div>
						</div>
						<div className="project-item">
							<img src="img/project-4.jpg" alt="projects" />
							<div className="overlay"></div>
							<a
								href="img/project-4.jpg"
								className="view-icon img-popup"
								data-gall="project">
								{" "}
								<i className="fas fa-expand"></i>
							</a>
							<div className="projects-content">
								<a href="#" className="category">
									Architecture
								</a>
								<h3>
									<a href="#" className="tittle">
										Milwauke museum wisconsin
									</a>
								</h3>
							</div>
						</div>
						<div className="project-item">
							<img src="img/project-5.jpg" alt="projects" />
							<div className="overlay"></div>
							<a
								href="img/project-5.jpg"
								className="view-icon img-popup"
								data-gall="project">
								{" "}
								<i className="fas fa-expand"></i>
							</a>
							<div className="projects-content">
								<a href="#" className="category">
									Design
								</a>
								<h3>
									<a href="#" className="tittle">
										The dancing house prague
									</a>
								</h3>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className="cta-section padding">
				<div className="container">
					<div className="cta-content text-center">
						<span className="wow fadeInUp">Explore The Features</span>
						<h2 className="wow fadeInUp" data-wow-delay="300ms">
							The best constructions <br />
							company since 1985
						</h2>
						<a
							href="#"
							className="default-btn wow fadeInUp"
							data-wow-delay="500ms">
							Get Free Quote
						</a>
					</div>
				</div>
			</div>
			<section className="content-section padding">
				<div className="container">
					<div className="row content-wrap">
						<div
							className="col-lg-6 sm-padding wow fadeInLeft"
							data-wow-delay="100ms">
							<img className="box-shadow" src="img/content-1.jpg" alt="img" />
						</div>
						<div className="col-lg-6 sm-padding">
							<div
								className="content-info wow fadeInRight"
								data-wow-delay="300ms">
								<span>Explore The Features</span>
								<h2>Offering the most complete integrated package!</h2>
								<p>
									We are committed to building a sustainable future by fostering
									a collaborative spirit that creates exceptional experiences,
									balanced relationships, and community built environment.
									Building isn’t just job. It's our passion. With every project
									we undertake, we set the bar high and provide the best
									industry.
								</p>
								<a href="#" className="default-btn">
									Get Free Quote
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="testimonial-section bg-grey padding">
				<div className="dots"></div>
				<div className="container">
					<div
						className="section-heading text-center mb-40 wow fadeInUp"
						data-wow-delay="100ms">
						<span>Testimonial</span>
						<h2>What people says</h2>
					</div>
					<div
						id="testimonial-carousel"
						className="testimonial-carousel box-shadow owl-carousel">
						<div className="testi-item d-flex align-items-center">
							<img src="img/testi-1.jpg" alt="img" />
							<div className="testi-content">
								<p>
									"Thank you for guiding us through the construction process,
									understanding, and always ready to accommodate our needs. We
									love our new space and know that it was built by the very
									best!"
								</p>
								<h3>Kyle Frederick</h3>
								<ul className="rattings">
									<li>
										<i className="fa fa-star"></i>
									</li>
									<li>
										<i className="fa fa-star"></i>
									</li>
									<li>
										<i className="fa fa-star"></i>
									</li>
									<li>
										<i className="fa fa-star"></i>
									</li>
									<li>
										<i className="fa fa-star"></i>
									</li>
								</ul>
								<span>Director</span>
							</div>
							<i className="fa fa-quote-right"></i>
						</div>
						<div className="testi-item d-flex align-items-center">
							<img src="img/testi-2.jpg" alt="img" />
							<div className="testi-content">
								<p>
									"Thank you for guiding us through the construction process,
									understanding, and always ready to accommodate our needs. We
									love our new space and know that it was built by the very
									best!"
								</p>
								<h3>Valentin Lacoste</h3>
								<ul className="rattings">
									<li>
										<i className="fa fa-star"></i>
									</li>
									<li>
										<i className="fa fa-star"></i>
									</li>
									<li>
										<i className="fa fa-star"></i>
									</li>
									<li>
										<i className="fa fa-star"></i>
									</li>
									<li>
										<i className="fa fa-star"></i>
									</li>
								</ul>
								<span>Director</span>
							</div>
							<i className="fa fa-quote-right"></i>
						</div>
						<div className="testi-item d-flex align-items-center">
							<img src="img/testi-3.jpg" alt="img" />
							<div className="testi-content">
								<p>
									"Thank you for guiding us through the construction process,
									understanding, and always ready to accommodate our needs. We
									love our new space and know that it was built by the very
									best!"
								</p>
								<h3>José Carpio</h3>
								<ul className="rattings">
									<li>
										<i className="fa fa-star"></i>
									</li>
									<li>
										<i className="fa fa-star"></i>
									</li>
									<li>
										<i className="fa fa-star"></i>
									</li>
									<li>
										<i className="fa fa-star"></i>
									</li>
									<li>
										<i className="fa fa-star"></i>
									</li>
								</ul>
								<span>Director</span>
							</div>
							<i className="fa fa-quote-right"></i>
						</div>
					</div>
				</div>
			</section>
			<section className="blog-section padding">
				<div className="container">
					<div
						className="section-heading text-center mb-40 wow fadeInUp"
						data-wow-delay="100ms">
						<span>From Blog</span>
						<h2>Speciallized news</h2>
					</div>
					<div className="row blog-wrap">
						<div className="col-lg-4 col-sm-6 sm-padding">
							<div className="blog-item box-shadow">
								<div className="blog-thumb">
									<img src="img/post-1.jpg" alt="post" />
									<span className="category">
										<a href="#">interior</a>
									</span>
								</div>
								<div className="blog-content">
									<h3>
										<a href="#">
											Minimalist trending in modern architecture 2019
										</a>
									</h3>
									<p>
										Building first evolved out dynamics between needs means
										available building materials attendant skills.
									</p>
									<a href="#" className="read-more">
										Read More
									</a>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-sm-6 sm-padding">
							<div className="blog-item box-shadow">
								<div className="blog-thumb">
									<img src="img/post-2.jpg" alt="post" />
									<span className="category">
										<a href="#">Architecture</a>
									</span>
								</div>
								<div className="blog-content">
									<h3>
										<a href="#">
											Terrace in the town yamazaki kentaro design workshop.
										</a>
									</h3>
									<p>
										Building first evolved out dynamics between needs means
										available building materials attendant skills.
									</p>
									<a href="#" className="read-more">
										Read More
									</a>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-sm-6 sm-padding">
							<div className="blog-item box-shadow">
								<div className="blog-thumb">
									<img src="img/post-3.jpg" alt="post" />
									<span className="category">
										<a href="#">Design</a>
									</span>
								</div>
								<div className="blog-content">
									<h3>
										<a href="#">
											W270 house são paulo arquitetos fabio jorge architeqture.
										</a>
									</h3>
									<p>
										Building first evolved out dynamics between needs means
										available building materials attendant skills.
									</p>
									<a href="#" className="read-more">
										Read More
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className="sponsor-section bg-grey">
				<div className="dots"></div>
				<div className="container">
					<div id="sponsor-carousel" className="sponsor-carousel owl-carousel">
						<div className="sponsor-item">
							<img src="img/sponsor1.png" alt="sponsor" />
						</div>
						<div className="sponsor-item">
							<img src="img/sponsor2.png" alt="sponsor" />
						</div>
						<div className="sponsor-item">
							<img src="img/sponsor3.png" alt="sponsor" />
						</div>
						<div className="sponsor-item">
							<img src="img/sponsor4.png" alt="sponsor" />
						</div>
						<div className="sponsor-item">
							<img src="img/sponsor5.png" alt="sponsor" />
						</div>
						<div className="sponsor-item">
							<img src="img/sponsor6.png" alt="sponsor" />
						</div>
						<div className="sponsor-item">
							<img src="img/sponsor7.png" alt="sponsor" />
						</div>
						<div className="sponsor-item">
							<img src="img/sponsor8.png" alt="sponsor" />
						</div>
					</div>
				</div>
			</div>
			<section className="widget-section padding">
				<div className="container">
					<div className="row">
						<div className="col-lg-3 col-sm-6 sm-padding">
							<div className="widget-content">
								<a href="#">
									<img src="img/logo-light.png" alt="brand" />
								</a>
								<p>
									Building your own home is about desire, fantasy. But it’s
									achievable anyone can do it.
								</p>
							</div>
						</div>
						<div className="col-lg-2 col-sm-6 sm-padding">
							<div className="widget-content">
								<h4>Company</h4>
								<ul className="widget-links">
									<li>
										<a href="#">About Us</a>
									</li>
									<li>
										<a href="#">Our Services</a>
									</li>
									<li>
										<a href="#">Clients Reviews</a>
									</li>
									<li>
										<a href="#">Contact Us</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-lg-3 col-sm-6 sm-padding">
							<div className="widget-content">
								<h4>Headquaters</h4>
								<p>962 Fifth Avenue, 3rd Floor New York, NY10022</p>
								<span>
									<a
										href="http://html.dynamiclayers.net/cdn-cgi/l/email-protection"
										className="__cf_email__"
										data-cfemail="a8e0cdc4c4c7e8e9c4cdd0c9fcc0cdc5cd86c6cddc">
										[email&#160;protected]
									</a>
								</span>
								<span>(+123) 456 789 101</span>
							</div>
						</div>
						<div className="col-lg-4 col-sm-6 sm-padding">
							<div className="widget-content">
								<h4>Newslatter Subscription</h4>
								<p>
									Subscribe and get 10% off from our <br />
									architecture company.
								</p>
								<div className="subscribe-box clearfix">
									<div className="subscribe-form-wrap">
										<form action="#" className="subscribe-form">
											<input
												type="email"
												name="email"
												id="subs-email"
												className="form-input"
												placeholder="Enter Your Email Address..."
											/>
											<button type="submit" className="submit-btn">
												Subscribe
											</button>
											<div id="subscribe-result">
												<p className="subscription-success"></p>
												<p className="subscription-error"></p>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<footer className="footer-section align-center">
				<div className="container">
					<p>
						<a href="templateshub.net">Templates Hub</a>
					</p>
				</div>
			</footer>
			<a data-scroll href="#header" id="scroll-to-top">
				<i className="arrow_carrot-up"></i>
			</a>
		</>
	);
};

export default LandingPage;
