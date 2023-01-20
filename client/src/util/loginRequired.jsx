import swal from "sweetalert2";
import { CurrentUser } from "./CurrentUser";

export function loginRequired() {
  if (!CurrentUser) {
    swal
      .fire({
        title: "Login Required",
        text: "Please login to continue",
        icon: "warning",
        confirmButtonText: "Login",
        confirmButtonColor: "#3085d6",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "#d33",
      })
      .then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
  }
}
