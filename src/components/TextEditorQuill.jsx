import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const TextEditorQuill = ({ value, setValue }) => {
	const handleEditorChange = (html) => {
		setValue(html);
		console.log(value);
	};

	return (
		<ReactQuill
			style={{
				minHeight: "200px",
				height: "fit-content",
			}}
			theme="snow" // Specify theme ('snow' or 'bubble')
			value={value} // Set editor content
			onChange={handleEditorChange} // Handle changes in editor content
		/>
	);
};

TextEditorQuill.propTypes = {
	value: PropTypes.string.isRequired,
	setValue: PropTypes.func.isRequired,
};
export default TextEditorQuill;
