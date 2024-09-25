// icons
import {
  PlusSquareOutlined ,
  DashboardOutlined,
  // BookOutlined ,
  // ProfileOutlined,
  // TransactionOutlined 
} from '@ant-design/icons-vue';

export interface menu {
  header?: string;
  title?: string;
  icon?: object;
  to?: string;
  divider?: boolean;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: 'Menu' },
  {
    title: 'Dashboard',
    icon: DashboardOutlined,
    to: '/dashboard-petugas'
  },
  { header: 'Master Data' },
  {
    title: 'Kategori',
    icon: PlusSquareOutlined,
    to: '/category-page'
  },
  { header: 'Pages' },
  {
    title: 'Books',
    icon: PlusSquareOutlined,
    to: '/books-page'
  },
  {
    title: 'Peminjaman',
    icon: PlusSquareOutlined,
    to: '/peminjaman-page'
  },
  
];

export default sidebarItem;
