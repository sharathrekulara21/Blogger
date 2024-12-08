const formatDate = (date) => {
	const daysOfWeek = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const day = daysOfWeek[date.getDay()];
	const month = months[date.getMonth()];
	const dateOfMonth = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const time = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;

	return `${month} ${dateOfMonth}, ${day} ${time}`;
};

export default formatDate;
