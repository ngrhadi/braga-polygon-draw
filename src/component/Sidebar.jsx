import React from "react";
import Camera from "../icon/Camera";
import Location from "../icon/Location";
import MenuClose from "../icon/MenuClose";
import User from "../icon/User";
import { Link } from "react-router-dom";

export default function Sidebar(props) {
	return (
		<div
			className="box-content w-4/12 h-full fixed z-30  bg-zinc-800"
			onChange={props.handleSidebar}>
			<div className="bg-inherit box-content bg-zinc-800 z-30">
				<button
					className="text-white hover:text-red-500 z-10 absolute top-1 m-2 right-2 items-center justify-center rounded-full"
					onClick={props.handleCloseSidebar}>
					<Link to="/">
						<MenuClose />
					</Link>
				</button>
				{/* items-center justify-center */}
				<div className="absolute mt-4 divide-y divide-solid">
					<p className="text-xl text-white ml-3 mb-3">Edit Information Aset</p>
				</div>
			</div>
			<div className="divide-y text-white divide-solid mt-3" />
			<div className="box-content bg-zinc-800 h-5/6 overflow-y-scroll sidebar-custom">
				<div className="flex lg:flex-row lg:flex-none flex-row mt-20 items-center justify-center">
					<div className="flex">
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
								onClick={props.handleButtonAddLayers}>
								<p className="font-bold">Start</p>
							</button>
						)}
						{props.handleDrawPoly && (
							<button
								className="bg-zinc-800 mx-2 text-white rounded-full lg:w-2/12 border-2 border-white h-12 hover:bg-blue-500 hover:text-zinc-800 hover:font-bold hover:border-none"
								onClick={props.handleAddLayerOnDraw}>
								<p className="font-bold">Create</p>
							</button>
						)}
						{props.showUndo && (
							<button
								className="bg-zinc-800 mx-2 text-white rounded-full lg:w-2/12 border-2 border-white h-12 hover:bg-blue-500 hover:text-zinc-800 hover:font-bold hover:border-none"
								onClick={props.handleUndo}>
								<p className="font-bold">Undo</p>
							</button>
						)}
						{props.closeShape && (
							<button
								className="bg-zinc-800 mx-2 text-white rounded-full lg:w-2/12 border-2 border-white h-12 hover:bg-yellow-300 hover:text-zinc-800 hover:font-bold hover:border-none"
								onClick={props.handleCloseShape}>
								<p className="font-bold">Save</p>
							</button>
						)}
					</div>
				) : null}

				<div className="flex justify-center h-4/6">
					<div className="flex flex-col">
						{props.newData && (
							<ul
								className="list-inside mx-3 text-gray-400"
								onChange={
									props.numberCoord === 0 ? props.handleDrawPoly : null
								}>
								<p className="text-center mt-6">
									ID : {props.newData.properties.id}
								</p>
								<br />
								<li className="lg:justify-center align-bottom items-center flex flex-col sm:flex-row">
									<span className="text-gray-400 sm:mx-2 mx-0">
										{props.newData.geometry.coordinates.map((element, idx) => {
											return (
												<div className="table-auto">
													<div key={idx} className="table-row">
														<div className="table-cell">
															<p>
																Coordinat : <br />
																{element[0].map((el) => {
																	return (
																		<span className="text-gray-400">
																			{el[0]}, {el[1]} <br />
																		</span>
																	);
																})}
															</p>
														</div>
													</div>
												</div>
											);
										})}
									</span>
								</li>
							</ul>
						)}
					</div>
				</div>
			</div>
			<div className="boc-content bottom-0 justify-center mt-10">
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
