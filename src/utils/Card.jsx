const Card = ({ title, children, condition, searchResult }) => {
  return (
    <div className={` ${condition === null ? "min-h-[60vh]" : " "}`}>
      <div
        className={`${
          searchResult && "md:w-3/5"
        } flex justify-center mx-auto w-full mt-10 mb-10`}
      >
        <div
          className="block card card-side bg-slate-500 shadow-xl 
            w-4/5"
        >
          {title && (
            <div className="card-header">
              <h2 className="card-title mt-6 ml-10 text-white text-2xl">
                {title}
              </h2>
            </div>
          )}
          <div className="card-body flex">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
