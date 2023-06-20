const Button = ({ text, onClick }) => {
  return (
<<<<<<< HEAD
    <button
      onClick={onClick}
      className={`${
        text === "Reset"
          ? "btn-primary bg-blue-600  hover:bg-blue-400"
          : "btn bg-transparent bg-white hover:bg-blue-400 hover:text-white text-black"
      } btn bg-tran w-1/2 md:w-5/12 mt-4 border-none  shadow-lg`}
    >
      {text}
    </button>
=======
    <>
      <button
        onClick={onClick}
        className=" btn btn-primary bg-blue-600 w-3/4 mt-4 hover:bg-blue-400"
      >
        {text}
      </button>
    </>
>>>>>>> ddf2399dce1f19615ce63ad081a92ecc6b707ec5
  );
};

export default Button;
