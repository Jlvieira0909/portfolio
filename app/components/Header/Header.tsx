"use client";

import { useState, useEffect, useRef } from "react";
import HeaderItem from "../HeaderItem/HeaderItem";
import { useTheme } from "../../context/ThemeContext";
import "./Header.css";

const menus = [
  {
    label: "João Vieira",
    isBold: true,
    items: [
      {
        name: "About This Portfolio",
        onClick: () => alert("João Vieira\nWeb Developer & Designer"),
      },
      { divider: true },
      {
        name: "System Settings...",
        onClick: () => console.log("Opening settings..."),
      },
      { divider: true },
      {
        name: "Contact Me",
        onClick: () => (window.location.href = "mailto:lvjohn09@gmail.com"),
      },
    ],
  },
  {
    label: "File",
    items: [
      {
        name: "New Window",
        shortcut: "⌘N",
        onClick: () => window.open(window.location.href, "_blank"),
      },
      {
        name: "New Tab",
        shortcut: "⌘T",
        onClick: () => window.open(window.location.href, "_blank"),
      },
      {
        name: "Download Resume",
        shortcut: "⌘R",
        onClick: () => console.log("Downloading resume..."),
      },
      {
        name: "Share Portfolio",
        shortcut: "⇧⌘C",
        onClick: () => navigator.clipboard.writeText(window.location.href),
      },
      { divider: true },
      {
        name: "Print...",
        shortcut: "⌘P",
        onClick: () => window.print(),
      },
      {
        name: "Close Window",
        shortcut: "⌘W",
        onClick: () => window.close(),
      },
    ],
  },
  {
    label: "Edit",
    items: [
      {
        name: "Copy Email",
        onClick: () => navigator.clipboard.writeText("lvjohn09@gmail.com"),
      },
      {
        name: "Copy Page URL",
        onClick: () => navigator.clipboard.writeText(window.location.href),
      },
      { divider: true },
      {
        name: "Find on Page",
        shortcut: "⌘F",
        onClick: () => window.alert("Use ⌘+F ou Ctrl+F on Your Browser"),
      },
    ],
  },
  {
    label: "View",
    items: [
      {
        name: "Enter Full Screen",
        shortcut: "^⌘F",
        onClick: () => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
        },
      },
    ],
  },
  {
    label: "Window",
    items: [
      {
        name: "Minimize",
        shortcut: "⌘M",
        onClick: () => console.log("Minimize requested"),
      },
      { divider: true },
      {
        name: "Home",
        shortcut: "⌘1",
        onClick: () => (window.location.href = "/"),
      },
      {
        name: "About Me",
        shortcut: "⌘2",
        onClick: () => (window.location.href = "/about-me"),
      },
      {
        name: "Projects",
        shortcut: "⌘3",
        onClick: () => (window.location.href = "/projects"),
      },
      {
        name: "Graphic Design",
        shortcut: "⌘4",
        onClick: () => (window.location.href = "/design"),
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        name: "Contact",
        onClick: () => (window.location.href = "mailto:lvjohn09@gmail.com"),
      },
      {
        name: "View on GitHub",
        onClick: () => window.open("https://github.com/Jlvieira0909", "_blank"),
      },
    ],
  },
];

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setActiveMenu(null);
        setShowCalendar(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  const handleMenuInteraction = (
    menuLabel: string,
    type: "click" | "hover"
  ) => {
    if (type === "click") {
      setActiveMenu(activeMenu === menuLabel ? null : menuLabel);
      setShowCalendar(false);
    } else if (type === "hover" && activeMenu !== null) {
      setActiveMenu(menuLabel);
      setShowCalendar(false);
    }
  };

  const closeMenu = () => {
    setActiveMenu(null);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
    setActiveMenu(null);
  };

  const formatTime = (date: Date) => {
    return date
      .toLocaleTimeString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
      .replace(/,/g, "");
  };

  const renderCalendar = () => {
    if (!time) return null;
    const daysInMonth = new Date(
      time.getFullYear(),
      time.getMonth() + 1,
      0
    ).getDate();
    const firstDay = new Date(time.getFullYear(), time.getMonth(), 1).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDay }, (_, i) => i);

    return (
      <div className="CalendarWidget">
        <div className="CalendarHeader">
          {time.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </div>
        <div className="CalendarGrid">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <div key={d} className="CalendarDayName">
              {d}
            </div>
          ))}
          {blanks.map((b) => (
            <div key={`blank-${b}`} />
          ))}
          {days.map((d) => (
            <div
              key={d}
              className={`CalendarDay ${d === time.getDate() ? "today" : ""}`}
            >
              {d}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="HeaderContainer" ref={headerRef}>
      <div className="HeaderNav">
        <HeaderItem
          label={
            <svg
              viewBox="0 0 384 512"
              width="14"
              height="14"
              fill="currentColor"
            >
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
          }
          items={menus[0].items}
          isActive={activeMenu === "apple"}
          onPointerDown={() => handleMenuInteraction("apple", "click")}
          onPointerEnter={() => handleMenuInteraction("apple", "hover")}
          onItemClick={closeMenu}
        />
        {menus.map((menu, index) => (
          <div key={index} className={index > 0 ? "DesktopOnly" : ""}>
            <HeaderItem
              label={menu.label}
              items={menu.items}
              isActive={activeMenu === menu.label}
              isBold={menu.isBold}
              onPointerDown={() => handleMenuInteraction(menu.label, "click")}
              onPointerEnter={() => handleMenuInteraction(menu.label, "hover")}
              onItemClick={closeMenu}
            />
          </div>
        ))}
      </div>

      <div className="HeaderInfo">
        <button className="ThemeToggleBtn" onClick={toggleTheme}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <div className="HeaderIcon DesktopOnly">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="6"
              width="19"
              height="12"
              rx="2.5"
              stroke="currentColor"
              stroke-width="1.5"
            />

            <path
              d="M22 10V14"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />

            <rect
              x="3"
              y="8"
              width="13"
              height="8"
              rx="1"
              fill="currentColor"
              stroke="none"
            />
          </svg>
        </div>
        <div className="HeaderIcon DesktopOnly">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 3C16.9706 3 21.4706 5.01472 24 8.23858L22.4289 9.58122C20.3013 6.86241 16.398 5 12 5C7.60195 5 3.6987 6.86241 1.57107 9.58122L0 8.23858C2.52944 5.01472 7.02944 3 12 3ZM12 8C15.0374 8 17.8105 9.17646 19.8681 11.111L18.454 12.5251C16.7909 10.9635 14.5204 10 12 10C9.47963 10 7.20914 10.9635 5.54594 12.5251L4.13188 11.111C6.1895 9.17646 8.96261 8 12 8ZM12 13C13.6569 13 15.1569 13.6716 16.2426 14.7574L12 19L7.75736 14.7574C8.84315 13.6716 10.3431 13 12 13Z" />
          </svg>
        </div>
        <div
          className={`HeaderTime ${showCalendar ? "active" : ""}`}
          onPointerDown={toggleCalendar}
        >
          {time ? formatTime(time) : ""}
        </div>
        {showCalendar && renderCalendar()}
      </div>
    </div>
  );
}
