import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/edit-form";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  // Doesn't really work because fetchInvoicebyId will throw if no record is found.
  // But if it were to return undefined, this works.
  if (!invoice) {
    console.log("chingao");
    notFound();
  }

  return (
    <main>
      {/* TODO: Make function to get breadcrumbs based on usePathname. */}
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      ></Breadcrumbs>
      <Form invoice={invoice} customers={customers}></Form>
    </main>
  );
}
