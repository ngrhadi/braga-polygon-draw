import React from "react";
import { useQuery } from "react-query";

const fetchData = async () => {
	const url = "http://localhost:3005/features";
	const response = await fetch(url);
	const data = await response.json();
	return data;
};

export default function usePolygonData() {
	const { data, status, error } = useQuery("polygonData", fetchData);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		if (status === "success") {
			setLoading(false);
		}
	}, [status]);

	return { data, loading, error };
}
