import "../App.css";
import { useEffect, useRef, useState } from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax, import/no-unresolved, import/no-extraneous-dependencies
import usePolygonData from "../hooks/usePolygonData";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Sidebar from "../component/Sidebar";
import MenuOpen from "../icon/MenuOpen";

mapboxgl.accessToken =
	"pk.eyJ1IjoibmdyaGFkaSIsImEiOiJjbDU4YmJpNHIxenl2M2N0NzNybnFnNGFvIn0.k1PNwfeFCEuFZlfngl7sWA";

function Home() {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(107.581);
	const [lat, setLat] = useState(-6.92);
	const [zoom, setZoom] = useState(16);
	const [dragControl, setDragControl] = useState(false);

	const polygonRef = useRef(null);
	const [drawPoly, setDrawPoly] = useState(false);
	const [dataPoly, setDataPoly] = useState(null);
	const [numberCoord, setNumberCoord] = useState(0);
	const [textCoordinat, setTextCoordinat] = useState(null);
	const [lockValue, setLockValue] = useState(false);

	const [showImport, setShowImport] = useState(false);
	const [showReset, setShowReset] = useState(false);
	const [showUndo, setShowUndo] = useState(false);
	const [closeShape, setCloseShape] = useState(false);

	const handleDrawPoly = () => {
		setDrawPoly(!drawPoly);
	};
	const handleDataPoly = (data) => {
		setDataPoly(data);
		if (!dataPoly && data) {
			setShowImport(true);
			setShowReset(true);
			setShowUndo(true);
			setCloseShape(true);
		}
	};

	const {
		data: dataPolygon,
		loading: loadingPolygon,
		error: errorPolygon,
		url: urlPolygon,
	} = usePolygonData();

	const objectMapping = Object.keys(dataPolygon ?? {}).map((key) => {
		return {
			type: "Feature",
			geometry: dataPolygon[key].geometry,
			id: dataPolygon[key].properties.id,
		};
	});

	const handleButtonAddLayers = () => {
		map.current.addLayer({
			id: "polygon-test",
			type: "fill",
			source: {
				type: "geojson",
				data: {
					type: "Feature",
					properties: {},
					geometry: {
						type: "Polygon",
						coordinates: [
							[
								[107.58105799555779, -6.922091393678741],
								[107.58113242685795, -6.922072089406017],
								[107.5811243802309, -6.9220374748460545],
								[107.58110895752907, -6.922041468833868],
								[107.58110091090202, -6.9220135109184495],
								[107.58117735385895, -6.922021498894457],
								[107.58118472993374, -6.92195226976457],
								[107.58107140660286, -6.921934962480518],
								[107.5810707360506, -6.921928971497417],
								[107.58103787899017, -6.921938290804418],
								[107.58102111518383, -6.9219729053716454],
								[107.58105799555779, -6.922091393678741],
							],
						],
					},
				},
			},

			paint: {
				"fill-color": "#088",
				"fill-opacity": 0.8,
			},
		});
	};

	const handleAddLayerOnDraw = () => {
		map.current.on("draw.create", (e) => {
			const { features } = e;
			const { geometry } = features[0];
			const { coordinates } = geometry;
			const newData = {
				type: "Feature",
				geometry: {
					type: "Polygon",
					coordinates: [coordinates],
				},
				properties: {
					id: `${Date.now()}`,
				},
			};
			// console.log(newData);
			setDataPoly(newData);
			setShowImport(true);
			setShowReset(true);
			setShowUndo(true);
			setCloseShape(true);
		});
	};

	const handleDragOption = () => {
		setDragControl(!dragControl);
	};

	const draw = new MapboxDraw({
		displayControlsDefault: false,
		controls: {
			polygon: true,
			trash: true,
			point: true,
			line_string: true,
			polygon_fill: true,
			circle: true,
		},
		defaultMode: "draw_polygon",
		touchEnabled: false,
	});
	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [lng, lat],
			zoom: zoom,
			doubleClickZoom: false,
			dragPan: dragControl ? false : true,
		});
		if (!drawPoly) {
			map.current.addControl(draw, "top-right");
		} else {
			map.current.removeControl(draw, "top-right");
		}
	}, []);

	useEffect(() => {
		if (!map.current) return; // wait for map to initialize
		map.current.on("move", () => {
			setLng(map.current.getCenter().lng.toFixed(4));
			setLat(map.current.getCenter().lat.toFixed(4));
			setZoom(map.current.getZoom().toFixed(2));
		});
		map.current.on("draw.create", (e) => {
			handleDataPoly(e.features);
		});
		map.current.on("click", (e) => {
			setNumberCoord(numberCoord + 1);
			let coordinat = e.lngLat.toArray();
			let idCoordinat = `${numberCoord}+${coordinat[0].toFixed(
				4,
			)}+${coordinat[1].toFixed(4)}`;
			let textCoordinat = `${idCoordinat} : ${coordinat[0]}, ${coordinat[1]}`;
			setTextCoordinat(textCoordinat);
		});
	}, []);

	const [showSidebar, setShowSidebar] = useState(false);

	const handleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	const handleCloseSidebar = () => {
		setShowSidebar(false);
	};

	return (
		<div className="App">
			<div>
				{showSidebar && (
					<Sidebar
						handleSidebar={handleSidebar}
						handleCloseSidebar={handleCloseSidebar}
						handleDragOption={handleDragOption}
						handleDrawPoly={handleDrawPoly}
						handleDataPoly={handleDataPoly}
						drawPoly={drawPoly}
						dragControl={dragControl}
						dataPoly={dataPoly}
						textCoordinat={textCoordinat}
						numberCoord={numberCoord}
						lockValue={lockValue}
						setLockValue={setLockValue}
						showImport={showImport}
						showReset={showReset}
						showUndo={showUndo}
						closeShape={closeShape}
						handleButtonAddLayers={handleButtonAddLayers}
						handleAddLayerOnDraw={handleAddLayerOnDraw}
						polygonRef={polygonRef}
					/>
				)}
			</div>
			<div className="absolute grid grid-cols-3 place-items-center">
				<button
					className="bg-zinc-800 text-white z-10 absolute top-0 m-2"
					style={{
						left: showSidebar ? "-100%" : "0",
						width: "29px",
						height: "29px",
						borderRadius: "50%",
					}}
					onClick={handleSidebar}>
					<MenuOpen />
				</button>
			</div>
			<div ref={mapContainer} className="map-container" />
		</div>
	);
}

export default Home;
