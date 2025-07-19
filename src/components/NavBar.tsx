function NavBar() {
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#212121",
    color: "#fff",
    fontFamily: "sans-serif",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  };

  return (
    <nav style={navStyle}>
      <div style={{ fontSize: "1.25rem", fontWeight: "1" }}>
        AI Code Roaster
      </div>

      <div></div>
    </nav>
  );
}

export default NavBar;
