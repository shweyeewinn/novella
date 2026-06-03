import type { Schema, Struct } from "@strapi/strapi";

export interface CategoryBrowseSubcategory extends Struct.ComponentSchema {
  collectionName: "components_category_browse_subcategories";
  info: {
    description: "Child shelf under a browse category";
    displayName: "Browse subcategory";
  };
  attributes: {
    childId: Schema.Attribute.String & Schema.Attribute.Required;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module "@strapi/strapi" {
  export module Public {
    export interface ComponentSchemas {
      "category.browse-subcategory": CategoryBrowseSubcategory;
    }
  }
}
