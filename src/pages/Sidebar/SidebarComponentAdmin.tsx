import { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./Sidebar";
import {
  IconArrowLeft,
  IconBellRingingFilled,
  IconBrandHipchat,
  IconBrandTabler,
  IconCalendarClock,
  IconChevronRight,
  IconClock2,
  IconGavel,
  IconNews,
  IconReportAnalytics,
  IconScale,
  IconSettings,
  IconCreditCardRefund,
  IconUserBolt,
  IconUsers,
  IconWallet,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchUserAsync } from "../../redux/slice/UserDataFetch";
import NotificationCountSocket from "../../components/Common/NotificationCountSocket";
import { logout } from "../../redux/slice/LoginActions";
import NotificationLayer from "../../components/Common/Notification";
import NotificationSocket from "../../components/Common/NotificationSocket";

interface LawyerLayoutProps {
  children: React.ReactNode;
}
export function SidebarDemoAdmin({ children }: LawyerLayoutProps) {
  const links = [
    {
      label: "Dashboard",
      href: "../../../../admin",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Lawyers",
      href: "../../../../admin/lawyers",
      icon: (
        <IconScale className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Users",
      href: "../../../../admin/users",
      icon: (
        <IconUsers className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Blogs",
      href: "../../../../admin/blog",
      icon: (
        <IconNews className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Cases",
      href: "../../../../admin/case-list",
      icon: (
        <IconGavel className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Schedules",
      href: "../../../../admin/schedule-list",
      icon: (
        <IconClock2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Sales Report",
      href: "../../../../admin/sales-report",
      icon: (
        <IconReportAnalytics className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Withdraw Requests",
      href: "../../../../admin/withdrawal",
      icon: (
        <IconCreditCardRefund className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    // {
    //   label: "Wallet",
    //   href: "../../../../admin/wallet",
    //   icon: (
    //     <IconWallet className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //   ),
    // },
    // {
    //   label: "Chat",
    //   href: "../../../../chat",
    //   icon: (
    //     <IconBrandHipchat className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //   ),
    // },
    {
      label: "Profile",
      href: "../../../../admin/profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },

    // {
    //   label: "Logout",
    //   href: "#",
    //   icon: (
    //     <IconArrowLeft onClick={() => dispatch(logout())} className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //   ),
    // },
  ];
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<boolean>(false);
  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state.login
  );
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const { userDetail, error } = useAppSelector(
    (state: RootState) => state.userData
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserAsync());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row 3xl:container bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
              <div
                onClick={() => dispatch(logout())}
                className={cn(
                  "flex items-center cursor-pointer justify-start gap-2  group/sidebar py-2"
                )}
              >
                <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />

                <motion.span
                  animate={{
                    display: open ? "inline-block" : "none",
                    opacity: open ? 1 : 0,
                  }}
                  className="text-neutral-700 truncate dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
                >
                  Logout
                </motion.span>
              </div>
            </div>
          </div>
          <div>
            <div onClick={() => setNotificationsOpen(!notificationsOpen)}>
              <SidebarLink
                link={{
                  label: "Notifications",
                  href: "#",
                  icon: <NotificationCountSocket />,
                }}
              />
            </div>
            <div
              className="relative"
              onMouseEnter={() => setActive(true)}
              onMouseLeave={() => setActive(false)}
            >
              <SidebarLink
                link={{
                  label: userDetail?.full_name || "",
                  href: "#",
                  icon: userDetail.profile_image ? (
                    <img
                      src={userDetail?.profile_image}
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ) : (
                    <div className="h-7 w-7 bg-gray-300 border border-slate-900 flex justify-center items-center flex-shrink-0 rounded-full">
                      {userDetail?.full_name ? userDetail.full_name[0] : ""}
                    </div>
                  ),
                }}
                more={
                  <IconChevronRight className="text-neutral-400 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                }
              />

              {active && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", mass: 0.5, damping: 11.5 }}
                  className="absolute z-50 top-[calc(100%_-_.6rem)] md:top-[calc(100%_-9.8rem)] right-0 transform"
                >
                  <div className="w-48 bg-white border border-gray-200 shadow-lg rounded-md p-4 space-y-1">
                    <Link
                      to={
                        role == "lawyer"
                          ? "../../../../../lawyer/self-blog"
                          : "../../../../../admin/self-blog"
                      }
                      className="block p-1 text-xs text-gray-700 rounded-md font-medium hover:bg-gray-100"
                    >
                      Your Blogs
                    </Link>
                    <Link
                      to="../../../../admin/profile"
                      className="block p-1 rounded-md text-xs text-gray-700 font-medium hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <hr />
                    <div
                      onClick={() => dispatch(logout())}
                      className="block p-1 rounded-md cursor-pointer text-xs text-red-600 font-medium hover:bg-gray-100"
                    >
                      Sign out
                    </div>
                  </div>
                  <div className="absolute left-2 bottom-[-0.3rem] w-3 h-3 transform rotate-45 bg-white "></div>
                </motion.div>
              )}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="grid flex-1 overflow-hidden">
        {notificationsOpen && <NotificationLayer open={notificationsOpen} />}
        <div className="p-2 bg-gray-100 2xl:px-10 md:px-10 md:py-20 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 w-full mx-auto dark:bg-neutral-900 flex flex-col gap-2 h-full overflow-y-auto  no-scrollbar">
          <NotificationSocket />
          {error ? (
            <div className="flex justify-center items-center min-h-screen text-xs text-gray-600">
              {error}
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      to="#"
      className="font-normal  space-x-6 space-y-1 items-center text-sm text-black py-1 relative z-20"
    >
      <div className=" flex items-center justify-start space-x-2 w-full">
        <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-medium text-black dark:text-white whitespace-pre"
        >
          Acet Labs
        </motion.span>
      </div>
      <div className="px- py-1  flex justify-center items-center text-xs max-w-[70px] bg-white rounded-md shadow-sm">
        Admin
      </div>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      to="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
