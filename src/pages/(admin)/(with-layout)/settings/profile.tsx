import { useTranslation } from "react-i18next"

import { Separator } from "@/components/ui/separator"

import { ProfileForm } from "./components/profile-form"

export function Component() {
  const { t } = useTranslation(["settings"])
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t("sections.profile.title")}</h3>
        <p className="text-sm text-muted-foreground">
          {t("sections.profile.description")}
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}
