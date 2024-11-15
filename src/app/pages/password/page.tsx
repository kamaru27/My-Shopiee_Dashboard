import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PasswordUpdate from "@/components/PasswordUpdate";

export const metadata: Metadata = {
  title: "Next.js Settings Page | NextAdmin - Next.js Dashboard c",
  description: "This is Next.js Settings page for NextAdmin Dashboard Kit",
};

const Settings = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[1080px]">
        {/* <Breadcrumb pageName="Password Update" /> */}

        {/* <PasswordUpdate /> */}
      </div>
    </DefaultLayout>
  );
};

export default Settings;
