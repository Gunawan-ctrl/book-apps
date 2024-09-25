// icons
import {
  PlusSquareOutlined ,
  DashboardOutlined,
  BookOutlined ,
  ProfileOutlined,
  TransactionOutlined 
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
    to: '/dashboard'
  },
  { header: 'Master Data' },
  {
    title: 'Kategori',
    icon: PlusSquareOutlined,
    to: '/category'
  },
  {
    title: 'Data Anggota',
    icon: ProfileOutlined,
    to: '/member'
  },
  { header: 'Pages' },
  {
    title: 'Data Buku',
    icon: BookOutlined,
    to: '/books'
  },
  {
    title: 'Peminjaman',
    icon: TransactionOutlined,
    to: '/peminjaman'
  }
];

export default sidebarItem;
