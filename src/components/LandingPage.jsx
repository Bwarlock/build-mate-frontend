const LandingPage = () => {
	return (
		<div style={styles.container}>
			<header style={styles.header}>
				<h1>Welcome to Build Mate</h1>
				<p style={styles.subHeader}>
					Your Ultimate Project Management Solution for Builders
				</p>
			</header>
			<section style={styles.section}>
				<h2>Key Features</h2>
				<ul style={styles.featureList}>
					<li>Efficient Project Tracking</li>
					<li>Task Assignment and Progress Monitoring</li>
					<li>Budget and Expense Management</li>
					<li>Client Communication Tools</li>
				</ul>
			</section>
			<section style={styles.section}>
				<h2>Get Started Today</h2>
				<p style={styles.subText}>
					Sign up now to streamline your construction projects!
				</p>
				<button style={styles.button}>Sign Up</button>
			</section>
			<footer style={styles.footer}>
				<p>&copy; 2024 Build Mate</p>
			</footer>
		</div>
	);
};

const styles = {
	container: {
		fontFamily: "Arial, sans-serif",
		textAlign: "center",
		padding: "50px",
		backgroundColor: "#f8f9fa",
		minHeight: "100vh",
	},
	header: {
		marginBottom: "40px",
	},
	subHeader: {
		fontSize: "18px",
		color: "#6c757d",
	},
	section: {
		marginBottom: "40px",
	},
	featureList: {
		listStyleType: "none",
		padding: 0,
		textAlign: "left",
	},
	subText: {
		fontSize: "16px",
		marginBottom: "20px",
		color: "#343a40",
	},
	button: {
		padding: "10px 20px",
		fontSize: "16px",
		backgroundColor: "#007bff",
		color: "#fff",
		border: "none",
		borderRadius: "5px",
		cursor: "pointer",
		transition: "background-color 0.3s ease",
	},
	// button:hover: {
	//   backgroundColor: '#0056b3',
	// },
	footer: {
		position: "absolute",
		bottom: "20px",
		left: 0,
		right: 0,
		color: "#6c757d",
	},
};

export default LandingPage;
