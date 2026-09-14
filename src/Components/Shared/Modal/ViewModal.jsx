/* eslint-disable react/prop-types */
import fallbackSrc from "/fallBack_Image.jpg";
const ViewModal = ({ isOpen, onClose, data, title, items }) => {
  console.log("items", items);

  return (
    // <div
    //   className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
    //   onClick={onClose}
    // >
    <div
      
    >
      <div
        className="relative top-20 mx-auto p-5 border w-[50%] shadow-lg rounded-md bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mt-3 text-center">
          <h3 className="text-2xl">{title}</h3>
          <ul className="space-y-3 mt-6 divide-y dark:divide-slate-700 divide-slate-100">
            {items.map((item, i) => {
              return (
                <li key={i} className="">
                  {item.status ? (
                    <div className="py-3 flex justify-between items-center">
                      <h3 className="text-sm font-semibold dark:text-slate-50 text-slate-900 w-[40%]">
                        {item.status}
                      </h3>
                      <div className="w-[60%] flex justify-start">
                        <span className="flex items-center space-x-3 rtl:space-x-reverse">
                          <span
                            className={`h-[35px] w-[120px] rounded-full flex justify-center items-center ${
                              item?.value === 1 || item?.value === true
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            <span>
                              {item.value === 1 || item?.value === true
                                ? "Active"
                                : "Inactive"}
                            </span>
                          </span>
                        </span>
                      </div>
                    </div>
                  ) : item?.image ? (
                    <div className="py-3 flex justify-between items-center">
                      <h3 className="text-sm font-semibold dark:text-slate-50 text-slate-900 w-[40%]">
                        {item.image}
                      </h3>
                      <div className="w-[60%] flex justify-start">
                        <img
                          src={import.meta.env.VITE_LOCAL_API_URL + item?.value}
                          onError={(e) => {
                            e.target.onerror = null; // Prevents looping
                            e.target.src = fallbackSrc;
                          }}
                          alt=""
                          className="w-[150px]"
                        />
                      </div>
                    </div>
                  ) : item?.long_details ? (
                    <div className="py-3 flex justify-between items-center">
                      <h3 className="text-sm font-semibold dark:text-slate-50 text-slate-900 w-[40%]">
                        {item.long_details}
                      </h3>
                      <div className="w-[60%] flex justify-start">
                        <div
                          className="text-[13px]"
                          dangerouslySetInnerHTML={{ __html: item?.value }}
                        />
                      </div>
                    </div>
                  ) : item?.map ? (
                    <div className="py-3 flex justify-between items-center">
                      <h3 className="text-sm font-semibold dark:text-slate-50 text-slate-900 w-[40%]">
                        {item.map}
                      </h3>
                      <div className="w-[60%] flex justify-start">
                        <iframe
                          src={item?.value}
                          width="600"
                          height="450"
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </div>
                  ) : item?.branch_user_list ? (
                    <>
                      <h3 className="text-sm font-semibold dark:text-slate-50 text-slate-900 w-[40%]">
                        {item.branch_user_list}
                      </h3>
                      <div className="w-[60%]">
                        <div>
                          <li className="">
                            <div className="py-3 flex justify-between items-center">
                              <h3 className="text-sm font-semibold dark:text-slate-50 text-slate-900 w-[10%]">
                                #
                              </h3>
                              <h3 className="text-sm font-semibold dark:text-slate-50 text-slate-900 w-[30%]">
                                Name
                              </h3>
                              <h3 className="text-sm font-semibold dark:text-slate-50 text-slate-900 w-[30%]">
                                Address
                              </h3>
                              <h3 className="text-sm font-semibold dark:text-slate-50 text-slate-900 w-[30%]">
                                Contact Number
                              </h3>
                            </div>
                          </li>
                          <br />
                        </div>

                        {item?.value?.map((user, index) => (
                          <>
                            <li key={index} className="">
                              <div className="py-3 flex justify-between items-center">
                                <p className="text-xs dark:text-slate-400 text-slate-600 w-[10%] flex justify-start">
                                  {index + 1}
                                </p>
                                <p className="text-xs dark:text-slate-400 text-slate-600 w-[30%] flex justify-start">
                                  {user.name}
                                </p>
                                <p className="text-xs dark:text-slate-400 text-slate-600 w-[30%] flex justify-start">
                                  {user.address}
                                </p>
                                <p className="text-xs dark:text-slate-400 text-slate-600 w-[30%] flex justify-start">
                                  {user.contact_number}
                                </p>
                              </div>
                            </li>
                            <br />
                          </>
                        ))}
                      </div>
                    </>
                  ) : item?.merchant_list ? (
                    <>
                      <h3 className="text-sm font-semibold dark:text-slate-50 text-slate-900 w-[40%]">
                        {item.merchant_list}
                      </h3>
                      <div className="w-[60%]">
                        <div>
                          <li className="">
                            <div className="py-3 flex justify-between items-center">
                              <h3 className="text-sm font-semibold dark:text-slate-50 text-slate-900 w-[10%]">
                                #
                              </h3>
                              <h3 className="text-sm font-semibold dark:text-slate-50 text-slate-900 w-[30%]">
                                Name
                              </h3>
                              <h3 className="text-sm font-semibold dark:text-slate-50 text-slate-900 w-[30%]">
                                Address
                              </h3>
                              <h3 className="text-sm font-semibold dark:text-slate-50 text-slate-900 w-[30%]">
                                Contact Number
                              </h3>
                            </div>
                          </li>
                          <br />
                        </div>

                        {item?.value?.map((user, index) => (
                          <>
                            <li key={index} className="">
                              <div className="py-3 flex justify-between items-center">
                                <p className="text-xs dark:text-slate-400 text-slate-600 w-[10%] flex justify-start">
                                  {index + 1}
                                </p>
                                <p className="text-xs dark:text-slate-400 text-slate-600 w-[30%] flex justify-start">
                                  {user.name}
                                </p>
                                <p className="text-xs dark:text-slate-400 text-slate-600 w-[30%] flex justify-start">
                                  {user.address}
                                </p>
                                <p className="text-xs dark:text-slate-400 text-slate-600 w-[30%] flex justify-start">
                                  {user.contact_number}
                                </p>
                              </div>
                            </li>
                            <br />
                          </>
                        ))}
                      </div>
                    </>
                  ) : item?.rider_list ? (
                    <>
                      <h3 className="text-sm font-semibold dark:text-slate-50 text-slate-900 w-[40%]">
                        {item.rider_list}
                      </h3>
                      <div className="w-[60%]">
                        <div>
                          <li className="">
                            <div className="py-3 flex justify-between items-center">
                              <h3 className="text-sm font-semibold dark:text-slate-50 text-slate-900 w-[10%]">
                                #
                              </h3>
                              <h3 className="text-sm font-semibold dark:text-slate-50 text-slate-900 w-[30%]">
                                Name
                              </h3>
                              <h3 className="text-sm font-semibold dark:text-slate-50 text-slate-900 w-[30%]">
                                Address
                              </h3>
                              <h3 className="text-sm font-semibold dark:text-slate-50 text-slate-900 w-[30%]">
                                Contact Number
                              </h3>
                            </div>
                          </li>
                          <br />
                        </div>

                        {item?.value?.map((user, index) => (
                          <>
                            <li key={index} className="">
                              <div className="py-3 flex justify-between items-center">
                                <p className="text-xs dark:text-slate-400 text-slate-600 w-[10%] flex justify-start">
                                  {index + 1}
                                </p>
                                <p className="text-xs dark:text-slate-400 text-slate-600 w-[30%] flex justify-start">
                                  {user.name}
                                </p>
                                <p className="text-xs dark:text-slate-400 text-slate-600 w-[30%] flex justify-start">
                                  {user.address}
                                </p>
                                <p className="text-xs dark:text-slate-400 text-slate-600 w-[30%] flex justify-start">
                                  {user.contact_number}
                                </p>
                              </div>
                            </li>
                            <br />
                          </>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="py-3 flex justify-between items-center w-full">
                      <h3 className="text-sm font-semibold dark:text-slate-50 text-slate-900 w-[40%]">
                        {item.title}
                      </h3>
                      <p className="text-xl dark:text-slate-400 text-slate-600 w-[60%] flex justify-start">
                        {item.value}
                      </p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* <button
            onClick={onClose}
            className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
