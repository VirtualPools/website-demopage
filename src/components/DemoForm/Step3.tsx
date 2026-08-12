import { useEffect } from "react";
import CalEmbed, { getCalApi } from "@calcom/embed-react";
import type { Step1Values } from "../../lib/schemas";

const CAL_LINK = "sander-de-roeck-vuaayi/30min";
const CAL_NAMESPACE = "30min";

export default function Step3({ step1Values }: { step1Values: Step1Values }) {
  // The bare <iframe src="…/embed"> Cal.com gives you in its "get the code" panel
  // only renders once their embed.js has run the init handshake — without it the
  // iframe just stays blank. @calcom/embed-react handles that script + handshake.
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", { layout: "month_view" });
    })();
  }, []);

  return (
    <div className="space-y-5 text-center">
      <CalEmbed
        namespace={CAL_NAMESPACE}
        calLink={CAL_LINK}
        style={{
          width: "100%",
          height: "100%",
          overflow: "auto",
          minHeight: "600px",
        }}
        config={{
          layout: "month_view",
          name: step1Values.name,
          email: step1Values.email,
        }}
      />
    </div>
  );
}
