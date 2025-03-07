
export interface CategoryItem {
    id: string;
    label: string;
  }
  
  export interface Category {
    title: string;
    items: CategoryItem[];
  }
  
  export interface SidebarConfig {
    tramites: Category;
    datos: Category;
  }
  