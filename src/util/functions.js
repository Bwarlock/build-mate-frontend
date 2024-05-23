export const horizontalScroll = () => {
	//Horizontal Scroll , both axis cause horizontal scrolling
	const tableElement = document.getElementsByClassName("ant-table-content")[0];
	const handleWheel = (event) => {
		if (tableElement) {
			event.preventDefault();
			if (event.deltaY !== 0) {
				tableElement.scrollLeft += event.deltaY;
			} else if (event.deltaX !== 0) {
				tableElement.scrollLeft += event.deltaX;
			}
		}
	};
	if (tableElement) {
		tableElement.addEventListener("wheel", handleWheel);
		//Destroy Listener
		return () => {
			tableElement.removeEventListener("wheel", handleWheel);
		};
	}
};