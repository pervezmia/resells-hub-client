"use client";

import { Button, useTheme } from "@heroui/react";
import { Sun, Moon, Display } from "@gravity-ui/icons";

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme, theme } = useTheme("system");

  return (
    <div className="flex items-center gap-2">
      <Button
        isIconOnly
        aria-label="Light theme"
        variant={resolvedTheme === "light" ? "primary" : "secondary"}
        onPress={() => setTheme("light")}
      >
        <Sun />
      </Button>
      <Button
        isIconOnly
        aria-label="Dark theme"
        variant={resolvedTheme === "dark" ? "primary" : "secondary"}
        onPress={() => setTheme("dark")}
      >
        <Moon />
      </Button>
      <Button
        isIconOnly
        aria-label="System theme"
        variant={theme === "system" ? "primary" : "secondary"}
        onPress={() => setTheme("system")}
      >
        <Display />
      </Button>
    </div>
  );
}