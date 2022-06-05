const FIELD_USER_NAME = "USER_NAME"

export const LinkPage = {
    supplier : "/manage/supplier",
    category : "/manage/category"
}
export const LinkSupplierAction = {
    supplier_add:LinkPage.supplier + "/add",
    supplier_list:LinkPage.supplier + "/list",
    supplier_update:LinkPage.supplier + "/update",
    supplier_delete:LinkPage.supplier + "/delete",
}

export const LinkCategoryAction = { 
    category_add:LinkPage.category + "/add",
    category_list:LinkPage.category + "/list",
    category_update:LinkPage.category + "/update",
    category_delete:LinkPage.category + "/delete",
}