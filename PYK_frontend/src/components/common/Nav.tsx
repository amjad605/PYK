import logo from "../../assets/black.svg";
function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-8 ">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            <img src={logo} alt="Logo" className="w-30 h-30 ml-8 sm:ml-0  " />
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-6">
              {["Home", "Primary", "ReSale", "Rent", "About", "Contact Us"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-white hover:text-blue  text-sm transition-transform duration-300 hover:scale-110"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
