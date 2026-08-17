import type {
  AdminProductCategory,
  ProductCategoryCreatePayload,
  ProductCategoryUpdatePayload,
} from "@/entities/product/api/categories";
import type { AdminCategoryDraft } from "./types";

export function createEmptyCategoryDraft(nextOrder = 0): AdminCategoryDraft {
  return {
    code: "",
    name: "",
    displayOrder: nextOrder,
    isActive: true,
    showInMainMenu: true,
  };
}

export function createCategoryDraftFromCategory(
  category: AdminProductCategory
): AdminCategoryDraft {
  return {
    code: category.code,
    name: category.name,
    displayOrder: category.display_order,
    isActive: category.is_active,
    showInMainMenu: category.show_in_main_menu,
  };
}

export function createCategoryPayload(
  draft: AdminCategoryDraft
): ProductCategoryCreatePayload {
  return {
    code: draft.code.trim(),
    name: draft.name.trim(),
    display_order: draft.displayOrder,
    is_active: draft.isActive,
    show_in_main_menu: draft.showInMainMenu,
  };
}

/** code는 등록 후 변경 불가라 수정 payload에는 넣지 않는다. */
export function createCategoryUpdatePayload(
  draft: AdminCategoryDraft
): ProductCategoryUpdatePayload {
  return {
    name: draft.name.trim(),
    display_order: draft.displayOrder,
    is_active: draft.isActive,
    show_in_main_menu: draft.showInMainMenu,
  };
}
