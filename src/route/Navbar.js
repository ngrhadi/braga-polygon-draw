import React from "react";
import logo from "./logo-braga.svg";

export default function Navbar() {
	return (
		<div className="items-end z-10 absolute w-full bg-zinc-800 h-10 justify-end align-middle">
			<a className="flex items-end justify-end" href="/">
				<img
					className="mt-2 mx-3"
					src={logo}
					alt="logo"
					style={{
						hight: "80px",
					}}
				/>
			</a>
		</div>
	);
}
