import React from "react";
import Close from "../icon/Close";
import { Link } from "react-router-dom";
import "../App.css";

export default function Legenda(props) {
	return (
		<div
			className="box-content bg-zinc-800 w-4/12 h-1/3 fixed bottom-0 right-0 z-20 overflow-y-scroll sidebar-custom sm:hiden rounded-md shadow-sm shadow-slate-700"
			onChange={props.handleLegenda}>
			<button
				className="bg-zinc-800 text-white hover:text-red-500 z-10 absolute top-1 m-1 right-0 items-center justify-center rounded-full"
				onClick={props.handleCloseLegenda}>
				<Link to="/">
					<Close />
				</Link>
			</button>
		</div>
	);
}
