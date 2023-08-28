"use client";
import { useEffect, useState } from "react";
import { themeChange } from "theme-change";

const themeOptions = [
  { title: "Light", value: "light" },
  { title: "Dark", value: "dark" },
  { title: "Luxury", value: "luxury" },
  { title: "Business", value: "business" },
  { title: "Corporate", value: "corporate" },
];

type ThemeSwitcherProps = {
  className: string;
};

const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const [selectedTheme, setSelectedTheme] = useState<string>("");

  useEffect(() => {
    // On component mount, apply the user's selected theme from local storage
    themeChange(false);
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme) {
      setSelectedTheme(savedTheme);
    }
  }, []);

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    localStorage.setItem("selectedTheme", theme);
  };

  return (
    <select
      className={"select select-bordered text-primary " + className}
      data-choose-theme
      value={selectedTheme}
      onChange={(e) => handleThemeChange(e.target.value)}
    >
      {themeOptions.map((option, i) => (
        <option key={i} value={option.value}>
          {option.title}
        </option>
      ))}
    </select>
  );
};

export default ThemeSwitcher;
