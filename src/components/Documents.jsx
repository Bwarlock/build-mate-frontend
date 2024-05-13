import { Button, Checkbox, ConfigProvider, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useAddData } from "../api/hooks";

const Document = () => {
    const {addDocument} = useAddData();
	const [values, setValues] = useState({
		title: "Dummy Title",
        content: "Dummy Content",
        readUsers: [],
        writeUsers: [],
	});
    const handleSubmit = () => {
		addDocument(values);
	};

    console.log(values);
	return (
        // TODO: add list of docs here
            <>
            {/* Ask title and to add users in a popup */}
                <Button type="primary" htmlType="submit" onClick={handleSubmit} >Create new Document</Button>
            </>
	);
};
export default Document;
