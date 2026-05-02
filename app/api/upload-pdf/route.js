import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  const buffer = Buffer.from(await file.arrayBuffer());

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const fileName = `invoices/${Date.now()}.pdf`;

  const { error } = await supabase.storage
    .from("invoices")
    .upload(fileName, buffer, {
      contentType: "application/pdf",
    });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage
    .from("invoices")
    .getPublicUrl(fileName);

  return Response.json({ url: data.publicUrl });
}