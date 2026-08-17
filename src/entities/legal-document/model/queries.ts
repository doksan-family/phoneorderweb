import { queryOptions } from "@tanstack/react-query";
import { fetchAdminLegalDocuments } from "@/entities/legal-document/api/admin";
import { fetchPublicLegalDocuments } from "@/entities/legal-document/api/public";
import type { LegalDocumentType } from "@/entities/legal-document/api/types";

export const legalDocumentQueryOptions = {
  public: (type?: LegalDocumentType) =>
    queryOptions({
      queryKey: ["public-legal-documents", type ?? "all"] as const,
      queryFn: () => fetchPublicLegalDocuments(type),
      retry: false,
      staleTime: 300_000,
    }),
  adminList: () =>
    queryOptions({
      queryKey: ["admin-legal-documents"] as const,
      queryFn: () => fetchAdminLegalDocuments(),
      retry: false,
      staleTime: 30_000,
    }),
};

export const adminLegalDocumentsQueryKey = ["admin-legal-documents"] as const;
