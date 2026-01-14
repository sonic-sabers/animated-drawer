export interface MenuItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  submenu?: MenuItem[];
  onClick?: () => void;
}

export interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuData: MenuItem[];
}
