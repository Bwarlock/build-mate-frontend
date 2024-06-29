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

export const enterKeyEvent = (modalVisible, callFunction) => {
	const handleKeyDown = (event) => {
		if (event.key === "Enter" && modalVisible) {
			callFunction();
		}
	};
	window.addEventListener("keydown", handleKeyDown);

	return () => {
		window.removeEventListener("keydown", handleKeyDown);
	};
};

export const uniqueArrayOfObjects = (arr1, arr2, key = "value") => {
	const map = new Map();
	arr1.forEach((item) => map.set(item[key], item));
	arr2.forEach((item) => map.set(item[key], item));
	return Array.from(map.values());
};

export function getTimeLeftForNextBirthday(birthDate) {
	const currentDate = new Date();
	birthDate = new Date(birthDate);
	const birthMonth = birthDate.getMonth();
	const birthDay = birthDate.getDate();

	let targetDate = new Date(currentDate.getFullYear(), birthMonth, birthDay);

	if (targetDate < currentDate) {
		targetDate.setFullYear(currentDate.getFullYear() + 1);
	}

	const timeDiff = targetDate - currentDate;
	const seconds = Math.floor(timeDiff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);

	// Use the most appropriate unit for the time left
	if (weeks >= 4) {
		const months = Math.floor(weeks / 4);
		return months === 1 ? "1 month left" : `${months} months left`;
	} else if (weeks >= 1) {
		return weeks === 1 ? "1 week left" : `${weeks} weeks left`;
	} else if (days >= 1) {
		return days === 1 ? "1 day left" : `${days} days left`;
	} else if (hours >= 1) {
		return hours === 1 ? "1 hour left" : `${hours} hours left`;
	} else if (minutes >= 1) {
		return minutes === 1 ? "1 minute left" : `${minutes} minutes left`;
	} else {
		return seconds === 1 ? "1 second left" : `${seconds} seconds left`;
	}
}

export const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
