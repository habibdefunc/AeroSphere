import { FaAtlassian } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content md:flex md:flex-col justify-between ">
      <div className="md:w-2/4">
        <NavLink to={"/"} className={"flex"}>
          <FaAtlassian className="w-8 h-8" />
          <p className="ml-4 text-xl">AeroSphere Ltd.</p>
        </NavLink>
        <p className="text-justify mt-3">
          AeroSphere adalah merek terkemuka dalam aplikasi pemantauan udara,
          memberikan solusi inovatif untuk pemantauan kualitas udara. Dengan
          data real-time, pengguna dapat mengambil langkah yang tepat untuk
          menjaga kesehatannya. AeroSphere berkomitmen untuk meningkatkan
          kesadaran dan perlindungan lingkungan di seluruh dunia.
        </p>
      </div>
      {/* <div>
        <span className="footer-title">Services</span>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </div>
      <div>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div> */}
      <div className="text-center">
        Made With 💕By AeroSphere. Copyright © {new Date().getFullYear()}, All
        Right Reserved.
      </div>
    </footer>
  );
};

export default Footer;
