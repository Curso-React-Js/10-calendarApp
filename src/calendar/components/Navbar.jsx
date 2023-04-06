
export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp;
        Angel
      </span>

      <button className="btn btn-outline-warning">
        <i className="fas fa-sign-out-alt"></i>
        &nbsp;
        <span>Salir</span>
      </button>
    </div>
  );
}
