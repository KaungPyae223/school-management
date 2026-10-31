import { useTranslation } from "react-i18next";
import type { LucideIcon } from "lucide-react";
import { ExternalLink, Mail, Send, ThumbsUp } from "lucide-react";

// Dummy contact channels — replace with real addresses.
const CHANNELS: {
  key: "email" | "telegram" | "facebook";
  value: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    key: "email",
    value: "kaungpyaeaung8123@gmail.com",
    href: "mailto:kaungpyaeaung8123@gmail.com",
    icon: Mail,
  },
  {
    key: "telegram",
    value: "@KaungPyae2003",
    href: "https://t.me/KaungPyae2003",
    icon: Send,
  },
  {
    key: "facebook",
    value: "Kaung",
    href: "https://www.facebook.com/kaung.591455/",
    icon: ThumbsUp,
  },
];

const HelpContact = () => {
  const { t } = useTranslation();

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {CHANNELS.map(({ key, value, href, icon: Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col gap-2.5 rounded-lg border p-3 transition-colors hover:bg-muted"
        >
          <div className="flex items-center justify-between">
            <div className="flex size-9 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-background">
              <Icon className="size-4 text-muted-foreground group-hover:text-foreground" />
            </div>
            <ExternalLink className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <div className="space-y-0.5">
            <p className="text-sm font-medium">{t(`help.contact.${key}`)}</p>
            <p className="truncate text-xs text-muted-foreground">{value}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default HelpContact;
