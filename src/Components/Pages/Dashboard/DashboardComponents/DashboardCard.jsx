import { FaBloggerB } from "react-icons/fa";
import { BiUserCircle, BiCameraMovie } from "react-icons/bi";
import { MdSubscriptions } from "react-icons/md";
import { AiOutlineBars } from "react-icons/ai";
import { TbLanguage } from "react-icons/tb";
import { SiRelianceindustrieslimited } from "react-icons/si";
import React from "react";
import { Link } from "react-router-dom";
import { useGetReportQuery } from "../../../../store/api/app/Report/reportApiSlice";

const CardItem = ({ icon: Icon, title, count, link }) => {
  const Content = (
    <div className="px-4 py-8 rounded-md flex flex-col justify-center items-center bg-[#227DE750]">
      <div className="flex items-center gap-2 font-semibold mb-2">
        <Icon className="text-2xl" />
        <span>{title}</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">{count}</h1>
    </div>
  );

  // Conditionally render the card as a `Link` if the `link` prop is present, otherwise render it as a `div`
  return link ? <Link to={link}>{Content}</Link> : <div>{Content}</div>;
};

const DashboardCard = () => {
  const { data: report } = useGetReportQuery();
  const reportData = report?.data;

  const cardItems = [
    {
      icon: BiCameraMovie,
      title: "Subscribers",
      count: reportData?.movies,
      link: "/admin/movies",
    },
    {
      icon: BiCameraMovie,
      title: "Products",
      count: reportData?.series,
      link: "/admin/series",
    },
    {
      icon: TbLanguage,
      title: "Accounts",
      count: reportData?.languages,
      link: "/admin/languages",
    },
    {
      icon: AiOutlineBars,
      title: "Purchases",
      count: reportData?.genres,
      link: "/admin/genres",
    },
    {
      icon: SiRelianceindustrieslimited,
      title: "Purchase Returns",
      count: reportData?.industries,
      link: "/admin/industries",
    },
    {
      icon: FaBloggerB,
      title: "Blog",
      count: reportData?.blogs,
      link: "/admin/blogs",
    },
    {
      icon: MdSubscriptions,
      title: "Subscriber",
      count: reportData?.subscribers,
      link: "/admin/subscriber",
    },
    {
      icon: BiUserCircle,
      title: "User",
      count: reportData?.users,
      link: "/admin/users",
    },
  ];

  return (
    <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
      {cardItems.map((item, index) => {
        if (item?.count > 0) {
          return (
            <CardItem
              key={index}
              icon={item?.icon}
              title={item?.title}
              count={item?.count}
              link={item?.link} // Cards without links won't be wrapped in a `Link`
            />
          );
        }
      })}
    </div>
  );
};

export default DashboardCard;
