export default function Footer() {
  return (
    <div
      className="text-center bg-dark text-light d-flex justify-content-center align-items-center"
      style={{ height: "10vh" }}
    >
      Copyright {new Date().getFullYear()} &copy; Urban Ride
    </div>
  );
}
