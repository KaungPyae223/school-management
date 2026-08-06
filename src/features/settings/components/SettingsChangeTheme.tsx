import { useColorSchemeStore } from "../../../stores/useColorSchemeStore";

const options = [
  { name: "default", label: "Black", swatch: "bg-neutral-900" },
  { name: "blue", label: "Blue", swatch: "bg-blue-600" },
  { name: "red", label: "Red", swatch: "bg-red-600" },
  { name: "pink", label: "Pink", swatch: "bg-pink-600" },
  { name: "orange", label: "Orange", swatch: "bg-orange-600" },
] as const;

const SettingsChangeTheme = () => {
  const colorScheme = useColorSchemeStore((s) => s.colorScheme);
  const setColorScheme = useColorSchemeStore((s) => s.setColorScheme);

  return (
    <div className="flex items-center gap-5 justify-between">
      <div className="space-y-0.5">
        <p>Theme Color</p>
        <p className="text-xs text-muted-foreground">
          Choose an accent color for the app
        </p>
      </div>
      <div className="flex gap-2">
        {options.map((o) => (
          <button
            key={o.name}
            onClick={() => setColorScheme(o.name)}
            aria-label={o.label}
            className={`h-6 w-6 rounded-full ${o.swatch} ring-offset-2 ring-offset-background transition-all ${
              colorScheme === o.name ? "ring-2 ring-foreground" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SettingsChangeTheme;
