import React from "react";

export default function ErrorPage() {
  return (
    <div>
      <div class="d-flex justify-content-center align-items-center error_page">
        <h1 class="mr-3 pr-3 align-top border-right inline-block align-content-center">
          404
        </h1>
        <div class="inline-block align-middle">
          <h2 class="font-weight-normal lead" id="desc">
            You are not allowed to enter this page, Please Login or Register
          </h2>
        </div>
      </div>
    </div>
  );
}
