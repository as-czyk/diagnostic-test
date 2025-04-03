import { Routes } from "@/routes/Routes";
import { getDiagnosticByUserId } from "@/supabase/db/diagnostic";
import { getUserProfileByUserId } from "@/supabase/db/user-profile";
import { createSupabaseServerClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export default async function GenerateResult() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  const { data: userData, error: userError } = await getUserProfileByUserId(
    data.user?.id!
  );

  const { data: diagnosticData, error: diagnosticError } =
    await getDiagnosticByUserId(data.user?.id!);

  /*const res = await start({
    triggerData: {
      studentName:
        data.user?.user_metadata.first_name +
        " " +
        data.user?.user_metadata.last_name,
      examDate: userData?.sat_metadata.exam_date!,
      targetScore: userData?.sat_metadata.desired_score!,
      math_diagnostic_id: diagnosticData?.math_diagnostic_id!,
      verbal_diagnostic_id: diagnosticData?.verbal_diagnostic_id!,
      userId: data.user?.id!,
    },
  });*/

  redirect(Routes.BookingPage);
}
