import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import ReusableContextMenu from "./ui/reusable-context-menu";
import { Moon, Sun } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";
import { animated, useSpring } from "@react-spring/web";

interface ToggleButtonProps {
  className?: string;
}

const ToggleButton = ({ className }: ToggleButtonProps) => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  const toggleAnimation = useSpring({
    config: { duration: 100 },
    transform: isDarkMode ? 'translateX(2rem)' : 'translateX(0)',
  });

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Check if theme is already set in local storage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme && storedTheme !== "system") {
      setIsDarkMode(storedTheme === "dark");
    } else {
      // If no theme is stored, set initial theme based on system theme
      setIsDarkMode(systemTheme === "dark");
    }
  }, [systemTheme, theme]);

  const toggleTheme = (newMode?: boolean) => {
    // Toggle between light and dark mode
    const updatedMode = newMode !== undefined ? newMode : !isDarkMode;

    setIsDarkMode(updatedMode);

    // Save the theme preference in local storage
    localStorage.setItem("theme", updatedMode ? "dark" : "light");

    // Set the theme based on the current mode
    setTheme(updatedMode ? "dark" : "light");
  };

  const resetTheme = () => {
    // Reset the theme preference in local storage
    localStorage.removeItem("theme");
    setTheme("system");
    setIsDarkMode(systemTheme === "dark");
  };

  if (isDarkMode === null || !mounted) {
    // Display a loading indicator while determining the initial theme
    return (
      <LoaderCircle className="text-onBackgroundEmPrimary animate-spin"></LoaderCircle>
    );
  }

  return (
    <ReusableContextMenu
      items={[
        {
          name: "Dark Theme",
          onClick: () => toggleTheme(true),
        },
        {
          name: "Light Theme",
          onClick: () => toggleTheme(false),
        },
        {
          name: "System Theme",
          onClick: resetTheme,
        },
      ]}
    >
      <Button
        size={"icon"}
        className={`${className} flex p-1 !bg-onBackgroundEmPrimary justify-between items-center w-14 h-6 rounded-full`}
        onClick={() => toggleTheme()}
      >
        <animated.div
          className={`rounded-full w-4 h-4 bg-backgroundPrimary transition-transform`}
          style={toggleAnimation}
        ></animated.div>

        {isDarkMode ? (
          <Moon
            weight="fill"
            className={`w-auto h-auto transition-transform ${
              isDarkMode ? "transform -translate-x-8" : ""
            }`}
          ></Moon>
        ) : (
          <Sun
            weight="fill"
            color="yellow"
            className={`w-auto h-auto transition-transform ${
              isDarkMode ? "transform -translate-x-8" : ""
            }`}
          ></Sun>
        )}
        {/* <Image
          src={isDarkMode ? "/images/moon.svg" : "/images/sun.svg"}
          width={0}
          height={0}
          alt={isDarkMode ? "moon" : "sun"}
          className={`w-auto h-auto transition-transform ${
            isDarkMode ? "transform -translate-x-8" : ""
          }`}
        /> */}
      </Button>
    </ReusableContextMenu>
  );
};

export default ToggleButton;
