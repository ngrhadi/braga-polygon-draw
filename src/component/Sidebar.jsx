import React from "react";
import Camera from "../icon/Camera";
import Location from "../icon/Location";
import MenuClose from "../icon/MenuClose";
import User from "../icon/User";
import { Link } from "react-router-dom";
// import { useEffect } from "react";

export default function Sidebar(props) {
	// const navigate = useNavigate();

	// useEffect(() => {
	// 	navigate("/");
	// }, []);

	return (
		<div
			className="w-4/12 h-full fixed z-20  bg-zinc-800"
			onChange={props.handleSidebar}>
			<div className="box-content bg-zinc-800 h-4/5 overflow-y-scroll sidebar-custom sm:hiden">
				<div className="box-content bg-zinc-800 z-30">
					<button
						className="bg-blue-500 text-white z-10 absolute top-1 m-2 right-2 items-center justify-center rounded-full"
						onClick={props.handleCloseSidebar}>
						<Link to="/">
							<MenuClose />
						</Link>
					</button>
					{/* items-center justify-center */}
					<div className="absolute mt-4 divide-y divide-solid">
						<p className="text-lg text-blue-500 text-start ml-3 sm:text-sm">
							Edit Information Aset
						</p>
					</div>
				</div>
				<div className="divide-y text-white divide-solid mt-2" />
				<div className="flex flex-row mt-14 items-center justify-center">
					<div className="flex flex-row ">
						<button className="mx-2 text-zinc-800 bg-yellow-300 rounded-full ring-yellow-800/50 ring-2 ring-offset-transparent">
							<User className="border" />
						</button>
						<span className="text-white sm:hiden">
							-------------------------
						</span>
						<button className="mx-2 text-zinc-800 bg-yellow-300 rounded-full ring-yellow-800/50 ring-2">
							<Location />
						</button>
						<span className="text-white sm:hiden">
							-------------------------
						</span>
						<button className="mx-2 text-zinc-800 bg-blue-500 rounded-full ring-blue-500/50 ring-2">
							<Camera />
						</button>
					</div>
				</div>
				<div className="flex justify-center mt-4">
					<div className="flex flex-row items-center justify-center lg:justify-center">
						<button
							className="bg-zinc-800 text-white rounded-full lg:w-96 border-2 border-white h-12 hover:bg-blue-500 hover:text-zinc-800 hover:font-bold hover:border-none"
							onClick={props.handleDataPoly}>
							<p className="font-bold">+ Edit Polygon Aset</p>
						</button>
					</div>
				</div>
				{props.dataPoly ? (
					<div className="flex justify-center mt-4">
						{props.showImport && (
							<button
								className="bg-zinc-800 mx-2 text-white rounded-full lg:w-2/12 border-2 border-white h-12 hover:bg-blue-500 hover:text-zinc-800 hover:font-bold hover:border-none"
								onClick={props.handleButtonAddLayers}
								onChange={props.hideLayer}>
								<p className="font-bold">Start</p>
							</button>
						)}
						{props.showReset && (
							<button
								className="bg-zinc-800 mx-2 text-white rounded-full lg:w-2/12 border-2 border-white h-12 hover:bg-blue-500 hover:text-zinc-800 hover:font-bold hover:border-none"
								onClick={props.handleAddLayerOnDraw}>
								<p className="font-bold">Create</p>
							</button>
						)}
						{props.showUndo && (
							<button
								className="bg-zinc-800 mx-2 text-white rounded-full lg:w-2/12 border-2 border-white h-12 hover:bg-blue-500 hover:text-zinc-800 hover:font-bold hover:border-none"
								onClick={props.handleDrawPoly}>
								<p className="font-bold">Draw</p>
							</button>
						)}
						{props.closeShape && (
							<button
								className="bg-zinc-800 mx-2 text-white rounded-full lg:w-2/12 border-2 border-white h-12 hover:bg-yellow-300 hover:text-zinc-800 hover:font-bold hover:border-none"
								onClick={props.handleCloseDataPoly}>
								<p className="font-bold">Save</p>
							</button>
						)}
					</div>
				) : null}

				<div className="flex justify-center h-4/6">
					<div className="flex flex-col">
						{props.textCoordinat && (
							<ul
								className="list-inside mx-3 text-gray-400"
								onChange={
									props.numberCoord === 0 ? props.handleDrawPoly : null
								}>
								<p>{props.numberCoord}</p>
								<li className="lg:justify-center align-bottom items-center flex flex-col sm:flex-row">
									<span className="text-gray-400 sm:mx-2 mx-0">
										{props.textCoordinat}
									</span>
								</li>
							</ul>
						)}
					</div>
				</div>
			</div>
			<div className="boc-content bottom-0 justify-center mt-20">
				<div className="flex flex-row items-center justify-center lg:justify-center">
					<button
						className="bg-zinc-800 text-white rounded-full lg:w-40 mx-5 border-2 border-white h-12 hover:bg-blue-500 hover:text-zinc-800 hover:font-bold hover:border-none"
						onClick={props.handleCloseSidebar}>
						<Link to="/">
							<p className="font-bold">Kembali</p>
						</Link>
					</button>
					<button
						className="bg-zinc-800 text-white rounded-full lg:w-40 mx-5 border-2 border-white h-12 hover:bg-blue-500 hover:text-zinc-800 hover:font-bold hover:border-none"
						onClick={props.handleDataPoly}>
						<p className="font-bold">Selanjutnya</p>
					</button>
				</div>
			</div>
		</div>
	);
}
