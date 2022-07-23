import React from "react";
import Title from "../components/Title";

export default function ErrorPage() {
	return (
		<div>
			<Title title={"Error"} />

			<div className="d-flex justify-content-center align-items-center error_page">
				<div className="inline-block align-middle">
					<h2 className="font-weight-normal lead" id="desc">
						You are not allowed to enter this page, Please Login or Register
					</h2>
				</div>
			</div>
		</div>
	);
}
