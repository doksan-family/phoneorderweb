import { createClient } from "@/shared/lib/supabase/client";

export async function loginAdmin(email: string, password: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { success: false, error: "이메일 또는 비밀번호를 확인해 주세요." };
  }

  return { success: true };
}

export async function logoutAdmin() {
  const supabase = createClient();
  await supabase.auth.signOut();
}
