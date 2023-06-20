import { FaAtlassian } from "react-icons/fa";
import { NavLink } from "react-router-dom";
<<<<<<< HEAD
import "tailwindcss/tailwind.css";
=======
>>>>>>> ddf2399dce1f19615ce63ad081a92ecc6b707ec5
import Search from "../../utils/Search";

const Header = () => {
  return (
    <div className="navbar bg-base-100 border-b py-4 flex flex-wrap">
      <div className="flex-1 justify-center">
        <NavLink className="btn btn-ghost normal-case text-2xl" to="/">
          <FaAtlassian /> AeroSphere
        </NavLink>
      </div>
<<<<<<< HEAD
=======
      <div className="flex-none gap-2">
        <Search />
      </div>
>>>>>>> ddf2399dce1f19615ce63ad081a92ecc6b707ec5
    </div>
  );
};

export default Header;
