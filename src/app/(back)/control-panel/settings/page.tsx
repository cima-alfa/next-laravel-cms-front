import EmailsSettingsForm from "@/back-ui/components/app/settings/EmailsSettingsForm";
import GeneralSettingsForm from "@/back-ui/components/app/settings/GeneralSettingsForm";
import PanelBase from "@/back-ui/components/layout/PanelBase";
import { fetchPages } from "@/lib/data/pages";
import { fetchSettings } from "@/lib/data/settings";

export default async function Page() {
    const [pages, settings] = await Promise.all([
        fetchPages("all"),
        fetchSettings(),
    ]);

    return (
        <>
            <h1>Settings</h1>

            <div className="grid @3xl/main:grid-cols-2 @7xl/main:grid-cols-3 gap-4 items-start">
                <PanelBase>
                    <h2>General</h2>
                    <GeneralSettingsForm settings={settings} pages={pages} />
                </PanelBase>

                <PanelBase>
                    <h2>E-Mails</h2>
                    <EmailsSettingsForm settings={settings} />
                </PanelBase>
            </div>
        </>
    );
}
